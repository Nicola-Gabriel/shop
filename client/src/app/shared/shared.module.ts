import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { PagerComponentComponent } from './components/pager-component/pager-component.component';
import { OrderTotalComponent } from './order-total/order-total.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponentComponent, PagerComponentComponent, OrderTotalComponent, StepperComponent, TextInputComponent, BasketSummaryComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    HeaderComponentComponent,
    PagerComponentComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    CdkStepperModule,
    StepperComponent,
    TextInputComponent,
    FormsModule,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
