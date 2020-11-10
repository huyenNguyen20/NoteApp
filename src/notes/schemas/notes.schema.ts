import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({required: true})
  title: string;

  @Prop()
  body: string;

  @Prop()
  EditedBy: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);