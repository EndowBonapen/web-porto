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
        <p className="label text-foreground/60">Built with Next.js</p>
      </div>
    </footer>
  );
}
