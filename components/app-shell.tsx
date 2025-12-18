import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-neutral-900" />
          <div>
            <div className="text-sm text-neutral-500">Prototype</div>
            <div className="font-semibold">Cost Change</div>
          </div>
        </div>

        <nav className="flex items-center gap-2 text-sm">
          <Link className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="/cost-change">
            List
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="/cost-change/new">
            Create
          </Link>
        </nav>
      </header>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        {children}
      </div>
    </div>
  );
}
