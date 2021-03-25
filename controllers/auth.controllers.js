const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const  generarJWT  = require('../helpers/generar-jwt');



const login = async (req, res=response)=>{

    const {email, password} = req.body;

   try {
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }

        if(!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario no activo en BD'
            })
        }

        const checkPassword = bcryptjs.compareSync(password, usuario.password)
        if(!checkPassword) {
            return res.status(400).json({
                msg: 'Pasword incorrecto'
            })
        }
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token

        })

   } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
    })
       
   }
   
    

     

}


module.exports={
    login
}
