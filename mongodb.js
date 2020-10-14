//crud

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('no se puede conectar a la base de datos')
    }

    const db = client.db(dataBaseName)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Victor',
    //     edad: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('No se pudo insaertar el usuario')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'David',
    //         edad: '21'
    //     }, {
    //         name: 'Pedro',
    //         edad: 30
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Error grave')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({ _id: new ObjectID("5f7ea7ed4429fb09d073f2b6") }, (error, user) => {
    //     if (error) {
    //         return console.log('Hay fallo')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ edad: 23 }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('Hay fallo')
    //     }
    //     console.log(users)
    // })

    // db.collection('users').find({ edad: 23 }).count((error, users) => {
    //     if (error) {
    //         return console.log('Hay fallo')
    //     }
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5f7f7a174cf2250d680193d7") }, (error, user) => {
    //     console.log(user)
    // })

    // db.collection('tasks').find({ estado: false }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f7f7865cabab52134d87cc2")
    // }, {
    //     $inc: {
    //         edad: 10
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     estado: false
    // },{
    //     $set:{
    //         estado:true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').deleteMany({
    //     edad: 23
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        descripcion: 'Lavar'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})