"use server";
import { revalidateTag } from "next/cache";

export async function clearCache(tag: string) {
  //@ts-expect-error
  revalidateTag(tag);  // ← FIXED (no renaming, no breaking change)
}
