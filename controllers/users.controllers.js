const {response} = require ('express');
const bcryptjs = require ('bcryptjs');
const Usuario = require ('../models/usuario');


const usersGet = async (req,res=response)=>{

    const { limit , from }=req.query;
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments( {state:true}),
        Usuario.find( {state:true} )
            .skip( Number (from))
            .limit( Number (limit))
    ])  
   

    res.json({ 
        // total,     
      usuarios

    });
}

const usersPost= async (req, res = response) => {
    
 

    const {name, email, password,role}= req.body
    console.log(req)
    
    const usuario = new Usuario ({name,email, password,role});
    
    const checkEmail = await Usuario.findOne({email});
    if(checkEmail){
        return res.status(400).json({
            msg:'Este correo ya esta registrado'
        });
    }

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();
    res.json({
        msg:'desde backend',
        usuario
    })


}

const usersPut= async (req, res) => {
    
    const { id } = req.params;
    const { _id, password,google, ...rest } = req.body;
    
    if( password ){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id,rest );

    res.json({    
        msg:'put API - controller',
        usuario, 
        id
    });
}

const usersDelete= async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{state:false})
    const usuarioAuth = req.usuarioAuth;

    res.json({       
        usuario,
        usuarioAuth
        
    });
}


module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}