const db = require('../config/database');

// Obtener todos los proveedores
exports.getAllProviders = async (req, res, next) => {
  try {
    const [providers] = await db.query(`
      SELECT 
        idProveedor,
        nombre,
        telefono,
        correo
      FROM proveedor
      ORDER BY nombre ASC
    `);

    res.json(providers);
  } catch (error) {
    next(error);
  }
};

// Crear nuevo proveedor
exports.createProvider = async (req, res, next) => {
  try {
    const { nombre, telefono, correo } = req.body;

    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del proveedor es obligatorio'
      });
    }

    const [result] = await db.query(
      'INSERT INTO proveedor (nombre, telefono, correo) VALUES (?, ?, ?)',
      [nombre, telefono || null, correo || null]
    );

    res.status(201).json({
      success: true,
      message: 'Proveedor creado correctamente',
      idProveedor: result.insertId
    });

  } catch (error) {
    next(error);
  }
};