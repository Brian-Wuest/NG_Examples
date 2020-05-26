import { DraggableNode } from './draggable-node';
import { SharedDraggableContext } from './shared-draggable-context';

export interface NodeChange {
  event: string;
  node: DraggableNode;
  context: SharedDraggableContext;
}
