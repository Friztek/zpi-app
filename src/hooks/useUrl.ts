import { useRouter } from "next/router";

export function useUrl() {
  const router = useRouter();
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  return `${origin}${router.asPath}`;
}
