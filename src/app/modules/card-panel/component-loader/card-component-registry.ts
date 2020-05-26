import { ComponentType } from './component-type';

export interface CardComponentRegistration {
  /**
   * The component type for this registration.
   */
  componentType: ComponentType;

  /**
   * The name of the component.
   */
  name: string;

  /**
   * The initializer used to create the component in a component factory.
   */
  // tslint:disable-next-line: ban-types
  initializer: Function;
}

export let CardComponentRegistry = new Array<CardComponentRegistration>();

export function CardComponent(componentType: ComponentType, name: string) {
  // tslint:disable-next-line: ban-types
  return (target: Function) => {
    CardComponentRegistry.push({
      componentType,
      name,
      initializer: target,
    } as CardComponentRegistration);
  };
}

export function FindCardRegistration(
  componentType: ComponentType,
  name: string
): CardComponentRegistration {
  if (componentType && name) {
    for (const registration of CardComponentRegistry) {
      if (
        registration.componentType === componentType &&
        registration.name === name
      ) {
        return registration;
      }
    }
  } else if (componentType) {
    for (const registration of CardComponentRegistry) {
      if (registration.componentType === componentType) {
        return registration;
      }
    }
  } else if (name) {
    for (const registration of CardComponentRegistry) {
      if (registration.name === name) {
        return registration;
      }
    }
  }

  return null;
}
