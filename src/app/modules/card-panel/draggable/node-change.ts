import { DraggableNode } from './DraggableNode';
import { SharedDraggableContext } from './shared-draggable-context';

export interface NodeChange {
  event: string;
  node: DraggableNode;
  context: SharedDraggableContext;
}
