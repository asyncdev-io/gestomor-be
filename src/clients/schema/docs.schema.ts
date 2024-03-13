// document.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Documents {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  name: string;
}

export type DocumentDocument = Document & Document;
export const DocumentSchema = SchemaFactory.createForClass(Documents);
