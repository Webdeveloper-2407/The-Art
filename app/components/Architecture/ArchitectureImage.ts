import greatWall from "./assets/great-wall.png";
import petra from "./assets/petra.png";
import colosseum from "./assets/colosseum.png";
import chichenItza from "./assets/chichen-itza.png";
import machuPicchu from "./assets/machu-picchu.png";

type ImageAsset = { src: string } | string;

const localImages: Record<string, ImageAsset> = {
  "great-wall-of-china": greatWall,
  petra,
  colosseum,
  "chichen-itza": chichenItza,
  "machu-picchu": machuPicchu,
};

function toSrc(asset: ImageAsset | undefined): string | null {
  if (!asset) return null;
  return typeof asset === "string" ? asset : asset.src;
}

export function getArchitectureLocalImageSrc(id: string): string | null {
  return toSrc(localImages[id]);
}

export function getArchitectureImageSrc(
  id: string,
  remoteImageUrl?: string | null,
): string | null {
  return getArchitectureLocalImageSrc(id) ?? remoteImageUrl ?? null;
}
