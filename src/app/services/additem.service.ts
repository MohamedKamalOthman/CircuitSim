import { Injectable } from '@angular/core';
import { ITEMS } from '../shared/items';
import { Item, Node } from '../shared/item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdditemService {
  ITEMS = ITEMS;
  canvas: Item[] = [];
  nodes = 0;
  Nodes: Node[] = [];
  constructor() {}
  getItems(): Observable<Item[]> {
    return of(this.ITEMS);
  }
  getCanvas(): Observable<Item[]> {
    for (let i = 1; i <= 12 * 12; i++) {
      this.canvas.push(new Item());
    }
    return of(this.canvas);
  }
  addItem(item: Item,id:string): Observable<Item[]> {
    let node = new Node();
    let exist = {
      up: Boolean(item.orientation[0]),
      upright: Boolean(item.orientation[1]),
      right: Boolean(item.orientation[2]),
      downright: Boolean(item.orientation[3]),
      down: Boolean(item.orientation[4]),
      downleft: Boolean(item.orientation[5]),
      left: Boolean(item.orientation[6]),
      upleft: Boolean(item.orientation[7]),
    };
    let beforevertical = (+id - 1) % 10 >= 1;
    let aftervertical = (+id + 1) % 10 <= 6;
    let beforehorizontal = +id - 10 >= 1;
    let afterhorizontal = +id + 10 <= 116;
    let upleft = beforevertical && beforehorizontal;
    let upright = beforevertical && afterhorizontal;
    let downleft = aftervertical && beforehorizontal;
    let downright = aftervertical && afterhorizontal;
    //left
    if (
      exist.left &&
      beforehorizontal &&
      this.canvas[+id - 10].id != '' &&
      this.canvas[+id - 10].orientation[2] == '1'
    ) {
      if (!this.canvas[+id - 10].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 10].connection) {
        //wire means no new node will be created
        node = this.canvas[+id - 10].startnode;
      }
      this.canvas[+id - 10].startnode = node;
      item.endnode=node;
    }
    //up
    if (
      exist.up &&
      beforevertical &&
      this.canvas[+id - 1].id != '' &&
      this.canvas[+id - 1].orientation[4] == '1'
    ) {
      if (!this.canvas[+id - 1].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 1].connection) {
        //wire means no new node will be created
        node = this.canvas[+id - 1].startnode;
      }
      this.canvas[+id - 1].startnode = node;
      item.endnode=node;
    }
    //right
    if (
      exist.right &&
      afterhorizontal &&
      this.canvas[+id + 10].id != '' &&
      this.canvas[+id + 10].orientation[6] == '1'
    ) {
      if (!this.canvas[+id + 10].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 10].connection) {
        //wire means no new node will be created
        node = this.canvas[+id + 10].endnode;
      }
      this.canvas[+id + 10].endnode = node;
      item.endnode=node;
    }
    //down
    if (
      exist.down&&
      aftervertical &&
      this.canvas[+id + 1].id != '' &&
      this.canvas[+id + 1].orientation[0] == '1'
    ) {
      if (!this.canvas[+id + 1].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 1].connection) {
        //wire means no new node will be created
        node = this.canvas[+id + 1].endnode;
      }
      this.canvas[+id + 1].endnode = node;
      item.endnode=node;
    }
    //upleft
    if (
      exist.upleft&&
      upleft &&
      this.canvas[+id - 1 - 10].id != '' &&
      this.canvas[+id - 1 - 10].orientation[3] == '1'
    ) {
      if (!this.canvas[+id - 1 - 10].connection ) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 1 - 10].connection) {
        //wire means no new node will be created
        node = this.canvas[+id - 1 - 10].startnode;
      }
      this.canvas[+id - 1 - 10].startnode = node;
      item.endnode=node;
    }
    //upright
    if (
      exist.upleft&&
      upright &&
      this.canvas[+id - 1 + 10].id != '' &&
      this.canvas[+id - 1 + 10].orientation[5] == '1'
    ) {
      if (!this.canvas[+id - 1 + 10].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 1 + 10].connection) {
        //wire means no new node will be created
        node = this.canvas[+id - 1 + 10].endnode;
      }
      this.canvas[+id - 1 + 10].endnode = node;
      item.endnode=node;
    }
    //downleft
    if (exist.downleft&&
      downleft &&
      this.canvas[+id + 1 - 10].id != '' &&
      this.canvas[+id + 1 - 10].orientation[1] == '1'
    ) {
      if (!this.canvas[+id + 1 - 10].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 1 - 10].connection) {
        //wire means no new node will be created
        node = this.canvas[+id + 1 - 10].startnode;
      }
      this.canvas[+id + 1 - 10].startnode = node;
      item.endnode=node;
    }
    //downright
    if (
      exist.downright&&
      downright &&
      this.canvas[+id + 1 + 10].id != '' &&
      this.canvas[+id + 1 + 10].orientation[7] == '1'
    ) {
      if (!this.canvas[+id + 1 + 10].connection) {
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 1 + 10].connection) {
        //wire means no new node will be created
        node = this.canvas[+id + 1 + 10].endnode;
      }
      this.canvas[+id + 1 + 10].endnode = node;
      item.endnode=node;
    }
    console.log(this.nodes);
    return of(this.canvas);
  }
  addConnection(item: Item, id: string): Observable<Item[]> {
    console.log(this.nodes);
    let exits = 0;
    let created = false;
    let node = new Node();
    let exist = {
      up: false,
      down: false,
      right: false,
      left: false,
      upright: false,
      upleft: false,
      downright: false,
      downleft: false,
    };
    let beforevertical = (+id - 1) % 10 >= 1;
    let aftervertical = (+id + 1) % 10 <= 6;
    let beforehorizontal = +id - 10 >= 1;
    let afterhorizontal = +id + 10 <= 116;
    let upleft = beforevertical && beforehorizontal;
    let upright = beforevertical && afterhorizontal;
    let downleft = aftervertical && beforehorizontal;
    let downright = aftervertical && afterhorizontal;
    //left
    if (
      beforehorizontal &&
      this.canvas[+id - 10].id != '' &&
      this.canvas[+id - 10].orientation[2] == '1'
    ) {
      exist.left = true;
      exits++;
      if (!this.canvas[+id - 10].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 10].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id - 10].startnode;
      }
      this.canvas[+id - 10].startnode = node;
    }
    //up
    if (
      beforevertical &&
      this.canvas[+id - 1].id != '' &&
      this.canvas[+id - 1].orientation[4] == '1'
    ) {
      exist.up = true;
      exits++;
      if (!this.canvas[+id - 1].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 1].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id - 1].startnode;
      }
      this.canvas[+id - 1].startnode = node;
    }
    //right
    if (
      afterhorizontal &&
      this.canvas[+id + 10].id != '' &&
      this.canvas[+id + 10].orientation[6] == '1'
    ) {
      exist.right = true;
      exits++;
      if (!this.canvas[+id + 10].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 10].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id + 10].endnode;
      }
      this.canvas[+id + 10].endnode = node;
    }
    //down
    if (
      aftervertical &&
      this.canvas[+id + 1].id != '' &&
      this.canvas[+id + 1].orientation[0] == '1'
    ) {
      exist.down = true;
      exits++;
      if (!this.canvas[+id + 1].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 1].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id + 1].endnode;
      }
      this.canvas[+id + 1].endnode = node;
    }
    //upleft
    if (
      upleft &&
      this.canvas[+id - 1 - 10].id != '' &&
      this.canvas[+id - 1 - 10].orientation[3] == '1'
    ) {
      exist.upleft = true;
      exits++;
      if (!this.canvas[+id - 1 - 10].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 1 - 10].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id - 1 - 10].startnode;
      }
      this.canvas[+id - 1 - 10].startnode = node;
    }
    //upright
    if (
      upright &&
      this.canvas[+id - 1 + 10].id != '' &&
      this.canvas[+id - 1 + 10].orientation[5] == '1'
    ) {
      exist.upright = true;
      exits++;
      if (!this.canvas[+id - 1 + 10].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id - 1 + 10].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id - 1 + 10].endnode;
      }
      this.canvas[+id - 1 + 10].endnode = node;
    }
    //downleft
    if (
      downleft &&
      this.canvas[+id + 1 - 10].id != '' &&
      this.canvas[+id + 1 - 10].orientation[1] == '1'
    ) {
      exist.downleft = true;
      exits++;
      if (!this.canvas[+id + 1 - 10].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 1 - 10].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id + 1 - 10].startnode;
      }
      this.canvas[+id + 1 - 10].startnode = node;
    }
    //downright
    if (
      downright &&
      this.canvas[+id + 1 + 10].id != '' &&
      this.canvas[+id + 1 + 10].orientation[7] == '1'
    ) {
      exist.downright = true;
      exits++;
      if (!this.canvas[+id + 1 + 10].connection && !created) {
        created = true;
        node.value = '' + this.nodes++;
      } else if (this.canvas[+id + 1 + 10].connection) {
        //wire means no new node will be created
        if (created) {
          this.nodes--;
        }
        created = true;
        node = this.canvas[+id + 1 + 10].endnode;
      }
      this.canvas[+id + 1 + 10].endnode = node;
    }
    //from up clock wise
    let orientation =
      '' +
      +exist.up +
      +exist.upright +
      +exist.right +
      +exist.downright +
      +exist.down +
      +exist.downleft +
      +exist.left +
      +exist.upleft;
    //2 outputs
    if (exits === 2) {
      if (exist.up && exist.right) {
        item.rotate = '0';
        item.id = 'wirecorner2';
      }
      if (exist.down && exist.right) {
        item.rotate = '90';
        item.id = 'wirecorner2';
      }
      if (exist.up && exist.left) {
        item.rotate = '270';
        item.id = 'wirecorner2';
      }
      if (exist.left && exist.down) {
        item.rotate = '180';
        item.id = 'wirecorner2';
      }
      if (exist.up && exist.down) {
        item.rotate = '0';
        item.id = 'wirestraight';
      }
      if (exist.upright && exist.downleft) {
        item.rotate = '45';
        item.id = 'wirestraight';
      }
      if (exist.right && exist.left) {
        item.rotate = '90';
        item.id = 'wirestraight';
      }
      if (exist.upleft && exist.downright) {
        item.rotate = '135';
        item.id = 'wirestraight';
      }
    }
    //3 outputs
    if (exits === 3) {
      if (exist.up && exist.right && exist.left) {
        item.rotate = '0';
        item.id = 'wireT';
      }
      if (exist.up && exist.right && exist.down) {
        item.rotate = '90';
        item.id = 'wireT';
      }
      if (exist.left && exist.right && exist.down) {
        item.rotate = '180';
        item.id = 'wireT';
      }
      if (exist.up && exist.left && exist.down) {
        item.rotate = '270';
        item.id = 'wireT';
      }
    }
    item.startnode = node;
    item.endnode = node;
    item.connection = true;
    console.log(this.canvas);
    return of(this.canvas);
  }
}
