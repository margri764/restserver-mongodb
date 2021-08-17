const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const { generarJWT, googleVerify } = require('../helpers');





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

const googleSignIn = async ( req, res) => {

    const { idToken } = req.body;       
    
    try {
        
        const { name, img, email } = await googleVerify(idToken); 
   
      
        let usuario = await Usuario.findOne( {email} );
        let resToFront= "exitsUserInDB";

        if(!usuario){
            const data={
                name,
                email,
                img,
                password:'sin password - usuario de google',
                google: true
        };
            usuario = new Usuario (data)
            await usuario.save()
        }
      


        if(!usuario.state){
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'
            });
        }
        const token = await generarJWT(usuario.id);

        res.json({
            // usuario,
            // token   
            // email
            resToFront
                 
           
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }
}


module.exports={
    login,
    googleSignIn
}
