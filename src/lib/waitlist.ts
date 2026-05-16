const BASE = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export async function submitWaitlist(
  email: string
): Promise<{ success?: boolean; already?: boolean; error?: string }> {
  const res = await fetch(`${BASE}/functions/v1/join-waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function createCheckout(
  email: string,
  plan: "monthly" | "annual"
): Promise<{ url?: string; error?: string }> {
  const res = await fetch(`${BASE}/functions/v1/create-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, plan }),
  });
  return res.json();
}
