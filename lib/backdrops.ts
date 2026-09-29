import fs from "node:fs";
import path from "node:path";

/**
 * Media is discovered from the file system (server / build time only):
 * drop a file into `public/` under the expected name and the matching
 * slot picks it up — no code change. A slot without files falls back to
 * its built-in placeholder.
 *
 *  - Scroll backdrops: `public/backdrops/<id>.mp4` and/or `<id>.jpg`
 *  - Portrait:         `public/brand/portrait.jpg`
 */

export type BackdropMedia = { video: string | null; poster: string | null };

export type BackdropId = "hero" | "ai" | "data" | "web" | "automation" | "iot";

const PUBLIC = path.join(process.cwd(), "public");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const VIDEO_EXT = ["mp4", "webm"];
const IMAGE_EXT = ["webp", "avif", "jpg", "jpeg", "png"];

function find(dir: string, name: string, exts: string[]): string | null {
  for (const ext of exts) {
    if (fs.existsSync(path.join(PUBLIC, dir, `${name}.${ext}`))) return `${BASE}/${dir}/${name}.${ext}`;
  }
  return null;
}

export function findBackdrop(id: BackdropId): BackdropMedia {
  return { video: find("backdrops", id, VIDEO_EXT), poster: find("backdrops", id, IMAGE_EXT) };
}

export function findPortrait(): string | null {
  return find("brand", "portrait", IMAGE_EXT);
}
