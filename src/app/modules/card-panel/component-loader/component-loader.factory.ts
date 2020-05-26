import {
  ViewRef,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { ComponentInput } from './component-input';

export class ComponentLoaderFactory {
  rootViewContainer: ViewContainerRef;
  currentComponent: {
    hostView: ViewRef;
    destroy: () => void;
    instance: {
      setInputs?: (inputs: Array<ComponentInput>) => void;
    };
  };

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  /**
   * Adds a component to the current view and sets the current component property.
   * If there is already a current component it is destroyed.
   * @param componentType The component to set.
   */
  addComponent(componentType: any): void {
    this.removeCurrentComponent();

    const factory = this.factoryResolver.resolveComponentFactory(componentType);
    this.currentComponent = this.rootViewContainer.createComponent(factory);
  }

  removeCurrentComponent(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
  }
}
