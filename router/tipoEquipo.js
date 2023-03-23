const { Router } = require ('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();


//** Create TipoEquipo */
router.post ('/', async function(req, res) { 

    try{
        console.log('ObjetoRecibido ',req.body);

        const tipoEquipoExists = await TipoEquipo.findOne( {nombre: req.body.nombre} );
        if (tipoEquipoExists) { return res.send('TipoEquipo already used!'); }

        let tipoEquipo = new TipoEquipo();   // instace from the model
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();  
    
        res.send(tipoEquipo);
    }
    catch (error){
        console.log(error);
        res.send('TipoEquipo Error!....')
    }
   
});

//** Get all TipoEquipo  */
router.get ('/', async function(req, res) {
    try{
        const tiposEquipo = await TipoEquipo.find();
        res.send(tiposEquipo);

    } catch (error) {
        console.log(error);
        res.send('TipoEquipo - GET error!');
    }

});

//** Update one TipoEquipo. - Validation of existence by name*/
router.put ('/:tipoEquipoId', async function(req, res) {
    try{
        console.log('ObjetoRecibido ',req.body, req.params);

        //* Get ID form records in Mongo */
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoEquipo) { return res.send('TipoEquipo do not exists!');}


        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
      
        tipoEquipo = await tipoEquipo.save(); 
        res.send(tipoEquipo);
  
    }
    catch (error){
        console.log(error);
        res.send('TipoEquipo do not exists!');
    }
});

module.exports = router;