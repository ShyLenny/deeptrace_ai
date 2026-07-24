export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
export const ACCEPTED_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES];

/**
 * The model accepts media inline as base64. Requests above roughly 20 MB are
 * rejected, so cap uploads below that with room for the encoding overhead.
 */
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 15 * 1024 * 1024;

export function isVideo(type: string) {
  return ACCEPTED_VIDEO_TYPES.includes(type);
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns an error message the UI can show directly, or null when the file is usable. */
export function validateMediaFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return `${file.type || "That file type"} isn't supported. Upload a JPEG, PNG, WebP, HEIC, MP4, MOV, or WebM file.`;
  }

  const limit = isVideo(file.type) ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit) {
    return `That file is ${formatBytes(file.size)}. The limit is ${formatBytes(limit)} — try a shorter clip or a smaller image.`;
  }

  if (file.size === 0) {
    return "That file is empty. Pick another one.";
  }

  return null;
}
