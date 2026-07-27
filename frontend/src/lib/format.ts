const LOCALE_AT = 'de-AT';

export function formatCurrency(amount: string | number): string {
  const value = typeof amount === 'string' ? Number(amount) : amount;
  if (!Number.isFinite(value)) {
    throw new Error(`formatCurrency: ungültiger Betrag "${amount}"`);
  }
  return new Intl.NumberFormat(LOCALE_AT, {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function formatQuantity(
  quantity: string | number,
  unit?: string,
): string {
  const value = typeof quantity === 'string' ? Number(quantity) : quantity;
  if (!Number.isFinite(value)) {
    throw new Error(`formatQuantity: ungültige Menge "${quantity}"`);
  }
  const formatted = new Intl.NumberFormat(LOCALE_AT, {
    maximumFractionDigits: 3,
  }).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatDate(date: string | Date): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(LOCALE_AT, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat(LOCALE_AT, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value / 100);
}
