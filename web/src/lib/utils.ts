import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cal1(value: number){
  const num = Math.floor(((value-100)/(2000-100)*5  + 3 )/8*100);
  return Math.min(100, num)
}

export function cal2(value: number){
  const num = Math.floor(((value-100)/(2400-100)*5  + 3 )/8*100);
  return Math.min(100, num)
}