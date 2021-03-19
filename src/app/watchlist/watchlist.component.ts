import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  currentUser = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

    if (!this.getAlreadyReloaded()) {
      this.setAlreadyReloaded();
      window.location.reload();
    }
  }

  getAlreadyReloaded(): any {
    return JSON.parse(localStorage.getItem('alreadyReloaded') as any);
  }

  setAlreadyReloaded(): void {
    localStorage.setItem('alreadyReloaded', JSON.stringify(true));
  }
}
