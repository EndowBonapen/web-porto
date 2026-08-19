import { Heart } from "lucide-react";
import { profile } from "@/content/site";

export default function Footer() {
  // Static export, so this is stamped at build time and refreshes on deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-8">
        <p className="label text-foreground/60">
          &copy; {year} {profile.fullName}
        </p>
        <p className="label flex items-center gap-1.5 text-foreground/60">
          Built with love
          {/* Filled rather than outlined, and tied to --foreground so it
              stays legible in both themes instead of a fixed colour. */}
          <Heart size={12} fill="currentColor" stroke="none" />
        </p>
      </div>
    </footer>
  );
}
