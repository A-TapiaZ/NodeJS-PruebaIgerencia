const Palobj = require("../models/palobj.model");

const getObjetivos= async (req,res=response) => {
  
  try {
    
    const desde = Number(req.query.desde) || 0;
 

    const [objetivos,totalObjetivos] = await Promise.all([
      
      Palobj.find({},)
      .skip(desde)
      .limit(),

      Palobj.countDocuments()
    ]);

    res.status(200).json({
      ok:true,
      objetivos,
      totalObjetivos
    })
  } catch (err) {
    
    console.log(err);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado ...'
    });
  }
}

const newObjetivo= async (req, res=response) => {
  
  const {anio, tipo, descripcion, codigo} = req.body;

  try {

    // Busca entre los registros que la desc no exista
    const existeObj= await Palobj.findOne({descripcion});
    
    if (existeObj) {
      return res.status(400).json({
        ok:false,
        msg:'El Obj ya esta registrado'
      })
    }

    const palobj = new Palobj(req.body);

    const palobjDB= await palobj.save();

    res.json({
      ok:true,
      Objetivos:palobjDB,
    })

  } catch (err) {

    console.log(err);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado ...'
    });
  }
}

const updateobjetivo= async (req, res=response) => {
  const objId = req.params.id;
  const {descripcion } = req.body;

  try {

    // Busca entre los registros que el id exista
    const objetivoDB= await Palobj.findOne({codigo:objId});

    if (!objetivoDB) {
      return res.status(404).json({
        ok:false,
        msg:'El objetivo no existe'
      })
    }

     // Busca entre los registros que la desc no exista
     const existeObj= await Palobj.findOne({descripcion});
    
     if (existeObj) {
       return res.status(400).json({
         ok:false,
         msg:'El Obj ya esta registrado'
       })
     }

    // Actualizaciones
    // password, google, email ya no hacen parte de la copia de campos.
    console.log(req.body);
    const {anio,tipo,id} = req.body;

   const camposActualizados={
    anio,
    tipo,
    descripcion,
    id
   }

    const objetivoActualizado = await Palobj.findOneAndUpdate({codigo:objId}, camposActualizados, {new:true});

    res.json({
      ok:true,
      Objetivo:objetivoActualizado,
    })

  } catch (err) {

    console.log(err);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado ...'
    });
  }
}

const deleteObjetivo= async (req, res=response) => {
  
  const objId = req.params.id;

  try {

    // Busca entre los registros que el usuario exista
    const objetivoDB= await Palobj.findOne({codigo:objId});
    
    if (!objetivoDB) {
      return res.status(404).json({
        ok:false,
        msg:'El Objetivo por este id no existe'
      })
    }

    const objetivoBorrado = await Palobj.findOneAndDelete({codigo:objId})

    res.json({
      ok:true,
      objetivo:objetivoBorrado,
    })

  } catch (err) {

    console.log(err);
    res.status(500).json({
      ok:false,
      msg: 'Error inesperado ...'
    });
  }
}




module.exports={
  getObjetivos,
  newObjetivo,
  updateobjetivo,
  deleteObjetivo,
}