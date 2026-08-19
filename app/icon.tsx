import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { monogram } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: the monogram in Geist SemiBold.
 *
 * Light plate with a dark letter rather than the site's dark default — a
 * near-black tile disappears against a dark browser tab, while a light one
 * stays legible on both.
 */
export default async function Icon() {
  const semibold = await readFile(
    join(process.cwd(), "assets", "Geist-SemiBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          color: "#0a0a0a",
          fontFamily: "Geist",
          fontWeight: 600,
          fontSize: 34,
          letterSpacing: "-0.03em",
        }}
      >
        {monogram}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
