import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { Renderer2 } from '@angular/core';
import { AdditemService } from '../services/additem.service';
import { Item, Node } from '../shared/item';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CanvasComponent implements OnInit {
  constructor(
    private additemservice: AdditemService,
    private render: Renderer2
  ) {}

  items1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  items2 = [1, 2, 3, 4, 5, 6];

  selectedItem = new Item();
  selectedId = 0;
  ITEMS!: Item[];
  canvas: Item[] = [];

  LIST_IDS: string[] = [];

  ngOnInit(): void {
    this.additemservice.getItems().subscribe((items) => (this.ITEMS = items));
    this.additemservice
      .getCanvas()
      .subscribe((canvas) => (this.canvas = canvas));
    for (let i = 1; i <= 12 * 12; i++) {
      this.LIST_IDS.push('' + i);
    }
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.canvas[+event.container.id].id =
        event.previousContainer.data[event.previousIndex].id;
      this.canvas[+event.container.id].orientation =
        event.previousContainer.data[event.previousIndex].orientation;
      this.canvas[+event.container.id].rotate =
        event.previousContainer.data[event.previousIndex].rotate;
      if (this.canvas[+event.container.id].id == 'wire')
        this.additemservice
          .addConnection(this.canvas[+event.container.id], event.container.id)
          .subscribe((canvas) => (this.canvas = canvas));
      else
        this.additemservice
          .addItem(this.canvas[+event.container.id], event.container.id)
          .subscribe((canvas) => (this.canvas = canvas));
    }
  }
  selectItem(event: any, id: number) {
    if (this.canvas[this.selectedId].id == '') {
      this.render.addClass(event.target, 'selected');
      this.selectedId = id;
    } else if (id == this.selectedId) {
      this.render.removeClass(event.target, 'selected');
      this.selectedId = 0;
    }
  }
  rotate() {
    this.additemservice.rotateItem(this.canvas[this.selectedId]);
  }
  start() {
    this.additemservice.addNodes();
  }
}
