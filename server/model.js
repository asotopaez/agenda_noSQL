const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true},
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true},
  usuario : { type: String, required: true },
  pass: { type: String, required: true},
  agendas : [{ type: Schema.Types.ObjectId, ref: 'Agenda' }]
})

let UserModel = mongoose.model('Usuario', UserSchema)


let AgendaSchema = new Schema({
  agendaId: { type: Number, required: true, unique: true},
  titulo: { type: String, required: true },
  fecha_inicio: { type: Date, required: true},
  hora_inicio: { type: Date, required: true},
  fecha_fin: { type: Date },
  hora_fin: { type: Date },
  dia_completo: { type: Boolean, default:false},
})

let AgendaModel = mongoose.model('Agenda', AgendaSchema)

module.exports = { 
	"Users" : UserModel ,
	"Agenda": AgendaModel
}
