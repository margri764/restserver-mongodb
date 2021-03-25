const {Schema, model} = require ('mongoose');

const UserSchema = Schema({
    name:  {
        type:String,
        required: [true, 'el nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true,'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: 'la contraseña es obligatoria',
    },
    img : {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: [ 'ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        required: false
    }

});

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid= _id;
    return usuario; 
}


module.exports= model('User', UserSchema);