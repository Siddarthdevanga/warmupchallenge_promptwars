const API_URL = process.env.API_URL || 'http://localhost:8080';

export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/api/explore/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}
