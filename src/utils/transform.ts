import mongoose, { Document, Schema } from 'mongoose';

export const transformSchema = (schema: Schema<Document>) => {
  schema.set('toJSON', {
    transform: (document: Document, returnedObject: Record<string, any>) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
};
