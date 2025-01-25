//Llamar al modelo usuario
const User = require('../models/user');

// Obtener todos los usuarios
// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener un usuario por id
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error al obtener usuario:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { nombre, correo, edad } = req.body;

        // Validar si los datos requeridos están presentes
        if (!nombre || !correo) {
            return res.status(400).json({ error: 'Nombre y correo son requeridos' });
        }

        // Crear el nuevo usuario en la base de datos
        const newUser = await User.create({
            nombre,
            correo,
            edad
        });

        res.status(201).json(newUser);  // Devuelve el usuario creado
    } catch (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, edad } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar los atributos del usuario
        await user.update({
            nombre: nombre || user.nombre,
            correo: correo || user.correo,
            edad: edad || user.edad
        });

        res.status(200).json(user);
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();  // Eliminar el usuario
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
