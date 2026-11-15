export function formatCurrency(amount: number, showSign = false): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (showSign) {
    return amount < 0 ? `-$${formatted}` : `$${formatted}`;
  }
  return `$${formatted}`;
}

export function formatShortCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}k`;
  }
  return `$${amount}`;
}
