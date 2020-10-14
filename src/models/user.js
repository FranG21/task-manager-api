const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('correo invalido')
                }
            }
        },
        edad: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('No se aceptan negativos')
                }
            }
        },
        pass: {
            type: String,
            require: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('pass')) {
                    throw new Error('contra invalida')
                }
            }
        },
        tokens: [{
            token: {
                type: String,
                require: true
            }
        }],
        avatar:{
            type: Buffer
        }
    }
    , {
        timestamps: true
    })

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.pass
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(pass, user.pass)

    if (!isMatch) {
        throw new Error('No funciono el login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('pass')) {
        user.pass = await bcrypt.hash(user.pass, 8)
    }

    next()
})

//Borrar en cascada
userSchema.pre('remove', async (next) => {
    const user = this
    Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User


