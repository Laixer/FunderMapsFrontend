<template>
  <div class="RadioImageInput" :class="fieldClasses">
    <div class="RadioImageInput__Wrapper">
      <div v-for="(option, index) in options" :key="id + ' ' + index" class="RadioImageInput__Field">
        <input
          :id="id + ' ' + index"
          :value="modelValue"
          type="radio"
          :name="id"
          :disabled="isDisabled"
          :checked="isChecked(option.value)"
          @blur="handleBlur"
          @input="$emit('update:modelValue', $event.target.value ? option.value : null)"
        />

        <label :for="id + ' ' + index" class="RadioImageInput__Label">
          <SvgIcon :icon="option.image" />
          <SvgIcon class="SvgIcon--selected" icon="icon_selected" />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div v-if="error" class="RadioImageInput__Feedback">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import FormField from "./FormField.vue";
import SvgIcon from "../SvgIcon.vue";
import { withFormFieldProps } from "../../props/FormFieldProps";
import { defineComponent } from "vue";

// TODO: Rewrite this component, don't extend formfield
export default defineComponent({
  name: "RadioImageInput",
  components: { SvgIcon },
  extends: FormField,
  props: {
    ...withFormFieldProps(),
    type: {
      type: String,
      default: "radio"
    }
  },
  emits: ["update:modelValue"],
  setup(props) {
    const isChecked = (value: string | boolean | number): boolean => {
      return props.modelValue === value.toString() || props.modelValue === value;
    };

    return {
      isChecked
    };
  }
});
</script>

<style lang="scss">
$unselected: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);
$unselectedText: adjust-color($VENDOR_PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114);
$unselectedSvg: adjust-color($VENDOR_PRIMARY_COLOR, $red: 176, $green: 131, $blue: -15);

.RadioImageInput {
  &__Wrapper {
    display: flex;
    justify-content: center;
  }
  &__Field {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__Label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 160px;
    height: 160px;

    @media only screen and (min-width: $BREAKPOINT) {
      width: 180px;
      height: 180px;
    }

    position: relative;

    display: flex;
    flex-direction: column;
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

    &:hover {
      border-color: $VENDOR_PRIMARY_COLOR;
    }

    .SvgIcon:not(.SvgIcon--selected) {
      @media only screen and (min-width: $BREAKPOINT) {
        font-size: 106px;
      }
      font-size: 86px;
      padding-top: 20px;
      padding-bottom: 13px;
      color: $unselectedSvg;
    }

    .SvgIcon.SvgIcon--selected {
      position: absolute;
      top: -2px;
      right: -2px;
      font-size: 40px;
      color: $VENDOR_PRIMARY_COLOR;
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
  }

  input {
    display: none;
  }
  input[type="radio"]:checked + &__Label {
    color: $VENDOR_PRIMARY_COLOR;
    border-color: $VENDOR_PRIMARY_COLOR;

    .SvgIcon--selected {
      opacity: 1;
    }
    .SvgIcon:not(.SvgIcon--selected) {
      color: $VENDOR_PRIMARY_COLOR;
    }
  }
}
</style>
