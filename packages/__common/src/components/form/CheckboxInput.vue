<template>
  <div class="CheckboxInput" :class="fieldClasses">
    <div class="CheckboxInput__Wrapper">
      <div v-for="(option, index) in options" :key="id + ' ' + index" class="CheckboxInput__Field">
        <input
          :id="id + ' ' + index"
          type="checkbox"
          :name="id"
          :value="option.value"
          :disabled="isDisabled"
          :checked="isChecked(option.value)"
          @input="
            $emit(
              'update:modelValue',
              modelValue.includes(option.value)
                ? modelValue.filter(value => value !== option.value)
                : [...modelValue, option.value]
            )
          "
          @blur="handleBlur"
        />

        <label :for="id + ' ' + index" class="CheckboxInput__Label">
          <span class="CheckboxInput__Checkbox">
            <SvgIcon icon="icon_check" />
          </span>
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div v-if="error" class="CheckboxInput__Feedback">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import SvgIcon from "../SvgIcon.vue";
import { withFormFieldProps } from "../../props/FormFieldProps";
import { useFormField } from "../../props/useFormField";

import { defineComponent, SetupContext, computed, ComputedRef } from "vue";

export default defineComponent({
  name: "CheckboxInput",
  components: { SvgIcon },
  props: {
    ...withFormFieldProps()
  },
  emits: ["update:modelValue"],
  setup(props, context: SetupContext) {
    const { isDisabled, isBusy, hasBeenValidated, isValid } = useFormField(props, context);

    // Whether the value is checked
    const isChecked = (value: string | boolean | number): boolean => {
      return (props.modelValue as Array<string | boolean | number>).includes(value);
    };

    const fieldClasses: ComputedRef<Record<string, boolean>> = computed(() => {
      return {
        "CheckboxInput--disabled": isDisabled.value,
        "CheckboxInput--busy": isBusy.value,
        "CheckboxInput--valid": hasBeenValidated.value ? !!isValid.value : false,
        "CheckboxInput--invalid": hasBeenValidated.value ? !!isValid.value : false
      };
    });

    return { isChecked, fieldClasses };
  }
});
</script>

<style lang="scss">
$unselected: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);
$unselectedText: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114);

.CheckboxInput {
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
    padding-left: 45px; // space for the marker

    span + span {
      margin-top: 2px;
      display: inline-block;
    }

    &:hover {
      border-color: $VENDOR_PRIMARY_COLOR;
    }
  }

  &__Checkbox {
    content: "";
    position: absolute;
    left: 15px;
    width: 24px;
    height: 24px;
    border: 2px solid #d4daf0;
    transition: all 0.3s ease-in-out;

    display: flex;
    justify-content: center;
    align-items: center;

    .SvgIcon {
      font-size: 12px;
      color: white;
    }
  }

  input {
    display: none;
  }
  input:checked + &__Label {
    background-color: rgba(156, 178, 255, 0.1); // TODO: Use color adjust
    border-color: $VENDOR_PRIMARY_COLOR;
    color: #202122;
  }
  input:checked + &__Label &__Checkbox {
    border-color: $VENDOR_PRIMARY_COLOR;
    background: $VENDOR_PRIMARY_COLOR;
  }
}
</style>
