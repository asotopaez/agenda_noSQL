const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      MongoStore = require('connect-mongo')(session);
	    model = require('./model.js');
const PORT = 3000
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/agenda')


const crearUsuario = ()=>{
    let user = new model.Users({
        userId: Math.floor(Math.random() * 50),
        name: 'Alejandro',
        lastname: 'Soto',
        pass: '123456',
        username: 'Asoto'
    })
    user.save(function(error) {
        if (error) {
            //console.log(error)
        }
        console.log("Registro guardado, su Usuario es: Asoto y su Password es: 123456")
    })


}


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'alex_agenda',
                 saveUninitialized:false,
                 resave: true,
                 store: new MongoStore({ mongooseConnection: mongoose.connection })
               })
        );
app.use('/', Routing);

Server.listen(PORT, function() {
  crearUsuario()
  console.log('Server is listeng on port: ' + PORT)
})
