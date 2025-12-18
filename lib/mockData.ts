import type { CostChangeDoc } from "./types";

export const mockDocs: CostChangeDoc[] = [
  {
    company: "Wavera Co.,LTD",
    costChangeId: "0000009",
    costChangeName: "Winter Fit",
    supplier: "Supplier A",
    supplierContract: "SC-2025-01",
    transactionType: "Purchase",
    effectiveType: "Temporary",
    startDateTime: "2025-12-18T00:00",
    endDateTime: "2026-12-18T00:00",
    status: "Drafted",
    lines: [
      { id: 1, itemCode: "AW-MERINO WOOL LAYER", currentCost: 100, newCost: 120 },
      { id: 2, itemCode: "KL-ATHLEISURE QUILTED ZIP", currentCost: 150, newCost: 160 },
      { id: 3, itemCode: "PS-MENS TAILORED FIT", currentCost: 200, newCost: 300 },
    ],
  },
];
