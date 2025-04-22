const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters']
        },
        lastName:{
            type:String,
            minlength:[3,'Last name must be at least 3 characters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,'Password must be at least 6 characters']
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        default:'online',
        enum:['offline','online','busy']
    },
    phoneNumber:{
        type:String,
        required:true,
        minlength:[10,'Phone number must be at least 10 characters']
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 3 characters']
        },
        plateNumber:{
            type:String,
            required:true,
            minlength:[3,'Plate number must be at least 3 characters']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['sedan','suv','van','car','motorcycle','bicycle','auto']
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


captainSchema.methods.generateToken = function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const captainModel = mongoose.model('Captain',captainSchema);
module.exports = captainModel;