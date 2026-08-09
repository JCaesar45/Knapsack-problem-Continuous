export interface Offer {
  name: string;
  weight: number;
  value: number;
}

export interface Selection {
  name: string;
  weight: number;
  value: number;
  fraction: number;
}

export interface AllocationResponse {
  total_value: number;
  total_weight: number;
  selections: Selection[];
}

const ratio = (item: Readonly<Offer>): number => {
  return item.weight > 0 ? item.value / item.weight : 0;
};

export function optimizeLocal(
  items: ReadonlyArray<Readonly<Offer>>,
  capacity: number
): AllocationResponse {
  const sorted = [...items].sort((a, b) => ratio(b) - ratio(a));

  let remaining = capacity;
  let totalValue = 0;
  let totalWeight = 0;
  const selections: Selection[] = [];

  for (const item of sorted) {
    if (remaining <= 0) break;
    if (item.weight <= 0) continue;

    const takeWeight = Math.min(item.weight, remaining);
    const fraction = takeWeight / item.weight;
    const takeValue = item.value * fraction;

    selections.push({
      name: item.name,
      weight: takeWeight,
      value: takeValue,
      fraction
    });

    totalWeight += takeWeight;
    totalValue += takeValue;
    remaining -= takeWeight;
  }

  return {
    total_value: totalValue,
    total_weight: totalWeight,
    selections
  };
}

export async function optimizeRemote(
  baseUrl: string,
  items: ReadonlyArray<Readonly<Offer>>,
  capacity: number
): Promise<AllocationResponse> {
  const response = await fetch(`${baseUrl}/api/optimize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items, capacity })
  });

  if (!response.ok) {
    throw new Error(`Optimization request failed: ${response.status}`);
  }

  return response.json() as Promise<AllocationResponse>;
}
