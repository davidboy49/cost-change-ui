export type CostChangeStatus = "Drafted" | "Confirmed" | "Cancelled";

export type CostChangeHeader = {
  company: string;
  costChangeId: string;
  costChangeName: string;
  effectiveType: "Temporary" | "Permanent";
  startDateTime: string; // ISO
  endDateTime: string;   // ISO
  status: CostChangeStatus;
};

export type CostChangeLine = {
  id: number;
  itemCode: string;
  currentCost: number;
  newCost: number;
};

export type CostChangeDoc = CostChangeHeader & {
  supplier?: string;
  supplierContract?: string;
  transactionType?: string;
  lines: CostChangeLine[];
};
