import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { PagerComponentComponent } from './components/pager-component/pager-component.component';
import { OrderTotalComponent } from './order-total/order-total.component';



@NgModule({
  declarations: [HeaderComponentComponent, PagerComponentComponent, OrderTotalComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    HeaderComponentComponent,
    PagerComponentComponent,
    CarouselModule,
    OrderTotalComponent
  ]
})
export class SharedModule { }
