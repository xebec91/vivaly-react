const API_BASE = '/api/adminUser';

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur admin.');
  }

  return data;
}

export async function getAdminUsers() {
  const response = await fetch(`${API_BASE}/users`, {
    credentials: 'include',
  });

  return handleResponse(response);
}

export async function getAdminUserById(id) {
  const response = await fetch(`${API_BASE}/show/${id}`, {
    credentials: 'include',
  });

  return handleResponse(response);
}

export async function updateAdminUser(id, form) {
  const response = await fetch(`${API_BASE}/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(form),
  });

  return handleResponse(response);
}

export async function deleteAdminUser(id) {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: 'POST',
    credentials: 'include',
  });

  return handleResponse(response);
}