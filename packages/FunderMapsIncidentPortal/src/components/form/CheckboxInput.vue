<template>
  <div class="CheckboxInput" :class="fieldClasses">
    <div class="CheckboxInput__Wrapper">
      <div 
        v-for="(option, index) in options"
        class="CheckboxInput__Field" 
        :key="id + ' ' + index">

        <input 
          :id="id + ' ' + index" 
          type="radio"
          :name="id"
          :value="option.value" 
          :disabled="isDisabled"

          @input="handleInput"
          @blur="handleBlur" />

        <label 
          :for="id + ' ' + index"
          class="CheckboxInput__Label">
          <SvgIcon icon="options/type_hout" />
          <SvgIcon class="SvgIcon--selected" icon="icon_selected" />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div v-if="error" class="CheckboxInput__Feedback">
      {{ error }}
    </div>
  </div>
</template>


<script lang="ts">

// TODO: Modify radio into checkbox

import { Prop, Component } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'
import FormField from '@/components/common/FormField.vue'

@Component({
  components: {
    SvgIcon
  }
})
export default class CheckboxInput extends FormField {

  /**
   * The type of form field
   */
  @Prop({ default: 'checkbox' }) readonly type!: string;

  /**
   * List of css classes
   */
  get fieldClasses(): Record<string, boolean> {
    return {
      'CheckboxInput--disabled': this.isDisabled,
      'CheckboxInput--busy': this.isBusy, 
      'CheckboxInput--valid': this.hasBeenValidated ? this.isValid : false,
      'CheckboxInput--invalid': this.hasBeenValidated ? !this.isValid : false,
    }
  }
}
</script>

<style lang="scss">

$unselected: adjust-color($PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);

.CheckboxInput {  

  &__Wrapper {
    display: flex;
  }
  &__Field {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }

  &__Label {
    width: 180px;
    height: 180px;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 18px;
    line-height: 19px;
    letter-spacing: -0.3px;

    color: $unselected;
    border: 2px solid $unselected;
    border-radius: 4px;

    transition: all .3s ease-in-out;

    &:hover {
      border-color: $PRIMARY_COLOR;
    }

    .SvgIcon:not(.SvgIcon--selected) {
      font-size: 106px;
      padding-top: 20px;
      padding-bottom: 13px;
    }

    .SvgIcon.SvgIcon--selected {
      position: absolute;
      top: -2px;
      right: -2px;
      font-size: 40px;
      color: $PRIMARY_COLOR;
      opacity: 0;
      transition: all .3s ease-in-out;
    }
  }

  input {
    display: none;
  }
  input[type="radio"]:checked + &__Label {
    color: $PRIMARY_COLOR;
    border-color: $PRIMARY_COLOR;

    .SvgIcon--selected {
      opacity: 1;
    }
  }
}
</style>