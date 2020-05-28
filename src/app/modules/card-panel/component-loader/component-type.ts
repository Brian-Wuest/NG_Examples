/**
 * This enum identifies a location on a card where a component will affect.
 * A single component can only be in a single location on a card.
 */
export enum ComponentType {
  /**
   * Indicates that the component will be displayed in the header of a card.
   */
  Header = 'Header',

  /**
   * Indicates that the component will be displayed in the body of a card.
   */
  Body = 'Body',

  /**
   * Indicates that the component will be in the footer of a card.
   */
  Footer = 'Footer'
}
