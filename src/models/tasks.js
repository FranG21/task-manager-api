const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Tasks = mongoose.model('Tasks', taskSchema)



module.exports = Tasks