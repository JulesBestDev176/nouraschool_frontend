import { Component, OnInit } from '@angular/core';
import { SurveillantService } from '../../services/surveillant.service';

@Component({
  selector: 'app-convocation',
  templateUrl: './convocation.component.html',
  styleUrl: './convocation.component.scss'
})
export class ConvocationComponent implements OnInit {
  convocations: Record<string, unknown>[] = [];

  constructor(private readonly surveillantService: SurveillantService) {}

  ngOnInit(): void {
    this.surveillantService.listConvocations().subscribe((response) => {
      this.convocations = response;
    });
  }
}
