import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    description:{
      type: String
    },
    color:{
      type :String
    },
    createdBy:{
      type :String
    },
    isArchieve:{
      type: Boolean,
      default: false
    },
    isTrash:{
      type: Boolean,
      default: false
    }
    
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);

