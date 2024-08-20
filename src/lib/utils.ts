import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

const error = console.error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return
  error(...args)
}
