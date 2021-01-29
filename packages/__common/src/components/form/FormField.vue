<template>
  <div class="FormField" :class="fieldClasses">
    <label :for="id" class="FormField__Label">{{ label }}</label>

    <div class="FormField__Wrapper">
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        :rows="rows"
        class="FormField__Field"
        @blur="handleBlur"
        @input="$emit('update:modelValue', $event.target.value ? $event.target.value : null)"
      />
      <input
        v-else
        :id="id"
        :value="modelValue"
        :type="type"
        :pattern="pattern"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        class="FormField__Field"
        @blur="handleBlur"
        @input="$emit('update:modelValue', $event.target.value ? $event.target.value : null)"
      />

      <SvgIcon v-if="validationIcon" :icon="validationIcon" class="FormField__Icon" />
    </div>

    <span v-if="error" class="FormField__Feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import SvgIcon from "../SvgIcon.vue";
import { defineComponent, SetupContext } from "vue";
import { useFormField } from "../../props/useFormField";
import { withFormFieldProps } from "../../props/FormFieldProps";

export default defineComponent({
  name: "FormField",
  components: { SvgIcon },
  props: withFormFieldProps(),
  // TODO: Add event validation
  // See: https://v3.vuejs.org/guide/component-custom-events.html#validate-emitted-events
  emits: { "update:modelValue": null, validate: null },
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
