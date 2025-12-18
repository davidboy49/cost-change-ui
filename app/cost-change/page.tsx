"use client";

import * as React from "react";
import Link from "next/link";
import { Button, Card, Checkbox, Divider, Input, Label, Select } from "@/components/ui";
import { mockDocs } from "@/lib/mockData";
import type { CostChangeDoc, CostChangeStatus } from "@/lib/types";

function matches(doc: CostChangeDoc, q: string, status: CostChangeStatus | "All") {
  const query = q.trim().toLowerCase();
  const hit =
    !query ||
    doc.costChangeId.toLowerCase().includes(query) ||
    doc.costChangeName.toLowerCase().includes(query) ||
    (doc.supplier ?? "").toLowerCase().includes(query);

  const statusHit = status === "All" ? true : doc.status === status;
  return hit && statusHit;
}

export default function CostChangeListPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<CostChangeStatus | "All">("All");
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const rows = React.useMemo(
    () => mockDocs.filter((d) => matches(d, query, status)),
    [query, status]
  );

  const allChecked = rows.length > 0 && rows.every((r) => selected[r.costChangeId]);
  const someChecked = rows.some((r) => selected[r.costChangeId]) && !allChecked;

  function toggleAll(v: boolean) {
    const next: Record<string, boolean> = { ...selected };
    for (const r of rows) next[r.costChangeId] = v;
    setSelected(next);
  }

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Cost change list</h1>
          <div className="text-sm text-neutral-600">Search, filter, then open an item.</div>
        </div>

        <Link href="/cost-change/new">
          <Button variant="primary">Add</Button>
        </Link>
      </div>

      <Card>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div>
            <Label>Search</Label>
            <Input
              placeholder="Search by ID / name / supplier"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="All">All</option>
              <option value="Drafted">Drafted</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button
              onClick={() => {
                setQuery("");
                setStatus("All");
                setSelected({});
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => alert("Mock action: Confirm selected")}
              disabled={!rows.some((r) => selected[r.costChangeId])}
              className="disabled:opacity-50"
            >
              Confirm
            </Button>
          </div>
        </div>

        <Divider />

        <div className="overflow-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-600">
              <tr>
                <th className="p-3">
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Select all"
                      type="checkbox"
                      checked={allChecked}
                      ref={(el) => {
                        if (el) el.indeterminate = someChecked;
                      }}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                    <span>(Checkbox)</span>
                  </div>
                </th>
                <th className="p-3">Cost Change ID</th>
                <th className="p-3">Cost Change Name</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Supplier Contract</th>
                <th className="p-3">Transaction Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.costChangeId} className="border-b border-neutral-100">
                  <td className="p-3">
                    <Checkbox
                      checked={!!selected[d.costChangeId]}
                      onChange={(v) => setSelected((s) => ({ ...s, [d.costChangeId]: v }))}
                    />
                  </td>
                  <td className="p-3 font-mono text-xs">{d.costChangeId}</td>
                  <td className="p-3">{d.costChangeName}</td>
                  <td className="p-3">{d.supplier ?? "-"}</td>
                  <td className="p-3">{d.supplierContract ?? "-"}</td>
                  <td className="p-3">{d.transactionType ?? "-"}</td>
                  <td className="p-3">
                    <span className="rounded-full border border-neutral-200 bg-white px-2 py-1 text-xs">
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button onClick={() => alert("Mock: View " + d.costChangeId)}>View</Button>
                      <Button onClick={() => alert("Mock: Edit " + d.costChangeId)}>Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-neutral-500">
                    No results.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
