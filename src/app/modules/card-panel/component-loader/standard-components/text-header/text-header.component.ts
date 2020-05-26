import { Component, ChangeDetectorRef } from '@angular/core';
import { CardComponent } from '../../card-component-registry';
import { ComponentType } from '../../component-type';
import { StandardComponentTypes } from '../standard-types';
import { ComponentInput } from '../../component-input';

@Component({
  selector: 'app-text-header',
  templateUrl: './text-header.component.html',
})
@CardComponent(ComponentType.Header, StandardComponentTypes.TextHeader)
export class TextHeaderComponent {
  textToShow: string;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.textToShow = '';
  }

  setInputs(inputs: Array<ComponentInput>) {
    for (const input of inputs) {
      if (input.name === 'textToShow') {
        this.textToShow = input.value;
      }
    }

    this.changeDetector.detectChanges();
  }
}
