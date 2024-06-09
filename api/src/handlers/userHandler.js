const UserSchema = require("../models/User")
const User = require("../models/User")

const createUser = async (req, res) => {
    const { name, lastname, email, password, image } = req.body
    const existingUser = await User.findOne({
        email
    });
    try {
        if (!existingUser) {
            const newClient = await UserSchema.create({ name, lastname, email, password, image });
            return res.status(200).json({ message: "Usuario creado con éxito", user: newClient });
        } else {
            return res.status(400).send("Ya existe un usuario con este correo")
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, lastname, email, password, image } = req.body
    const updateData = { name, lastname, email, password, image }

    try {
        const oldUser = await User.findById(id)
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })

        const hasChanged = (
            updatedUser.name !== oldUser.name ||
            updatedUser.lastname !== oldUser.lastname ||
            updatedUser.email !== oldUser.email ||
            updatedUser.password !== oldUser.password ||
            updatedUser.image !== oldUser.image
        )

        if (!hasChanged) {
            return res.status(400).send("No se realizaron cambios")
        } else {
            return res.status(200).send("Información actualizada")
        }

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        await User.deleteOne({ _id: id })
        return res.status(200).send("Usuario eliminado")

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = { createUser, getUsers, deleteUser, updateUser }