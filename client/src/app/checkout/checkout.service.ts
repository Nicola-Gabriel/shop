import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrderToCreate } from '../shared/Models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl =  'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  creatOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'order', order);
  }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'order/deliveryMethod').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
