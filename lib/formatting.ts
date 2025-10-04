/**
 * Utility functions for formatting numbers and prices
 */

/**
 * Format large numbers with K, M, B suffixes
 * @param num - The number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string (e.g., "1.2K", "5.7M", "1.2B")
 */
export function formatLargeNumber(num: number, decimals: number = 1): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(decimals) + 'B'
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimals) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(decimals) + 'K'
  }
  return num.toString()
}

/**
 * Format GHOSTART token amounts with appropriate suffixes
 * @param amount - Amount in GHOSTART tokens
 * @returns Formatted string
 */
export function formatGHOSTART(amount: number): string {
  return formatLargeNumber(amount, 2)
}

/**
 * Format USDT prices with appropriate precision
 * @param usdt - USDT amount
 * @returns Formatted string
 */
export function formatUSDT(usdt: number): string {
  if (usdt >= 1) {
    return '$' + usdt.toFixed(2)
  }
  if (usdt >= 0.01) {
    return '$' + usdt.toFixed(4)
  }
  return '$' + usdt.toFixed(6)
}

/**
 * Get the current GHOSTART to USDT conversion
 * @param ghostartAmount - Amount in GHOSTART
 * @returns USDT equivalent
 */
export function ghostartToUSDT(ghostartAmount: number): number {
  return ghostartAmount * 0.000009
}

/**
 * Get the current USDT to GHOSTART conversion
 * @param usdtAmount - Amount in USDT
 * @returns GHOSTART equivalent
 */
export function usdtToGHOSTART(usdtAmount: number): number {
  return usdtAmount / 0.000009
}

/**
 * Format price with both GHOSTART and USDT
 * @param ghostartAmount - Amount in GHOSTART
 * @returns Formatted string showing both values
 */
export function formatPrice(ghostartAmount: number): string {
  const usdt = ghostartToUSDT(ghostartAmount)
  return `${formatGHOSTART(ghostartAmount)} GHOSTART (${formatUSDT(usdt)})`
}

/**
 * Format the current GHOSTART price display
 * @returns Formatted price string
 */
export function getCurrentPriceDisplay(): string {
  return "1 GHOSTART = $0.000009 USDT"
}

/**
 * Format potential returns display
 * @param multiplier - The multiplier (e.g., 100 for 100x)
 * @returns Formatted string
 */
export function formatPotentialReturn(multiplier: number): string {
  const currentPrice = 0.000009
  const futurePrice = currentPrice * multiplier
  return `${multiplier}x = ${formatUSDT(futurePrice)} per GHOSTART`
}

