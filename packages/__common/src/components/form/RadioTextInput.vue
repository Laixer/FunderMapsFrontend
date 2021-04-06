<template>
  <div class="RadioTextInput" :class="fieldClasses">
    <div class="RadioTextInput__Wrapper">
      <div v-for="(option, index) in options" :key="id + ' ' + index" class="RadioTextInput__Field">
        <input
          :id="id + ' ' + index"
          type="radio"
          :name="id"
          :value="option.value"
          :disabled="isDisabled"
          :checked="isChecked(option.value)"
          @input="$emit('update:modelValue', $event.target.value ? option.value : null)"
          @blur="handleBlur"
        />

        <label :for="id + ' ' + index" class="RadioTextInput__Label">
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div v-if="error" class="RadioTextInput__Feedback">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { withFormFieldProps } from "../../props/FormFieldProps";
import { useFormField } from "../../props/useFormField";
import { defineComponent, SetupContext, computed, ComputedRef } from "vue";

export default defineComponent({
  name: "RadioTextInput",
  props: {
    ...withFormFieldProps()
  },
  emits: ["update:modelValue"],
  setup(props, context: SetupContext) {
    const { isDisabled, isBusy, hasBeenValidated, isValid } = useFormField(props, context);

    const isChecked = (value: string | boolean | number): boolean => {
      return (value !== null && props.modelValue === value.toString()) || props.modelValue === value;
    };

    // List of css classes
    const fieldClasses: ComputedRef<Record<string, boolean>> = computed(() => {
      return {
        "RadioTextInput--disabled": isDisabled.value,
        "RadioTextInput--busy": isBusy.value,
        "RadioTextInput--valid": hasBeenValidated.value ? !!isValid.value : false,
        "RadioTextInput--invalid": hasBeenValidated.value ? !!isValid.value : false
      };
    });

    return {
      isChecked,
      fieldClasses
    };
  }
});
</script>

<style lang="scss">
$unselected: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);
$unselectedText: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114);
.RadioTextInput {
  &__Wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 1120px;
    margin: 0 auto;

    // 2x label width + 20px margin + 3x 80 + a bit
    @media only screen and (max-width: 1379px) {
      justify-content: center;
      max-width: 550px;
      width: 100%;
    }
  }
  &__Field {
    margin-bottom: 15px;
    width: 100%;

    // 2x label width + 20px margin + 3x 80 + a bit
    @media only screen and (min-width: 1380px) {
      width: 550px;
      margin-right: 20px;

      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }

  &__Label {
    max-width: 550px;
    width: 100%;
    min-height: 55px;
    position: relative;

    display: inline-block;
    align-items: center;

    font-size: 18px;
    line-height: 19px;
    letter-spacing: -0.3px;

    color: $unselectedText;
    border: 2px solid $unselected;
    border-radius: 4px;
    background: white;

    cursor: pointer;
    user-select: none;

    transition: all 0.3s ease-in-out;

    padding: 15px;
    padding-left: 55px; // space for the marker

    span {
      margin-top: 2px;
      display: inline-block;
    }

    &:before {
      content: "";
      position: absolute;
      left: 15px;
      width: 24px;
      height: 24px;
      border: 2px solid #d4daf0;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
    }
    &:after {
      content: "";
      position: absolute;
      top: 21px;
      left: 21px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
      background-color: transparent;
    }

    &:hover {
      border-color: $VENDOR_PRIMARY_COLOR;
    }
  }

  input {
    display: none;
  }
  input:checked + &__Label {
    background-color: rgba(156, 178, 255, 0.1); // TODO: Use color adjust
    border-color: $VENDOR_PRIMARY_COLOR;
    color: #202122;

    &:before {
      border-color: $VENDOR_PRIMARY_COLOR;
    }
    &:after {
      background-color: $VENDOR_PRIMARY_COLOR;
    }
  }
}
</style>
