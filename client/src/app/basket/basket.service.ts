import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/Models/basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'https://localhost:5001/api/';
  private basketSource = new BehaviorSubject<IBasket>(null);
  public basket$ = this.basketSource.asObservable();
  private basketTotal = new BehaviorSubject<IBasketTotal>(null);
  public basketTotal$ = this.basketTotal.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotal();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotal();
    }, error => {
      console.log(error);
    });
  }

  returnBasketValue() {
   return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.returnBasketValue();
    if (basket === null) {
      basket = this.createBasket();
    }
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem [] {
   const index = items.findIndex(i => i.id === itemToAdd.id);
   console.log(items);
   if (index === -1) {
     itemToAdd.quantity = quantity;
     items.push(itemToAdd);
   } else {
     items[index].quantity += quantity;
   }

   return items;
  }

  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  incrementQuantity(item: IBasketItem) {
    const basket = this.returnBasketValue();
    const itemIndex = basket.items.findIndex(i => i.id === item.id);
    basket.items[itemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementQuantity(item: IBasketItem) {
    const basket = this.returnBasketValue();
    const itemIndex = basket.items.findIndex(i => i.id === item.id);
    if (basket.items[itemIndex].quantity > 1) {
      basket.items[itemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItem(item);
    }
  }
  removeItem(item: IBasketItem) {
    const basket = this.returnBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(x => x.id !== item.id)
      if (basket.items.length > 0){
        this.setBasket(basket);
      } else {
        this.removeBasket(basket);
      }
    }

  }
  removeBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe( () => {
      this.basketSource.next(null);
      this.basketTotal.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });

  }

  private calculateTotal() {
    const basket = this.returnBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.quantity * b.price) + a, 0);
    const total = subtotal + shipping;
    this.basketTotal.next({shipping, subtotal, total});
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    };
  }

}
