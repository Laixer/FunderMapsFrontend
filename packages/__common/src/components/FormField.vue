<template>
  <div class="FormField" :class="fieldClasses">
    <label :for="id" class="FormField__Label">{{ label }}</label>

    <div class="FormField__Wrapper">
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :value="fieldValue"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        :rows="rows"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur"
      />
      <input
        v-else
        :id="id"
        :value="fieldValue"
        :type="type"
        :pattern="pattern"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur"
      />

      <SvgIcon v-if="validationIcon" :icon="validationIcon" class="FormField__Icon" />
    </div>

    <span v-if="error" class="FormField__Feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import SvgIcon from "./SvgIcon.vue";
import { defineComponent, inject, PropType, ref, computed, readonly, watch, SetupContext } from "vue";

import ConnectedField from "./ConnectedField";
import { Option } from "../types/Option";

export const withFormFieldProps = () => {
  return {
    // The type of form field
    type: {
      type: String,
      default: "text"
    },
    pattern: {
      type: String,
      default: ""
    },
    // The field id
    id: {
      type: String,
      required: true
    },
    // The input label
    label: {
      type: String,
      default: ""
    },
    // The field value
    value: {
      type: Object as PropType<string | boolean | number | Array<string>>,
      default: ""
    },
    // The placeholder value
    placeholder: {
      type: String,
      default: ""
    },

    /******************************************
     * Field validation
     *******************************************/

    // The validation state. Initialized as null
    valid: {
      type: Object as PropType<boolean | null>,
      default: null
    },
    // The error message
    error: {
      type: String,
      default: ""
    },
    // Disables the validation process
    novalidate: {
      type: Boolean,
      default: false
    },

    /******************************************
     * Type specific props
     ******************************************/

    // The input label
    rows: {
      type: Number,
      default: 3
    },
    // The options list for select, radio & checkbox lists
    options: {
      type: Object as PropType<Array<Option>>,
      default: Array<Option>()
    },
    // The select type can support one or multiple answers
    multiple: {
      type: Boolean,
      default: false
    },

    /******************************************
     * State props
     ******************************************/

    // Whether the field is disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // Disables the browser's auto complete function
    autocomplete: {
      type: Object as PropType<boolean | string>,
      default: false
    }
  };
};

export const useFormField = (
  props: {
    disabled: boolean;
    novalidate: boolean;
    valid: boolean | null;
    type: string;
    multiple: boolean;
    value: string | boolean | number | Array<string>;
  },
  { emit }: SetupContext
) => {
  const registerFormField = inject<(field: ConnectedField) => void>("registerFormField");

  //  Whether the field is disabled because it is busy
  const busy = ref<boolean>(false);

  // Provide read access to the busy property
  const isBusy = readonly(busy);

  // Indicates whether the user has interacted with this field.
  const hasBeenInteractedWith = ref<boolean>(false);

  // The bound field value
  const fieldValue = ref<string | boolean | number | Array<string | boolean | number>>("");

  // The disabled state can be set on field level as a prop, and can be determined by the busy state of the form
  const isDisabled = computed((): boolean => props.disabled || busy.value);

  // Whether the field has been validated positively
  // Returns null if validation has not been applied yet
  const isValid = computed((): boolean | null => (props.novalidate ? false : props.valid));

  // Whether the validation has been applied.
  // We cannot know for certain about this. The interaction indicator that triggers the first validation is taken as validation indicator
  const hasBeenValidated = computed((): boolean => hasBeenInteractedWith.value && !props.novalidate);

  // Returns the icon name based on validation status
  // Returns false if validation hasn't occurred yet
  const validationIcon = computed((): string | false =>
    hasBeenValidated.value ? (isValid.value ? "icon_check" : "icon_error") : false
  );

  // List of css classes
  const fieldClasses = computed(
    (): Record<string, boolean> => {
      return {
        "FormField--disabled": isDisabled.value,
        "FormField--busy": isBusy.value,
        "FormField--valid": hasBeenValidated.value ? !!isValid.value : false,
        "FormField--invalid": hasBeenValidated.value ? !isValid.value : false
      };
    }
  );

  // The checkbox type automatically supports multiple values, the select by default does not
  const supportsMultiple = computed(
    (): boolean => props.type === "checkbox" || (props.type === "select" && props.multiple)
  );

  watch(
    () => props.value,
    newValue => {
      if (!Array.isArray(newValue) && supportsMultiple) {
        fieldValue.value = newValue === "" ? [] : [newValue];
      } else {
        fieldValue.value = newValue;
      }
    }
  );

  const updateValue = (value: string | boolean | number | Array<string>): void => {
    if (!Array.isArray(value) && supportsMultiple) {
      fieldValue.value = value === "" ? [] : [value];
    } else {
      fieldValue.value = value;
    }
  };

  /******************************************
   * Methods
   */

  // The actual field validation is externalised.
  const validate = (): void => {
    if (!props.novalidate) {
      emit("validate", fieldValue.value);
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

  // Handle input changes
  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (supportsMultiple.value) {
      if (Array.isArray(fieldValue)) {
        const value = fieldValue.value as Array<string | number | boolean>;
        const index = value.indexOf(target.value);
        if (index > -1) {
          value.splice(index, 1);
        } else {
          value.push(target.value);
        }
      } else {
        fieldValue.value = [target.value];
      }
    } else {
      fieldValue.value = target.value;
    }

    if (hasBeenInteractedWith.value || props.type === "select" || props.type === "radio" || props.type === "checkbox") {
      validate();
    }
    emit("input", fieldValue);
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
  updateValue(props.value);

  // If contained within a Form component, register the form field
  if (registerFormField) {
    const field: ConnectedField = {
      enable: enable,
      disable: disable,
      validate: validate,
      isValid: !!isValid.value,
      resetValidation: resetValidation
    };
    registerFormField(field);
  }

  return {
    registerFormField,
    hasBeenInteractedWith,
    fieldValue,
    isDisabled,
    isBusy,
    isValid,
    hasBeenValidated,
    validationIcon,
    fieldClasses,
    supportsMultiple,
    handleBlur,
    handleInput
  };
};

export default defineComponent({
  name: "FormField",
  components: { SvgIcon },
  props: withFormFieldProps(),
  // TODO: Add event validation
  // See: https://v3.vuejs.org/guide/component-custom-events.html#validate-emitted-events
  emits: { input: null, validate: null },
  setup(props, context: SetupContext) {
    return {
      ...useFormField(props, context)
    };
  }
});
</script>

<style lang="scss">
$disabled: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);

.FormField {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &__Label {
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.3px;
    color: #606976;
    margin-bottom: 9px;
  }

  &__Field {
    width: 100%;
    flex: 2;
    color: #202122;
    border-radius: 4px;
    border: 2px solid #d4daf0;
    background: white;
    font-size: 16px;
    line-height: 19px;
    outline: none;
    padding: 13px 15px 14px;
    transition: border-color 0.2s ease-in-out;

    &::placeholder {
      color: #606976;
    }

    &:focus {
      border-color: $VENDOR_PRIMARY_COLOR;
    }
  }

  &__Wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    @media only screen and (min-width: $BREAKPOINT) {
      flex-direction: column;
    }
  }

  &__Icon {
    top: 35px;
    flex: 0 1 10%;
    position: absolute;
    width: 30px;
    height: 40px;
    right: 5px;
    font-size: 12px;
    opacity: 0;
    margin: 0 5px;
    transition: opacity 0.2s ease-in-out;

    svg {
      display: block;
      margin: auto;
    }
  }

  &--valid &__Field {
    border-color: #00c95d;
    padding-right: 45px;
  }
  &--invalid &__Field {
    border-color: #ff3b30;
    padding-right: 45px;
  }
  &--valid &__Icon,
  &--invalid &__Icon {
    color: #00c95d;
    opacity: 1;
  }
  &--invalid &__Icon {
    color: #ff3b30;
  }
  &--disabled &__Field {
    background: rgba(119, 128, 141, 0.2);
    cursor: not-allowed;
  }
}
</style>
