const API_URL = process.env.API_URL || 'http://localhost:8080';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '5000';

  const res = await fetch(`${API_URL}/api/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  const data = await res.json();
  return Response.json(data);
}
