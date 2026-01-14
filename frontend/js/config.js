// ===== CONFIGURACIÓN GLOBAL =====
const API_URL = 'http://localhost:3000/api';

// Helper para hacer peticiones a la API
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('Error en la API:', error);
    throw error;
  }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Función para verificar autenticación
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token && !window.location.pathname.includes('../html/index.html') && window.location.pathname !== '/') {
    window.location.href = '../html/index.html';
  }
}

// Verificar autenticación al cargar cualquier página
if (!window.location.pathname.includes('../html/index.html') && window.location.pathname !== '/') {
  checkAuth();
}

