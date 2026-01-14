// ===== DASHBOARD - ESTADÍSTICAS =====

async function loadDashboardStats() {
  try {
    // Cargar estadísticas desde la API
    const stats = await apiRequest('/dashboard/stats');

    // Actualizar números en las tarjetas
    document.getElementById('totalProducts').textContent = stats.totalProducts || 0;
    document.getElementById('lowStock').textContent = stats.lowStock || 0;
    document.getElementById('todayMovements').textContent = stats.todayMovements || 0;
    document.getElementById('totalProviders').textContent = stats.totalProviders || 0;

  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
    // Mostrar valores por defecto en caso de error
    document.getElementById('totalProducts').textContent = '-';
    document.getElementById('lowStock').textContent = '-';
    document.getElementById('todayMovements').textContent = '-';
    document.getElementById('totalProviders').textContent = '-';
  }
}

// Cargar estadísticas al iniciar
if (window.location.pathname.includes('../html/menu.html')) {
  loadDashboardStats();
}