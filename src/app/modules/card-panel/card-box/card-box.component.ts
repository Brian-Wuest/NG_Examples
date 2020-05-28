import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DraggableNode } from '../node-info/draggable-node';
import { SharedDraggableContext } from '../node-info/shared-draggable-context';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardBoxComponent implements OnInit {
  // A map of all draggable nodes shared between droppables
  @Input() sharedContext: SharedDraggableContext;

  acceptsMovingNode = false;

  get nodes() {
    return this.sharedContext ? this.sharedContext.monitoredNodes : null;
  }

  constructor() {}

  ngOnInit() {
    if (this.sharedContext) {
      this.sharedContext.monitor((n) => this.setDragCues(n));
    }
  }

  setDragCues(movingNode: DraggableNode) {
    this.acceptsMovingNode = movingNode !== null;
  }

  enteredContainer($event) {
    const movingNode = this.sharedContext.getMovingNode();
    if (movingNode) {
      // If a node is dragged directly onto the droppable region but not over a child node,
      // then we append it to the end of the list. This catches the case where it is dragged
      // into the open space at the end of the list, which intuitively should drop it there.
      if (
        $event.target === $event.currentTarget ||
        !this.isMyNode(movingNode)
      ) {
        movingNode.attach();
      }
    }
  }

  leftContainer(event: Event) {}

  dropped(event: Event) {
    // We already update sharedContext state from the node's dragEnd() event, but
    // occasionally dragEnd isn't called, depending on the exact timing of the drop event
    // and where it gets dropped in the list. So we go ahead and safeguard against bad
    // state by updating the sharedContext from here.
    this.sharedContext.clearMovingNode();
  }

  trackByFn(n) {
    return n.id;
  }

  isMyNode(node: DraggableNode) {
    return this.sharedContext.monitoredNodes.includes(node);
  }
}
