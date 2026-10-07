const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
}

export async function fetchPlans() {
  const res = await fetch(`${API_BASE}/plans`);
  return res.json();
}

export async function fetchTrainers() {
  const res = await fetch(`${API_BASE}/trainers`);
  return res.json();
}

export async function fetchClasses(day = 'All', category = 'All') {
  let url = `${API_BASE}/classes?day=${encodeURIComponent(day)}&category=${encodeURIComponent(category)}`;
  const res = await fetch(url);
  return res.json();
}

export async function bookClassSlot(bookingData) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  return res.json();
}

export async function registerMember(memberData) {
  const res = await fetch(`${API_BASE}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memberData)
  });
  return res.json();
}

export async function fetchMembers() {
  const res = await fetch(`${API_BASE}/members`);
  return res.json();
}

export async function submitInquiry(inquiryData) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData)
  });
  return res.json();
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  return res.json();
}
