const Router = require('express').Router();
const model = require('./model.js')


//Obtener todos los registos del usuarios
Router.get('/allevents/:id', function(req, res) {
    let uid = req.params.id 
    model.User.find({userId:uid}).
      populate('agenda').
      exec(function (err, agenda) {
            if (err) {
                res.status(500)
                res.json(err)
            }
            res.json(agenda)
      });
})

// Obtener un usuario por su id
Router.post('/login', function(req, res) {
    let usuario = req.body.user
    let password = req.body.pass
    model.Users.findOne({usuario: usuario,pass:password}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.send(err)
        }else{
            if(doc!=null){
                res.send("Validado")
            }else{
                res.send("No Valido")
            }
        }
    })
})

// Agregar a un usuario
Router.post('/user/new', function(req, res) {
    console.log(req.body)
    let user = new model.Users({
        userId: Math.floor(Math.random() * 50),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        pass: req.body.pass,
        usuario: req.body.correo
    })
    user.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

// Eliminar un cita por su id
Router.get('/agenda/delete/:id', function(req, res) {
    let uid = req.params.id
    model.Agenda.remove({agendaId: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})

// Actualizar cita
Router.post('/agenda/:id', function(req, res) {

})


module.exports = Router
