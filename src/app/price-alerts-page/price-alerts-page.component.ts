import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GetProductsService } from '../services/get-products.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-price-alerts-page',
  templateUrl: './price-alerts-page.component.html',
  styleUrls: ['./price-alerts-page.component.css'],
})
export class PriceAlertsPageComponent implements OnInit {
  tempItem: any;
  showPopUp = false;
  // email = this.sharingService.getEmail();
  email = localStorage.getItem('email') as string;
  subscriptions: any = [];

  constructor(
    public authService: AuthService,
    private api: GetProductsService,
    public sharingService: SharingService
  ) {}

  ngOnInit(): void {
    console.log(this.email, typeof this.email);
    this.api.readFromCart(this.email).subscribe({
      next: (result: any) => {
        this.subscriptions = result[0]['title'];
        console.log(result);
      },
      error: (err) => console.log(err),
    });
  }

  unsubscribe(index: number) {
    this.showPopUp = true;
    let temp: any = [];
    for (let i = 0; i < this.subscriptions.length; i++) {
      if (i != index) temp.push(this.subscriptions[i]);
      else this.tempItem = this.subscriptions[i];
    }
    this.subscriptions = temp;
  }
  undo() {
    this.subscriptions.push(this.tempItem);
    this.showPopUp = false;
  }
}
