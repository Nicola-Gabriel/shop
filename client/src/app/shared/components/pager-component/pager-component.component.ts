import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager-component',
  templateUrl: './pager-component.component.html',
  styleUrls: ['./pager-component.component.scss']
})
export class PagerComponentComponent implements OnInit {
  @Input() pageSize: number;
  @Input() count: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }

}
