import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() count: number;

  constructor() { }

  ngOnInit(): void {
  }

}
