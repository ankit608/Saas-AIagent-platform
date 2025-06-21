import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOpenAiApiKey(): string {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error("OPENAI_API_KEY is not set or is empty in environment variables.");
  }
  return apiKey;
}

export function getInngestKey(): string {
  const apiKey = process.env.INNGEST_EVENT_KEY;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error("Inngest is not set or is empty in environment variables..");
  }
  return apiKey;
}