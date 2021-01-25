<template>
  <form class="Form" :autocomplete="autocomplete ? 'on' : 'off'" novalidate @submit.prevent="handleSubmit">
    <slot />

    <!-- Required to allow the form to be submitted programmatically -->
    <button ref="btn" style="display: none" type="submit" />
  </form>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch, nextTick } from "vue";
import { ConnectedField } from "./ConnectedField";

export const Form = defineComponent({
  name: "Form",
  props: {
    // Whether the form is busy - meaning the fields are disabled
    busy: {
      type: Boolean,
      default: false
    },
    // Disables the browser's auto complete function
    autocomplete: {
      type: Boolean,
      default: false
    }
  },
  emits: ["submit", "error"],
  setup(props, { emit }) {
    const btn = ref<HTMLButtonElement | null>(null);

    // The list of registered (connected) form fields. Fields contained withing the form are automatically connected
    const fields = ref<Array<ConnectedField>>([]);

    /**
     * Provide a method for child form fields to connect themselves to this form component
     * All fields contained in this form should register themselves in order
     * to be processed by the mechanism provided by this component.
     *
     * Note: every field should have a `validate`, `isValid`, `disable`, `enable` & `resetValidation` method.
     */
    const registerFormField = provide(
      "registerFormField",
      ({ validate, isValid, resetValidation, disable, enable }: ConnectedField) => {
        fields.value.push({ validate, isValid, resetValidation, disable, enable });
      }
    );

    watch(
      () => props.busy,
      busy => {
        fields.value.forEach(field => {
          busy ? field.disable() : field.enable();
        });
      }
    );

    // Run the validation on every registered field
    const validate = (): void => {
      fields.value.forEach(field => {
        field.validate();
      });
    };

    // Are all registered fields valid
    const isValid = (): boolean => {
      return fields.value.every(field => {
        return field.isValid;
      });
    };

    // Reset the validation mechanism
    const resetValidation = (): void => {
      fields.value.forEach(field => {
        field.resetValidation();
      });
    };

    // Allow the form to be submitted programmatically
    const submit = (): void => {
      // Note:
      //  Why not ref the form itself and use submit() on the form DOM element?
      //  Because then the submit event handler bound by vue is not triggered...
      btn.value?.click();
    };

    // Capture the submit event, handle validation, and then either pass on
    // the event on success, or trigger an error event instead.
    const handleSubmit = (e: Event): void => {
      if (props.busy) {
        return;
      }

      validate();

      nextTick(() => {
        if (isValid()) {
          emit("submit", e);
        } else {
          emit("error", e);
        }
      });
    };

    return {
      btn,
      registerFormField,
      validate,
      isValid,
      resetValidation,
      submit,
      handleSubmit
    };
  }
});
</script>
