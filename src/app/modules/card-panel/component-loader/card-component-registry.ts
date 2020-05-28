import { ComponentType } from './component-type';

/**
 * This interface is used to identify a card component registration.
 */
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

/**
 * This is the registration array for card components.
 * This is intended to be private since this is managed with the exportable functions.
 */
const cardComponentRegistry = new Array<CardComponentRegistration>();

/**
 *
 * @param componentType This determines where in a card a component will be displayed.
 * @param name The registration name of a component. If a name already exists an error will be thrown.
 */
export function CardComponent(componentType: ComponentType, name: string) {
  let errorMessage = '';

  if (
    cardComponentRegistry.length > 0 &&
    FindCardRegistration(componentType, name) !== null
  ) {
    errorMessage =
      'A component registration with name: ' +
      name +
      ' already exists; unable to register component.';
  }
  else if (!componentType || !name || name === '') {
    errorMessage = 'ComponentType or name was not supplied, unable to register component';
  }

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  // tslint:disable-next-line: ban-types
  return (target: Function) => {
    cardComponentRegistry.push({
      componentType,
      name,
      initializer: target,
    } as CardComponentRegistration);
  };
}

/**
 * Attempts to find a card registration by component type and/or name when supplied.
 * Returns null if nothing was found.
 * @param componentType The component type to look for.
 * @param name The component registration name to look for.
 */
export function FindCardRegistration(
  componentType?: ComponentType,
  name?: string
): CardComponentRegistration {
  if (componentType && name) {
    for (const registration of cardComponentRegistry) {
      if (
        registration.componentType === componentType &&
        registration.name === name
      ) {
        return registration;
      }
    }
  } else if (componentType) {
    for (const registration of cardComponentRegistry) {
      if (registration.componentType === componentType) {
        return registration;
      }
    }
  } else if (name) {
    for (const registration of cardComponentRegistry) {
      if (registration.name === name) {
        return registration;
      }
    }
  }

  return null;
}
