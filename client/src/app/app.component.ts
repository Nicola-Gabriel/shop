import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/Models/pagination';
import { IProduct } from './shared/Models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Commerce';

  constructor(private basketService: BasketService,
              private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentBasket();
    this.loadCurrentUser();
  }

  loadCurrentBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('all works fine');
      }, error => {
        console.log(error);
      });
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe( () => {
      console.log('user loaded');
    }, error => {
      this.router.navigateByUrl('/');
    });
  }
}

