import { Component, OnInit } from '@angular/core';
import { SurveillantService } from '../../services/surveillant.service';

@Component({
  selector: 'app-absence-eleve',
  templateUrl: './absence-eleve.component.html',
  styleUrl: './absence-eleve.component.scss'
})
export class AbsenceEleveComponent implements OnInit {
  absences: Record<string, unknown>[] = [];

  constructor(private readonly surveillantService: SurveillantService) {}

  ngOnInit(): void {
    this.surveillantService.listAbsencesEleve().subscribe((response) => {
      this.absences = response;
    });
  }
}
