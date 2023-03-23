const {Router} = require ('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();

//** Create EstadoEquipo */
router.post ('/', async function(req, res) { 

    try{
        console.log('ObjetoRecibido ',req.body);

        const estadoEquipoExists = await EstadoEquipo.findOne( {nombre: req.body.nombre} );
        if (estadoEquipoExists) { return res.send('EstadoEquipo already used!'); }

        
        let estadoEquipo = new EstadoEquipo();   // instace from the model
        
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save(); 
         
    
        res.send(estadoEquipo);
    }
    catch (error){
        console.log(error);
        res.send('EstadoEquipo Error!....');
    }
   
});


/** Get all TipoEquipo  */


router.get ('/', async function(req, res) {
    try{
        const estadosEquipo = await EstadoEquipo.find();
        res.send(estadosEquipo);

    } catch (error) {
        console.log(error);
        res.send('EstadoEquipo - GET error!');
    }

});


//** Update one TipoEquipo. - Validation of existence by name


router.put ('/:estadoEquipoId', async function(req, res) {
    try{
        console.log('ObjetoRecibido ',req.body, req.params);

        //* Get ID from records in Mongo 
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) { return res.send('EstadoEquipo do not exists!');}


        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
      
        estadoEquipo = await estadoEquipo.save(); 
        res.send(estadoEquipo);
  
    }
    catch (error){
        console.log(error);
        res.send('EstadoEquipo do not exists!');
    }

});


module.exports = router;