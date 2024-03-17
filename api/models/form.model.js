import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({

  form : [{
    categoryName:{
      type:String
    },
    fields :[{
            label: {
              type: String,
              required: true
          },
          type: {
              type: String,
              enum: ['text', 'textarea', 'checkbox', 'dropdown', 'select', 'date', 'file', 'image', 'number'],
              required: true
          },
          name: {
              type: String,
              required: true
          },
          options: [{
              label: String,
              value: String
          }],
          required: {
              type: Boolean,
              default: true
          }
    }]
  }]
   
  });


const Form = mongoose.model('Form', formSchema);

export default Form;

