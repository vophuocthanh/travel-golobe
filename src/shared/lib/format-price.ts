export function formatCurrencyVND(value?: number) {
  if (!value) return '0₫'
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
