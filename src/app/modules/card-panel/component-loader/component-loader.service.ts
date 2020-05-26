import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewRef,
} from '@angular/core';
import { ComponentInput } from './component-input';
import { ComponentLoaderFactory } from './component-loader.factory';

@Injectable()
export class ComponentLoaderService {
  constructor(public factoryResolver: ComponentFactoryResolver) {}

  createComponentLoader(): ComponentLoaderFactory {
    return new ComponentLoaderFactory(this.factoryResolver);
  }
}
