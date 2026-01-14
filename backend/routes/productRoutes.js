const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

// Todas las rutas protegidas con JWT
router.use(verifyToken);

// GET /api/products - Obtener todos los productos
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear nuevo producto
router.post('/', productController.createProduct);

// PUT /api/products/:id - Actualizar producto
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Eliminar producto (lógico)
router.delete('/:id', productController.deleteProduct);

// PATCH /api/products/:id/reactivate - Reactivar producto  ⬅️ NUEVA RUTA
router.patch('/:id/reactivate', productController.reactivateProduct);

module.exports = router;