import mongoose from 'mongoose';


const uniSchema = new mongoose.Schema(
    {
        universityName:{
            type:String,
            required:true,
            
        },
        vertical:{
            type:String,
            required:true
        },
        univserityShortName:{
            type:String,
            required:true
        },
        address:{            
            type:String,
            required:true
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
        }],
        UniversityCode:{
            type:String,
            require:true
        }

        
       
    

    },
    { timestamps: true }
)

const University = mongoose.model('University', uniSchema);

export default University;