const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userSchema = require('../validators/userValidators');

// Rutas para los usuarios
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

router.post('/', (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Error de validación',
            details: error.details
        });
    }

    req.body = value; // Si la validación pasa, los datos validados se agregan al cuerpo de la solicitud
    next(); // Llama al siguiente middleware, en este caso el controlador
}, userController.createUser);

router.put('/:id', (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Error de validación',
            details: error.details
        });
    }

    req.body = value; // Si la validación pasa, los datos validados se agregan al cuerpo de la solicitud
    next(); // Llama al siguiente middleware, en este caso el controlador
}, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
