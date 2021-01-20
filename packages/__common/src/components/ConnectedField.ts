/**
 * These are the methods communicated from the FormField to the Form component,
 *  allowing the Form to interact with the FormFields.
 */
export interface ConnectedField {
  isValid: boolean;
  validate(): void;
  resetValidation(): void;
  disable(): void;
  enable(): void;
}
