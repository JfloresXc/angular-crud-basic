import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from './../../models/note.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  note: Note = new Note();
  textButton: String = 'Add Note';
  noteForm: FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.notes = [{ title: 'Zeus', description: 'El loco', id: 1 }];
  }

  get form() {
    return this.noteForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.noteForm.invalid) return;

    this.note = { ...this.note, ...this.noteForm.value };
    if (this.note.id == 0) {
      this.note.id = this.notes[this.notes.length - 1].id + 1;
      this.notes.push(this.note);
    } else {
      this.notes = this.notes.map((noteKey) => {
        if (noteKey.id === this.note.id) return this.note;
        return noteKey;
      });
    }

    this.textButton = 'Add note';
    this.note = new Note();
    this.noteForm.reset();
  }

  editNote(noteKey: Note) {
    this.textButton = 'Edit note';
    this.note = noteKey;
    this.form.title.setValue(this.note.title);
    this.form.description.setValue(this.note.description);
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter((noteKey) => note !== noteKey);
    this.note = new Note();
  }
}
