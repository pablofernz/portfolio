const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    },
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

// UserSchema.pre('save', async function (next) {
//     try {
//         // Verificar si la contraseña ya está hasheada
//         if (!this.isModified('password')) {
//             return next();
//         }

//         // Generar un salt (valor aleatorio) para hashear la contraseña
//         const salt = await bcrypt.genSalt(10);

//         // Hashear la contraseña y reemplazarla en el campo 'password'
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = mongoose.model("User", UserSchema)