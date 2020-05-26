import { Component } from '@angular/core';
import { CardComponent } from '../../card-component-registry';
import { ComponentType } from '../../component-type';
import { StandardComponentTypes } from '../standard-types';
import { ComponentInput } from '../../component-input';

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
})
@CardComponent(ComponentType.Body, StandardComponentTypes.TextBody)
export class TextBodyComponent {
  textToShow: string;

  setInputs(inputs: Array<ComponentInput>) {
    for (const input of inputs) {
      if (input.name === 'textToShow') {
        this.textToShow = input.value;
      }
    }
  }
}
