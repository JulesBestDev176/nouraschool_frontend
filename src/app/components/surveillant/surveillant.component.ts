import { Component, OnInit } from '@angular/core';
import { SurveillantService } from '../../services/surveillant.service';

@Component({
  selector: 'app-surveillant',
  templateUrl: './surveillant.component.html',
  styleUrl: './surveillant.component.scss'
})
export class SurveillantComponent implements OnInit {
  absences: Record<string, unknown>[] = [];
  convocations: Record<string, unknown>[] = [];

  constructor(private readonly surveillantService: SurveillantService) {}

  ngOnInit(): void {
    this.surveillantService.listAbsencesEleve().subscribe((data) => {
      this.absences = data;
    });
    this.surveillantService.listConvocations().subscribe((data) => {
      this.convocations = data;
    });
  }
}
