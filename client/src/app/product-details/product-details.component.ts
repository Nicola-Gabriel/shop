import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../basket/basket.service';
import { IProduct } from '../shared/Models/Product';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bc: BreadcrumbService,
              private basketService: BasketService) {
                this.bc.set('@productDetails', ' ');
              }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToCart() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      alert('You can not set quantity lower than 1');
    }
  }

  // tslint:disable-next-line: typedef
  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(response => {
        this.product = response;
        this.bc.set('@productDetails', this.product.name);
      }, error => {
        console.log(error);
      });
  }

}
