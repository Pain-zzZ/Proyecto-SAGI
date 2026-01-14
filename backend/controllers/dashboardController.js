const db = require('../config/database');

// Obtener estadísticas para el dashboard
exports.getStats = async (req, res, next) => {
  try {
    // Total de productos
    const [totalProducts] = await db.query(
      'SELECT COUNT(*) as total FROM producto'
    );

    // Productos con stock bajo
    const [lowStock] = await db.query(`
      SELECT COUNT(*) as total 
      FROM producto p
      LEFT JOIN inventario i ON p.idProducto = i.idProducto
      WHERE COALESCE(i.cantidad, 0) <= p.stockMinimo
    `);

    // Movimientos de hoy
    const [todayMovements] = await db.query(`
      SELECT COUNT(*) as total 
      FROM movimientoinventario 
      WHERE DATE(fecha) = CURDATE()
    `);

    // Total de proveedores
    const [totalProviders] = await db.query(
      'SELECT COUNT(*) as total FROM proveedor'
    );

    res.json({
      totalProducts: totalProducts[0].total,
      lowStock: lowStock[0].total,
      todayMovements: todayMovements[0].total,
      totalProviders: totalProviders[0].total
    });

  } catch (error) {
    next(error);
  }
};