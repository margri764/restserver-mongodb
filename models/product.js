
const {Schema,model} = require ('mongoose');

const ProductSchema = Schema({
    
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
    },

    precio: {
        type: Number,
        default: 0
    },

    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },

    description :{ type: String},
    status: {type: Boolean, default: true}

});

ProductSchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject();
    
    return data; 
}

module.exports= model ('Product', ProductSchema);