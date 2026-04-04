import { Component, OnInit } from '@angular/core';
import { PointageService } from '../../services/pointage.service';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.scss'
})
export class PointageComponent implements OnInit {
  rapport: Record<string, unknown> | null = null;

  constructor(private readonly pointageService: PointageService) {}

  ngOnInit(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
    this.pointageService.rapportPointage(firstDay, lastDay).subscribe((response) => {
      this.rapport = response;
    });
  }
}
