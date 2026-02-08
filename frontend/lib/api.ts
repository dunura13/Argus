export type MatchResponse = {
  matches: Array<{
    signal: Record<string, unknown>;
    score: number;
    reasoning: string;
  }>;
};

export async function matchStartup(startupDescription: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startup_description: startupDescription }),
  });

  if (!response.ok) {
    throw new Error(`Match request failed: ${response.status}`);
  }

  return (await response.json()) as MatchResponse;
}
