const Router = require('express').Router();
const model = require('./model.js')



// Login de un usuario
Router.post('/login', function(req, res) {
    let usuario = req.body.user
    let password = req.body.pass
    model.Users.findOne({username: usuario,pass:password}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.send(err)
        }else{
            if(doc!=null){
                req.session.userId = doc._id
                res.send("Validado")
            }else{
                res.send("No Valido")
            }
        }
    })
})

// Logout de un usuario
Router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.send("Logout")
      }
    });
  }
});



// Agregar a un usuario
Router.post('/user/new', function(req, res) {
    let user = new model.Users({
        userId: Math.floor(Math.random() * 50),
        name: req.body.nombres,
        lastname: req.body.apellidos,
        pass: req.body.pass,
        username: req.body.correo
    })
    user.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

//Obtener todos los registos del usuarios
Router.get('/events/all', function(req, res) {
    let uid = req.session.userId
    if(uid){
        model.Users.find({_id:uid}).
          exec(function (err, agenda_user) {
                if (err) {
                    res.status(500)
                    res.json(err)
                }else{
                    model.Agenda.find({'_id' : { "$in": agenda_user[0].agendas } }).
                    exec(function(err,agenda){
                        res.json(agenda)
                    })  
                }
          });
    }else{
        res.json([])
    }
})

// Agregar a una cita a la agenda del usuario
Router.post('/events/new', (req, res)=> {
    const agenda = new model.Agenda({
        title: req.body.title,
        start : req.body.start,
        end : req.body.end
    })
    agenda.save((error, documento)=>{
            if (error) {
                res.json({msj:"Error","data":err});
            }else{
                model.Users.findByIdAndUpdate(req.session.userId,{ '$push': { 'agendas': documento._id } }, (err,doc)=>{
                    res.json({msj:"Agenda Salvada", "data": documento});
                })
            }
          });
})

// Eliminar un cita por su id
Router.post('/events/delete/:id', function(req, res) {
    let uid = req.params.id
    model.Agenda.remove({"_id": uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }else{
            model.Users.findByIdAndUpdate(req.session.userId,{ '$pull': { 'agendas': uid } }, (err,doc)=>{
                res.send("Registro eliminado.")
            })
        }
    })
})

// Actualizar cita
Router.post('/events/update/:id', function(req, res) {
    let uid = req.params.id
    let updateDate = { "$set":{ "start": req.body.start , "end": req.body.end } } 
    console.log('update',uid, updateDate)
    model.Agenda.update({_id: uid},updateDate, function(error, response) {
        if(error) {
            res.status(500)
            res.json(error)
        }else{
            res.send("Registro actualizado.")
        }
    })
})


module.exports = Router
