
const {Schema,model} = require ('mongoose');

const CategorySchema = Schema({
    
    name :{
        type:String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    },

    state :{
        type:Boolean,
        default: true,
        required: true
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});

CategorySchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject();
    
    return data; 
}

module.exports= model ('Category', CategorySchema);