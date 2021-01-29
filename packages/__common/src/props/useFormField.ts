import { computed, inject, readonly, ref, SetupContext } from "vue";
import ConnectedField from "../components/ConnectedField";
// TODO: Move
export const useFormField = (
  props: {
    disabled: boolean;
    novalidate: boolean;
    valid: boolean | null;
    type: string;
    multiple: boolean;
    modelValue: null | string | boolean | number | Array<string | boolean | number>;
    required: boolean;
  },
  { emit }: SetupContext
) => {
  const registerFormField = inject<(field: ConnectedField) => void>("registerFormField");
  //  Whether the field is disabled because it is busy
  const busy = ref<boolean>(false);

  // Indicates whether the user has interacted with this field.
  const hasBeenInteractedWith = ref<boolean>(false);

  // The disabled state can be set on field level as a prop, and can be determined by the busy state of the form
  const disabled = computed((): boolean => props.disabled || busy.value);

  // Whether the field has been validated positively
  // Returns null if validation has not been applied yet
  const valid = computed((): boolean | null => (props.novalidate ? false : props.valid));

  // Whether the validation has been applied.
  // We cannot know for certain about this. The interaction indicator that triggers the first validation is taken as validation indicator
  const hasBeenValidated = computed((): boolean =>
    props.modelValue ? true : hasBeenInteractedWith.value && !props.novalidate && props.modelValue !== null
  );

  // Returns the icon name based on validation status
  // Returns false if validation hasn't occurred yet
  const validationIcon = computed((): string | false =>
    hasBeenValidated.value ? (valid.value ? "icon_check" : "icon_error") : false
  );

  // List of css classes
  const fieldClasses = computed(
    (): Record<string, boolean> => {
      return {
        "FormField--disabled": disabled.value,
        "FormField--busy": disabled.value,
        "FormField--valid": hasBeenValidated.value ? !!valid.value : false,
        "FormField--invalid": hasBeenValidated.value ? !valid.value : false
      };
    }
  );

  // The checkbox type automatically supports multiple values, the select by default does not
  const supportsMultiple = computed(
    (): boolean => props.type === "checkbox" || (props.type === "select" && props.multiple)
  );

  // const updateValue = (value: Ref<unknown>): void => {
  //   if (!Array.isArray(value) && supportsMultiple) {
  //     fieldValue.value = value.value === "" ? [] : [value.value];
  //   } else {
  //     fieldValue.value = value.value;
  //   }
  // };

  /******************************************
   * Methods
   */

  // The actual field validation is externalised.
  const validate = (): void => {
    if (!props.novalidate) {
      emit("validate", props.modelValue);
    }
  };

  // This resets the validation trigger mechanism.
  // Because the validation process itself is external, it does not reset state
  const resetValidation = () => {
    hasBeenInteractedWith.value = false;
  };

  // Enabe / disable the busy state
  const enable = () => {
    busy.value = false;
  };
  const disable = () => {
    busy.value = true;
  };

  // Validation starts after the initial blur (first user interaction)
  const handleBlur = () => {
    if (!hasBeenInteractedWith.value) {
      validate();
    }
    hasBeenInteractedWith.value = true;
  };

  /******************************************
   * Lifecycle Hooks
   ******************************************/
  // Because setup is run around the beforeCreate and created lifecycle hooks, you do not need to explicitly define them.
  // In other words, any code that would be written inside those hooks should be written directly in the setup function.
  // updateValue(props.value);

  // If contained within a Form component, register the form field
  if (registerFormField) {
    const field: ConnectedField = {
      enable: enable,
      disable: disable,
      validate: validate,
      isValid: !!valid.value,
      resetValidation: resetValidation
    };
    registerFormField(field);
  }

  return {
    registerFormField,
    hasBeenInteractedWith,
    isDisabled: readonly(disabled),
    isBusy: readonly(busy),
    isValid: readonly(valid),
    hasBeenValidated,
    validationIcon,
    fieldClasses,
    supportsMultiple,
    handleBlur
  };
};
