export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "AI Safety" | "Deepfake Awareness" | "Misinformation Reports" | "Product Updates";
  date: string;
  readTime: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "context-hijacking-fools-more-people-than-deepfakes",
    title: "Why context hijacking fools more people than deepfakes",
    excerpt: "The most effective misinformation rarely touches a single pixel. It just changes the caption.",
    category: "Misinformation Reports",
    date: "2026-06-18",
    readTime: "6 min read",
    body: [
      "When people picture misinformation, they picture a fake — a synthetic face, a cloned voice, an image that never existed. But in the cases we've analyzed on real submissions, the more common pattern doesn't touch a single pixel. It takes an authentic photo or clip and attaches a false claim about where, when, or what it shows.",
      "We call this context hijacking, and it works because the underlying media passes every technical authenticity check. A reverse image search might not even help — the photo really was taken at a rally, just not the one it's captioned as. The manipulation lives entirely in the text wrapped around it.",
      "This is why a detector tuned only for generative artifacts misses most of what actually spreads. Context verification has to extract the claim, find the earliest matching publication, and compare dates and locations — the same work a fact-checker does manually, just faster.",
      "The practical takeaway for verification teams: don't just ask 'is this image real.' Ask 'does this image show what the caption says it shows.' Those are different questions, and only the second one catches the majority of what we see in the wild.",
    ],
  },
  {
    slug: "inside-gemma-4-native-multimodal-reasoning",
    title: "Inside Gemma 4's native multimodal reasoning",
    excerpt: "Why skipping the OCR and speech-to-text step matters more than it sounds.",
    category: "Product Updates",
    date: "2026-05-30",
    readTime: "5 min read",
    body: [
      "Most media-analysis pipelines run in stages: transcribe the audio, caption the image, then hand text to a language model for reasoning. Each stage is a place where context quietly evaporates — tone, emphasis, background noise, and visual detail that never made it into the transcript.",
      "Gemma 4's native multimodal reasoning lets us skip that translation step. The model reads pixels and waveforms directly, which means details a captioning model would summarize away — a specific banner in a crowd, a splice point in a voice note — stay available to the reasoning process.",
      "In practice, this shows up most clearly in edge cases: heavily accented speech, low-light photos, and audio with background noise all degrade faster through a transcription bottleneck than they do when a model reasons over the raw signal.",
      "We're not claiming this closes every gap — no model reasons perfectly over noisy input. But it's a meaningfully different failure mode than the transcribe-then-reason pipelines most tools still run.",
    ],
  },
  {
    slug: "field-guide-to-spotting-manipulated-audio",
    title: "A field guide to spotting manipulated audio",
    excerpt: "Three things to listen for before you trust a viral voice note.",
    category: "Deepfake Awareness",
    date: "2026-05-11",
    readTime: "4 min read",
    body: [
      "Audio manipulation is undersold as a misinformation vector because it's harder to eyeball than a doctored photo. Here are the three signals our detection pipeline weighs most heavily — and that you can listen for yourself.",
      "First, splice points. A clip cut mid-sentence often has a subtle discontinuity in room tone or breathing rhythm right at the cut. It's easy to miss on a phone speaker, easier to catch with headphones.",
      "Second, prosody mismatches. Cloned voices tend to flatten emotional emphasis in ways that don't match the claimed content — a supposedly urgent statement delivered with unnaturally even pacing.",
      "Third, translation drift. A clip captioned with a translation that doesn't map cleanly onto the audible cadence of the original speech is one of the most common patterns we catch: the audio is real, the translation is invented.",
    ],
  },
  {
    slug: "what-responsible-ai-means-for-a-detection-company",
    title: "What responsible AI means for a detection company",
    excerpt: "A detector that overclaims certainty is its own kind of misinformation.",
    category: "AI Safety",
    date: "2026-04-22",
    readTime: "7 min read",
    body: [
      "It's tempting to market a detection score as a verdict. We've deliberately avoided that framing, because a confidently wrong detector causes real harm — to the person wrongly accused of fabricating something real, and to the trust of anyone relying on the tool.",
      "Our approach is to treat every score as decision support: a confidence estimate with the evidence attached, not a ruling. That's why every verdict on DeepTrace ships with its sources and extracted claims, not just a number.",
      "We also publish known limitations rather than burying them — false positive rates on heavily compressed media, the fact that breaking news with no prior coverage will score as low-confidence rather than false, and the reality that state-of-the-art generation techniques will sometimes evade detection entirely.",
      "Responsible AI, for a company in this space, mostly means resisting the urge to sound more certain than the model actually is.",
    ],
  },
  {
    slug: "introducing-batch-verification",
    title: "Introducing batch verification for moderation teams",
    excerpt: "Score up to 500 items in a single API call, delivered via webhook.",
    category: "Product Updates",
    date: "2026-03-14",
    readTime: "3 min read",
    body: [
      "Moderation queues don't process one item at a time, and increasingly, neither does our API. Batch verification accepts up to 500 items in a single request and delivers results asynchronously via webhook as each item completes.",
      "This shipped in direct response to platform-integrity teams telling us that per-item latency mattered less than queue-level throughput. Batch requests are billed at the same per-item rate as synchronous calls.",
      "Documentation and example payloads are available on the API & Developers page.",
    ],
  },
  {
    slug: "2026-misinformation-trends",
    title: "2026 misinformation trends: what we're seeing in the data",
    excerpt: "A look at the patterns across verification requests over the last two quarters.",
    category: "Misinformation Reports",
    date: "2026-02-27",
    readTime: "8 min read",
    body: [
      "Aggregated and anonymized across verification requests from the last two quarters, a few patterns stand out. Context hijacking remains the dominant vector by volume, outnumbering synthetic media claims by roughly four to one.",
      "Audio and translation distortion cases have grown fastest, tracking with a broader increase in cross-border sharing of voice notes during breaking news events.",
      "Synthetic visual claims are a smaller share of total volume, but carry a disproportionate share of high-confidence manipulated verdicts — when someone submits a suspected deepfake, it's more likely than not to actually be one.",
      "We'll keep publishing these reports quarterly as the dataset grows. If you'd like the underlying methodology, reach out via the contact page.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
