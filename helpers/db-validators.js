
const Role = require ('../models/role');
const Usuario = require ('../models/usuario');

const isRoleValid =async (role='')=>{
    const checkRol = await Role.findOne({role});
    if(!checkRol){
        throw new Error (`el role ${role} no esta regitrado en DB`)
    }
}

const checkEmail = async (email) =>{
    
  const emailChecked = await Usuario.findOne({email});
    if(emailChecked){
        throw new Error (`El correo  ${email} ya esta regitrado en DB`);
        }
}

const checkId = async ( id ) =>{
    
    const idChecked = await Usuario.findById(id);
      if(!idChecked){
          throw new Error (`El id: ${ id } no existe en BD`);
          }
  }

module.exports={
    isRoleValid,
    checkEmail,
    checkId
}