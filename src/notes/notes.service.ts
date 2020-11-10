import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './schemas/notes.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable() 
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  private async findNote(id: string): Promise<Note> {
    let note;
    try {
      note = await this.noteModel.findById(id);
      
    } catch (e){
      throw new NotFoundException("Cannot Find The Note")
    }
    if(!note){
      throw new NotFoundException(`Cannot Find The Note with ID ${id}`)
    }
    return note
  };
  
  async create(createNoteDto: CreateNoteDto): Promise<string>{
    const newNote = new this.noteModel({
      title: createNoteDto.title,
      body: createNoteDto.body,
      editedBy: new Date()
    })
    let result = await newNote.save();
    return result._id as string
  }

  async findAll(): Promise<any>{
    return this.noteModel.find({})
  }

  async findOne(id: string): Promise<Note> {
    return this.findNote(id)
    
  }

  async update(id: string, updateNoteDto: UpdateNoteDto){
    let updatedField = {...updateNoteDto, editedBy: new Date()}
    let note;
    try{
      note = await this.noteModel.findByIdAndUpdate(id,
        {$set: updatedField},
        {new: true})
      
    } catch(err) {
      throw new NotFoundException("Cannot Find the Note")
    }
    if(!note){
      throw new NotFoundException("Cannot Find the Note")
    }
  }

  async remove(id: string) {
    try{
      await this.noteModel.findByIdAndRemove(id)
      .then(resp => {
        if(!resp) throw new NotFoundException("Not Found Note") // Handle Note doesn't exist in the collection
      })
    } catch (e) {
      throw new NotFoundException("Not Found Note") // Handle Note doesn't have the right ObjectID
    }
     
  }
} 
