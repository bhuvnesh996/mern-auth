import mongoose from 'mongoose';


const uniSchema = new mongoose.Schema(
    {
        universityName:{
            type:String,
            require:true,
            
        },
        vertical:{
            type:String,
            require:true
        },
        univserityShortName:{
            type:String,
            require:true
        },
        address:{            
            type:String,
            require:true
        },
        UniLogo:{
            type:String,
            default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
            
        },
        DealingWith:{
            type:String,
            default:"default"
        },
        status:{
            type:String,
            enum :['active','dactivated'],
            default:"active"
        },
        course:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }]
        
       
    

    },
    { timestamps: true }
)

const University = mongoose.model('University', uniSchema);

export default University;