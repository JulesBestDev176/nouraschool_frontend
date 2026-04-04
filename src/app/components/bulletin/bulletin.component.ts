import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../services/bulletin.service';
import { Bulletin } from '../../models/bulletin';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.scss'
})
export class BulletinComponent implements OnInit {
  bulletins: Bulletin[] = [];

  constructor(private readonly bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.bulletinService.listBulletins().subscribe((bulletins) => {
      this.bulletins = bulletins;
    });
  }

}
