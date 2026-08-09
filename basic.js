function knapContinuous(items, maxweight) {
  if (maxweight <= 0) return 0;

  const sorted = items.slice().sort((a, b) => {
    const ratioA = a.weight > 0 ? a.value / a.weight : Infinity;
    const ratioB = b.weight > 0 ? b.value / b.weight : Infinity;
    return ratioB - ratioA;
  });

  let remaining = maxweight;
  let totalValue = 0;

  for (const item of sorted) {
    if (remaining <= 0) break;

    if (item.weight <= 0) {
      if (item.value > 0) totalValue += item.value;
      continue;
    }

    if (item.weight <= remaining) {
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      totalValue += item.value * (remaining / item.weight);
      remaining = 0;
    }
  }

  return totalValue;
}
