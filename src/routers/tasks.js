const express = require('express')
const Tasks = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    //const tasks = new Tasks(req.body)
    const tasks = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        const tarea = await tasks.save()
        res.status(201).send(tarea)
    } catch (e) {
        res.status(400).send(e)
    }

})

//get tasks?estado=true
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.estado) {
        match.estado = req.query.estado === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const lista = await Tasks.find({ owner: req.user._id })
        await req.user.populate('tasks').execPopulate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }


})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const tarea = await Tasks.findById(_id)
        const tarea = await Tasks.findOne({ _id, owner: req.user._id })
        if (!tarea) {
            return res.status(404).send()
        }
        res.send(tarea)
    } catch (e) {
        res.status(500).send(e)
    }


})

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['descripcion', 'estado']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Actualizacio invalida" })
    }

    try {

        const tasks = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })


        // const tasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!tasks) {
            return res.status(404).send()
        }

        //const tasks = await Tasks.findById(req.params.id)
        updates.forEach((update) => {
            tasks[update] = req.body[update]
        })
        await tasks.save()

        res.send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Tasks.findByIdAndDelete(req.params.id)
        const task = await Tasks.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        //console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router