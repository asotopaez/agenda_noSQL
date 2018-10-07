const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  userId: { type: Number, required: true, unique: true},
  name: { type: String, required: true },
  lastname: { type: String, required: true},
  username : { type: String, required: true , unique:true, dropDups: true},
  pass: { type: String, required: true},
  agendas : [{ type: Schema.Types.ObjectId, ref: 'Agenda' }]
})

let UserModel = mongoose.model('Usuario', UserSchema)


let AgendaSchema = new Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true},
  end: { type: Date, default:''} 
})

let AgendaModel = mongoose.model('Agenda', AgendaSchema)

module.exports = { 
	"Users" : UserModel ,
	"Agenda": AgendaModel
}
