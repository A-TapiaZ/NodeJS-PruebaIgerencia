const { Schema, model } = require("mongoose");


const PalObjSchema = Schema({

  anio:{
    type:String,
    required:true,
  },
  tipo:{
    type:String,
    required:true,
  },
  descripcion:{
    type:String,
    required:true,
  },
  codigo:{
    type:Number,
    required:true
  }
})

PalObjSchema.method('toJSON', function () {
  const {__v,_id,...object}= this.toObject();

  object.id=_id;
  return object;
})

module.exports=model('Palobj',PalObjSchema);