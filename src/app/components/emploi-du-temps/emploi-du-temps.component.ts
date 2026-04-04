import { Component, OnInit } from '@angular/core';
import { EmploiDuTempsService } from '../../services/emploi-du-temps.service';

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrl: './emploi-du-temps.component.scss'
})
export class EmploiDuTempsComponent implements OnInit {
  emplois: Record<string, unknown>[] = [];

  constructor(private readonly emploiService: EmploiDuTempsService) {}

  ngOnInit(): void {
    this.emploiService.list().subscribe((response) => {
      this.emplois = (response['content'] as Record<string, unknown>[]) ?? [];
    });
  }
}
