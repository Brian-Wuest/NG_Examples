import { DraggableNode } from './draggable-node';

export class SharedDraggableContext {
  monitoredNodes: Array<DraggableNode>;
  movingNode: DraggableNode;
  private dragDropAllowed = true;

  /**
   * Gets a value indicating whether drag and drop is allowed for the attached card-box.
   */
  get allowDragDrop(): boolean {
    return this.dragDropAllowed;
  }

  /**
   * Sets a value indicating whether drag and drop is allowed for the attached card-box.
   */
  set allowDragDrop(value: boolean) {
    if (value === null || value === undefined) {
      value = false;
    }

    this.dragDropAllowed = value;
  }

  // tslint:disable-next-line: ban-types
  listeners: Function[] = [];

  constructor() {
    this.movingNode = null;
    this.monitoredNodes = new Array<DraggableNode>();
  }

  setMovingNode(node: DraggableNode) {
    this.movingNode = node;
    this.movingNode.moveStart();
    this.listeners.forEach((fn) => fn(node));
  }

  clearMovingNode() {
    if (this.movingNode) {
      this.movingNode.moveEnd();
    }

    this.movingNode = null;
    this.listeners.forEach((fn) => fn(null));
  }

  getMovingNode() {
    return this.movingNode;
  }

  // tslint:disable-next-line: ban-types
  monitor(callbackFn: Function) {
    this.listeners.push(callbackFn);
    return () => {
      this.listeners = this.listeners.filter((f) => f === callbackFn);
    };
  }
}
