import { Component } from '@angular/core';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.scss'
})
export class CaisseComponent {

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
  }

}
