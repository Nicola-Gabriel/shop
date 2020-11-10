import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { PagerComponentComponent } from './components/pager-component/pager-component.component';



@NgModule({
  declarations: [HeaderComponentComponent, PagerComponentComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    HeaderComponentComponent,
    PagerComponentComponent
  ]
})
export class SharedModule { }
