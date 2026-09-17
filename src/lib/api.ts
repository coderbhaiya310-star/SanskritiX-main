const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('sanskritix_token');
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || 'SanskritiX server request failed');
  return data as T;
}

export const api = {
  health: () => request<{ status: string; service: string }>('/health'),
  states: () => request('/states'),
  destinations: () => request('/destinations'),
  guides: (city?: string) => request(`/guides${city ? `?city=${encodeURIComponent(city)}` : ''}`),
  tours: (city?: string, kind?: string) => request(`/tours?${new URLSearchParams({ ...(city ? { city } : {}), ...(kind ? { kind } : {}) })}`),
  login: (email: string, password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signup: (payload: unknown) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),
  bookings: () => request('/bookings/me'),
  createBooking: (payload: unknown) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  askAI: (question: string, city = 'Agra') => request<{ answer: string; city: string }>('/ai/ask', { method: 'POST', body: JSON.stringify({ question, city }) }),
};
