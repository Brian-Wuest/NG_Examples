import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  DraggableNode,
} from './node-info/draggable-node';
import { StandardComponentTypes } from './component-loader/standard-components/standard-types';
import { SharedDraggableContext } from './node-info/shared-draggable-context';
import { NodeWidth } from './node-info/node-width';

@Component({
  templateUrl: './card-panel-example.component.html',
})
export class CardPanelExampleComponent {
  sharedContext: SharedDraggableContext = new SharedDraggableContext();

  constructor(private titleService: Title) {
    this.titleService.setTitle('Card Panel Example');

    this.createSeedData();
  }

  createSeedData(): Array<DraggableNode> {
    const seedData = new Array<DraggableNode>();

    let seed = new DraggableNode(this.sharedContext);

    seed.headerComponentName = StandardComponentTypes.TextHeader;
    seed.headerComponentInputs = [
      { name: 'textToShow', value: 'This is the first node.' },
    ];
    seed.bodyComponentName = StandardComponentTypes.TextBody;
    seed.bodyComponentInputs = [
      {
        name: 'textToShow',
        value: 'This is the body text of the first node',
      },
    ];

    seed.allowCollapse = false;
    seed.nodeColumnWidth = NodeWidth.Eight;

    seedData.push(seed);

    seed = new DraggableNode(this.sharedContext);

    seed.headerComponentName = StandardComponentTypes.TextHeader;
    seed.headerComponentInputs = [
      { name: 'textToShow', value: 'This is the second node.' },
    ];
    seed.bodyComponentName = StandardComponentTypes.TextBody;
    seed.bodyComponentInputs = [
      {
        name: 'textToShow',
        value: 'This is the body text of the second node',
      },
    ];

    seedData.push(seed);

    seed = new DraggableNode(this.sharedContext);

    seed.headerComponentName = StandardComponentTypes.TextHeader;
    seed.headerComponentInputs = [
      { name: 'textToShow', value: 'This is the third node.' },
    ];
    seed.bodyComponentName = StandardComponentTypes.TextBody;
    seed.bodyComponentInputs = [
      {
        name: 'textToShow',
        value: 'This is the body text of the third node',
      },
    ];

    seedData.push(seed);

    seed = new DraggableNode(this.sharedContext);

    seed.headerComponentName = StandardComponentTypes.TextHeader;
    seed.headerComponentInputs = [
      { name: 'textToShow', value: 'This is the fourth node.' },
    ];
    seed.bodyComponentName = StandardComponentTypes.TextBody;
    seed.bodyComponentInputs = [
      {
        name: 'textToShow',
        value: 'This is the body text of the fourth node',
      },
    ];

    seedData.push(seed);

    return seedData;
  }
}
