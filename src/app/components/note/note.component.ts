import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit {
  notes: Note[] = [];

  constructor(private readonly noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.listNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }
}
