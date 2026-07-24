import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { ACCEPTED_TYPES, MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, isVideo } from "@/lib/media";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const SYSTEM_PROMPT = `You are DeepTrace AI, a forensic media verification engine.

Analyze the supplied media and, if provided, the claim the uploader says it depicts.
Report only what the media itself supports. Be explicit about uncertainty.

Set "verdict" as follows:
- AUTHENTIC — no manipulation signals, and nothing contradicts the stated claim.
- CONTEXT_MISMATCH — the media looks genuine but does not support the stated claim
  (wrong place, wrong date, wrong event, or the caption asserts something not shown).
- SUSPECTED_MANIPULATION — visual or temporal artifacts suggest synthesis, editing,
  face-swapping, or splicing.

"confidenceScore" (0-100) is your confidence in the stated verdict.
"deepfakeProbability" (0-100) is the likelihood the media is synthetic or manipulated.

For "claims", extract each checkable element you can observe (location, date, subject,
integrity, and so on). "extracted" is what the media shows; "claimed" is what the
uploader asserts, or "—" when they asserted nothing about it. Mark status "mismatch"
only when the two genuinely conflict.

Never invent citations, URLs, or sources. You are analyzing the media only and have no
web access, so return an empty "citations" array unless the media itself displays a
verifiable source such as a visible watermark or on-screen attribution.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      enum: ["AUTHENTIC", "CONTEXT_MISMATCH", "SUSPECTED_MANIPULATION"],
    },
    confidenceScore: { type: Type.INTEGER },
    deepfakeProbability: { type: Type.INTEGER },
    summary: { type: Type.STRING },
    mediaDescription: { type: Type.STRING },
    claims: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          field: { type: Type.STRING },
          extracted: { type: Type.STRING },
          claimed: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["match", "mismatch"] },
        },
        required: ["field", "extracted", "claimed", "status"],
      },
    },
    citations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          source_name: { type: Type.STRING },
          url: { type: Type.STRING },
          trust_score: { type: Type.INTEGER },
        },
        required: ["source_name", "url", "trust_score"],
      },
    },
  },
  required: [
    "verdict",
    "confidenceScore",
    "deepfakeProbability",
    "summary",
    "mediaDescription",
    "claims",
    "citations",
  ],
};

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fail(
      "Verification is unavailable: GEMINI_API_KEY is not set on the server.",
      503
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Could not read the upload. Try again.", 400);
  }

  const file = form.get("media");
  const claimedContext = (form.get("claimedContext") as string | null)?.trim() ?? "";

  if (!(file instanceof File)) {
    return fail("No file was attached to the request.", 400);
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return fail(
      "That file type isn't supported. Upload a JPEG, PNG, WebP, HEIC, MP4, MOV, or WebM file.",
      415
    );
  }

  const limit = isVideo(file.type) ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit) {
    return fail("That file is too large to analyze. Try a shorter clip or smaller image.", 413);
  }

  const started = Date.now();

  try {
    const bytes = Buffer.from(await file.arrayBuffer()).toString("base64");
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: file.type, data: bytes } },
            {
              text: claimedContext
                ? `The uploader claims this media shows: "${claimedContext}"\n\nVerify that claim against the media.`
                : "No claim was supplied. Analyze the media for manipulation and describe what it actually shows.",
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const raw = response.text;
    if (!raw) {
      return fail("The model returned an empty response. Try again.", 502);
    }

    const result = JSON.parse(raw);

    return NextResponse.json({
      ...result,
      latencyMs: Date.now() - started,
      model: MODEL,
    });
  } catch (err) {
    console.error("Verification failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";

    if (/quota|rate|429/i.test(message)) {
      return fail("The verification service is rate limited right now. Try again shortly.", 429);
    }
    if (/api[ _-]?key|permission|401|403/i.test(message)) {
      return fail("The server's GEMINI_API_KEY was rejected. Check the key and its permissions.", 502);
    }

    return fail("Verification failed while analyzing the media. Try again.", 502);
  }
}
