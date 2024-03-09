import mongoose from "mongoose";

// Option 3: Define separate schema for Center
const centerSchema = new mongoose.Schema(
    {
      OwnerName: {
        type: String,
        required: true,
      },
      OwnerFatherName: {
        type: String,
        required: true,
      },
      InsitutionName: {
        type: String,
        required: true,
      },
      ContactNumber:{
        type:String,
        required:true
      },
      WhatappNumber: {
        type:String,
        
      },
      CenterCode: {
        type:String,
        required:true
      },
      DateOfBirth:{
        type:Date,
        required:true

      },
      email:{
        type:String,
        require:true
      },
      password:{
        type:String,
        required:true 
      },
      city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        required:true
      },
      zipCode:{
        type:Number,
      },
      address:{
        type:String,
        required:true
      },
      FrontAdhar:{
        type:String,
        required:true
      },
      BackAdhar:{
        type:String,
        required:true
    },
    PanCard:{
        type:String,
        required:true
    },
    ProfilePhoto: {
        type:String,
        required:true
    },
    VistOffice : {
        type:String,
        required:true
    }



      // Add other fields as needed
    },
    { timestamps: true }
  );
  const Center = mongoose.model('Center', centerSchema);
  export default Center
