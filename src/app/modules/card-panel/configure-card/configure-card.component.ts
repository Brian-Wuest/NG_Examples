import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FindCardRegistration } from '../component-loader/card-component-registry';
import { ComponentInput } from '../component-loader/component-input';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ComponentLoaderService } from '../component-loader/component-loader.service';
import { ComponentType } from '../component-loader/component-type';
import { DraggableNode } from '../node-info/draggable-node';

@Component({
  selector: 'app-configure-card',
  templateUrl: './configure-card.component.html',
  styleUrls: ['./configure-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigureCardComponent implements OnInit, AfterViewInit {
  @ViewChild('headerComponent', {
    read: ViewContainerRef,
    static: true,
  })
  headerComponent: ViewContainerRef;
  @ViewChild('bodyComponent', {
    read: ViewContainerRef,
    static: true,
  })
  bodyComponent: ViewContainerRef;
  @ViewChild('footerComponent', {
    read: ViewContainerRef,
    static: true,
  })
  footerComponent: ViewContainerRef;

  @Input() node: DraggableNode;

  hasHeader: boolean = null;
  hasFooter: boolean = null;

  headerFactory: ComponentLoaderFactory;
  bodyFactory: ComponentLoaderFactory;
  footerFactory: ComponentLoaderFactory;
  clonedElement: HTMLElement;

  constructor(
    public headerLoader: ComponentLoaderService,
    public bodyLoader: ComponentLoaderService,
    public footerLoader: ComponentLoaderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.headerFactory = this.headerLoader.createComponentLoader();
    this.bodyFactory = this.bodyLoader.createComponentLoader();
    this.footerFactory = this.footerLoader.createComponentLoader();

    this.headerFactory.setRootViewContainerRef(this.headerComponent);
    this.bodyFactory.setRootViewContainerRef(this.bodyComponent);
    this.footerFactory.setRootViewContainerRef(this.footerComponent);

    if (this.node) {
      // If there is a header defined, load it into the view.
      if (this.node.headerComponentName) {
        this.hasHeader = this.loadComponentIntoLoader(ComponentType.Header, this.node.headerComponentName, this.headerFactory, this.node.headerComponentInputs);
      }

      // If there is a body component defined, load it into the view.
      if (this.node.bodyComponentName) {
        this.loadComponentIntoLoader(ComponentType.Body, this.node.bodyComponentName, this.bodyFactory, this.node.bodyComponentInputs);
      }

      // If there is a footer component defined, load it into the view.
      if (this.node.footerComponentName) {
        this.hasFooter = this.loadComponentIntoLoader(ComponentType.Footer, this.node.footerComponentName, this.footerFactory, this.node.footerComponentInputs);
      }
    }

    this.changeDetector.detectChanges();
  }

  ngAfterViewInit(): void {}

  dragStart(event: DragEvent) {
    if (event.dataTransfer.setDragImage) {
      const sourceElement = event.target as HTMLElement;

      if (sourceElement) {
        this.clonedElement = sourceElement.cloneNode(true) as HTMLElement;
        this.clonedElement.style.zIndex = '-1';
        this.clonedElement.style.position = 'absolute';
        this.clonedElement.style.left = '-1000px';
        this.clonedElement.style.top = '-1000px';
        sourceElement.appendChild(this.clonedElement);
        event.dataTransfer.setDragImage(this.clonedElement, 0, 0);
      }
    }

    this.node.parentContext.setMovingNode(this.node);
  }

  dragEnd() {
    if (this.clonedElement) {
      this.clonedElement.parentNode.removeChild(this.clonedElement);
    }

    this.node.parentContext.clearMovingNode();
    this.node.moveEnd();
  }

  siblingEntered() {
    const movingNode = this.node.parentContext.getMovingNode();
    if (movingNode && movingNode !== this.node) {
      movingNode.insertBefore(this.node);
    }
  }

  siblingLeft() {}

  /**
   * Loads a registered component into a component loader.
   * @param componentType The component type to look for.
   * @param name The name of the component to find.
   * @param componentLoaderFactory The loader factory hosting the component.
   * @param inputs Any inputs for the component.
   */
  loadComponentIntoLoader(componentType: ComponentType, name: string, componentLoaderFactory: ComponentLoaderFactory, inputs: Array<ComponentInput>): boolean {
    const cardRegistration = FindCardRegistration(componentType, name);

    let foundRegistration = false;

    if (cardRegistration) {
      foundRegistration = true;
      componentLoaderFactory.addComponent(cardRegistration.initializer);

      if (inputs && componentLoaderFactory.currentComponent.instance.setInputs) {
        componentLoaderFactory.currentComponent.instance.setInputs(inputs);
      }
    }

    return foundRegistration;
  }

  showFooter() {
    return this.hasFooter === null || this.hasFooter === undefined ? true : !this.hasFooter;
  }

  showHeader() {
    return this.hasHeader === null || this.hasHeader === undefined ? true : !this.hasHeader;
  }

  dragDropAllowed() {
    return this.node.parentContext.allowDragDrop;
  }

  getToggleable() {
    return this.node.allowCollapse;
  }
}
