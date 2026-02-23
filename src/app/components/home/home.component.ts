import { Component } from '@angular/core';
import { EcoleInfo } from '../../models/ecole-info';
import { DeveloppeurInfo } from '../../models/developpeur-info';
import { MockDataService } from '../../services/mock-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  ecoleInfo: EcoleInfo;
  developpeurInfo: DeveloppeurInfo;

  constructor(
    private router: Router,
    private mockDataService: MockDataService
  ) {
    this.ecoleInfo = this.mockDataService.getEcoleInfo();
    this.developpeurInfo = this.mockDataService.getDeveloppeurInfo();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  goToAdminDashboard(): void {
    this.router.navigate(['/dashboard/admin']);
  }
}
