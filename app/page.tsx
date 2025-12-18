import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Cost Change Prototype</h1>
      <p className="text-neutral-600">
        This is a small Next.js + Tailwind prototype based on your Excel mockup.
      </p>
      <div className="flex gap-3">
        <Link className="rounded-lg bg-neutral-900 px-4 py-2 text-white" href="/cost-change">
          Open Cost Change List
        </Link>
        <Link className="rounded-lg border border-neutral-200 bg-white px-4 py-2" href="/cost-change/new">
          Create Cost Change
        </Link>
      </div>
    </main>
  );
}
