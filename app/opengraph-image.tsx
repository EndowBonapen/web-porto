import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.fullName} — ${profile.role}`;

/**
 * The social preview card. Same two colours and same face as the site, so a
 * shared link looks like it came from the same place.
 *
 * Fonts are read from assets/ rather than fetched at build time — a network
 * call here would make the build fail offline. Static instances are used
 * because Satori does not resolve variable-font weight axes; both weights
 * are registered so the card can hold a hierarchy rather than being uniformly
 * bold.
 *
 * Satori is not a browser: every element holding more than one child needs
 * an explicit display:flex, and only a subset of CSS is supported.
 */
export default async function OpengraphImage() {
  const dir = join(process.cwd(), "assets");
  const [regular, semibold] = await Promise.all([
    readFile(join(dir, "Geist-Regular.ttf")),
    readFile(join(dir, "Geist-SemiBold.ttf")),
  ]);

  // Scales the name down as it gets longer, so a two-word name like "Endow
  // Bonapen" doesn't run off the 1200px canvas the way a fixed 152px would.
  // 0.6 is a rough per-character width fraction for bold Geist at this
  // tracking; the 0.9 factor is slack for that being an estimate, not a
  // measurement. Short names still clamp to the original 152px.
  const canvasWidth = size.width - 160; // minus the 80px padding on each side
  const nameSize = Math.max(
    64,
    Math.min(152, Math.floor((canvasWidth * 0.9) / (profile.name.length * 0.6))),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          fontFamily: "Geist",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: nameSize,
              fontWeight: 600,
              // Matches the -0.04em the hero uses at display sizes.
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 42,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              marginTop: 20,
              color: "rgba(250,250,250,0.70)",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(250,250,250,0.15)",
            paddingTop: 28,
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>{profile.email}</div>
          <div style={{ display: "flex" }}>Portfolio</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, style: "normal", weight: 400 },
        { name: "Geist", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
