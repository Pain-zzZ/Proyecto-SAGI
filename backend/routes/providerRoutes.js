const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { verifyToken } = require('../middleware/authMiddleware');

// Proteger todas las rutas
router.use(verifyToken);

// GET /api/providers - Obtener todos los proveedores
router.get('/', providerController.getAllProviders);

// POST /api/providers - Crear nuevo proveedor
router.post('/', providerController.createProvider);

module.exports = router;