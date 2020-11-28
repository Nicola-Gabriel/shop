import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/Models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  incrementQuantity (item: IBasketItem) {
    this.basketService.incrementQuantity(item);
  }

  decrementQuantity (item: IBasketItem) {
    this.basketService.decrementQuantity(item);
  }
  
  removeItemFromBasket (item: IBasketItem) {
    this.basketService.removeItem(item);
  }
}
