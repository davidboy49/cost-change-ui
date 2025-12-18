"use client";

import * as React from "react";
import { Button, Card, Divider, Input, Label, Select } from "@/components/ui";
import type { CostChangeHeader, CostChangeLine } from "@/lib/types";

function nowLocalIsoMinutes() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CostChangeCreatePage() {
  const [header, setHeader] = React.useState<CostChangeHeader>({
    company: "Wavera Co.,LTD",
    costChangeId: "0000009",
    costChangeName: "Winter Fit",
    effectiveType: "Temporary",
    startDateTime: "2025-12-18T00:00",
    endDateTime: "2026-12-18T00:00",
    status: "Drafted",
  });

  const [lines, setLines] = React.useState<CostChangeLine[]>([
    { id: 1, itemCode: "AW-MERINO WOOL LAYER", currentCost: 100, newCost: 120 },
    { id: 2, itemCode: "KL-ATHLEISURE QUILTED ZIP", currentCost: 150, newCost: 160 },
    { id: 3, itemCode: "PS-MENS TAILORED FIT", currentCost: 200, newCost: 300 },
  ]);

  function update<K extends keyof CostChangeHeader>(key: K, value: CostChangeHeader[K]) {
    setHeader((h) => ({ ...h, [key]: value }));
  }

  function addLine() {
    setLines((ls) => [
      ...ls,
      { id: (ls.at(-1)?.id ?? 0) + 1, itemCode: "", currentCost: 0, newCost: 0 },
    ]);
  }

  function deleteSelected(ids: number[]) {
    setLines((ls) => ls.filter((l) => !ids.includes(l.id)));
  }

  const [selected, setSelected] = React.useState<Record<number, boolean>>({});
  const selectedIds = Object.entries(selected)
    .filter(([, v]) => v)
    .map(([k]) => Number(k));

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Cost change create page</h1>
          <div className="text-sm text-neutral-600">Header + General lines (from your Excel mockup)</div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => alert("Mock: Download template")}>Template</Button>
          <label className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50">
            Upload
            <input type="file" className="hidden" onChange={() => alert("Mock: Upload file")} />
          </label>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label>Company*</Label>
            <Input value={header.company} onChange={(e) => update("company", e.target.value)} />
          </div>
          <div>
            <Label>Cost Change ID*</Label>
            <Input value={header.costChangeId} onChange={(e) => update("costChangeId", e.target.value)} />
          </div>
          <div>
            <Label>Cost Change Name*</Label>
            <Input value={header.costChangeName} onChange={(e) => update("costChangeName", e.target.value)} />
          </div>

          <div>
            <Label>Effective Type</Label>
            <Select value={header.effectiveType} onChange={(e) => update("effectiveType", e.target.value as any)}>
              <option value="Temporary">Temporary</option>
              <option value="Permanent">Permanent</option>
            </Select>
          </div>

          <div>
            <Label>Start Date, Time*</Label>
            <Input type="datetime-local" value={header.startDateTime} onChange={(e) => update("startDateTime", e.target.value)} />
          </div>

          <div>
            <Label>End Date, Time*</Label>
            <Input type="datetime-local" value={header.endDateTime} onChange={(e) => update("endDateTime", e.target.value)} />
          </div>

          <div>
            <Label>Status</Label>
            <Select value={header.status} onChange={(e) => update("status", e.target.value as any)}>
              <option value="Drafted">Drafted</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </div>
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">General</div>
            <div className="text-sm text-neutral-600">Lines: No, Item Code, Current Cost, New Cost</div>
          </div>

          <div className="flex gap-2">
            <Button onClick={addLine}>Add line</Button>
            <Button
              variant="danger"
              onClick={() => deleteSelected(selectedIds)}
              disabled={selectedIds.length === 0}
              className="disabled:opacity-50"
            >
              Delete selected
            </Button>
          </div>
        </div>

        <div className="mt-3 overflow-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-600">
              <tr>
                <th className="p-3">(Checkbox)</th>
                <th className="p-3">No</th>
                <th className="p-3">Item Code</th>
                <th className="p-3">Current Cost</th>
                <th className="p-3">New Cost</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id} className="border-b border-neutral-100">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={!!selected[l.id]}
                      onChange={(e) => setSelected((s) => ({ ...s, [l.id]: e.target.checked }))}
                    />
                  </td>
                  <td className="p-3">{l.id}</td>
                  <td className="p-3">
                    <Input
                      value={l.itemCode}
                      onChange={(e) =>
                        setLines((ls) => ls.map((x) => (x.id === l.id ? { ...x, itemCode: e.target.value } : x)))
                      }
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      type="number"
                      value={l.currentCost}
                      onChange={(e) =>
                        setLines((ls) => ls.map((x) => (x.id === l.id ? { ...x, currentCost: Number(e.target.value) } : x)))
                      }
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      type="number"
                      value={l.newCost}
                      onChange={(e) =>
                        setLines((ls) => ls.map((x) => (x.id === l.id ? { ...x, newCost: Number(e.target.value) } : x)))
                      }
                    />
                  </td>
                </tr>
              ))}
              {lines.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-neutral-500">
                    No lines yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <Divider />

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            variant="primary"
            onClick={() => alert("Mock save. Later we can connect to API / DB.\n\n" + JSON.stringify({ header, lines }, null, 2))}
          >
            Save
          </Button>
          <Button variant="danger" onClick={() => alert("Mock delete document")}>
            Delete
          </Button>
          <Button onClick={() => history.back()}>Cancel</Button>
        </div>
      </Card>
    </main>
  );
}
