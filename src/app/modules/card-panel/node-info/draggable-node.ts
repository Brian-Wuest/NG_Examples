import { ComponentInput } from '../component-loader/component-input';
import { SharedDraggableContext } from './shared-draggable-context';
import { NodeWidth } from './node-width';

export class DraggableNode {
  inMotion = false;
  tempNewPos = -1;
  startPos = -1;
  headerComponentName: string;
  headerComponentInputs: Array<ComponentInput>;
  bodyComponentName: string;
  bodyComponentInputs: Array<ComponentInput>;
  footerComponentName: string;
  footerComponentInputs: Array<ComponentInput>;
  private nodeWidth: NodeWidth = NodeWidth.Four;

  get nodeColumnWidth(): NodeWidth {
    return !this.nodeWidth ? NodeWidth.Four : this.nodeWidth;
  }

  set nodeColumnWidth(width: NodeWidth) {
    if (width) {
      this.nodeWidth = width;
    }
  }

  constructor(public parentContext: SharedDraggableContext) {
    parentContext.monitoredNodes.push(this);
  }

  attach(position: number = -1) {
    if (!this.isSamePosition(this.parentContext.monitoredNodes, position)) {
      this.detach();

      if (position === -1) {
        this.parentContext.monitoredNodes.push(this);
      } else {
        this.parentContext.monitoredNodes.splice(position, 0, this);
      }
    }
  }

  detach() {
    if (this.parentContext.monitoredNodes) {
      const currentPosition = this.parentContext.monitoredNodes.indexOf(this);

      if (currentPosition > -1) {
        this.parentContext.monitoredNodes.splice(currentPosition, 1);
      }
    }
  }

  moveStart() {
    this.inMotion = true;
    this.startPos = this.parentContext.monitoredNodes
      ? this.parentContext.monitoredNodes.indexOf(this)
      : -1;
  }

  moveEnd() {
    this.inMotion = false;
  }

  insertBefore(node: DraggableNode) {
    this.tempNewPos = node.getListPosition();
    this.attach(this.tempNewPos);
  }

  getListPosition() {
    return this.parentContext.monitoredNodes.indexOf(this);
  }

  isSamePosition(newList: DraggableNode[], newPosition: number) {
    return this.getListPosition() === this.adjustForListEnd(newPosition);
  }

  adjustForListEnd(pos: number) {
    return pos === 1 ? this.parentContext.monitoredNodes.length - 1 : pos;
  }
}
