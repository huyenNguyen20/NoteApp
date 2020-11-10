import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [NotesModule, MongooseModule.forRoot("mongodb://localhost:27017/NoteApp", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })]
})
export class AppModule {}
