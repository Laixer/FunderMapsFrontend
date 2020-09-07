<template>
  <div class="RadioTextInput" :class="fieldClasses">
    <div class="RadioTextInput__Wrapper">
      <div 
        v-for="(option, index) in options"
        class="RadioTextInput__Field" 
        :key="id + ' ' + index">

        <input 
          :id="id + ' ' + index" 
          type="radio"
          :name="id"
          :value="option.value" 
          :disabled="isDisabled"
          :checked="option.value === value"
          @input="handleInput"
          @blur="handleBlur" />

        <label 
          :for="id + ' ' + index"
          class="RadioTextInput__Label">
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>
    <div v-if="error" class="RadioTextInput__Feedback">
      {{ error }}
    </div>
  </div>
</template>


<script lang="ts">
import { Prop, Component } from 'vue-property-decorator';
import FormField from '@/components/common/FormField.vue'

@Component
export default class RadioTextInput extends FormField {
  
  /**
   * The type of form field
   */
  @Prop({ default: 'radio' }) readonly type!: string;

  /**
   * List of css classes
   */
  get fieldClasses(): Record<string, boolean> {
    return {
      'RadioTextInput--disabled': this.isDisabled,
      'RadioTextInput--busy': this.isBusy, 
      'RadioTextInput--valid': this.hasBeenValidated ? this.isValid : false,
      'RadioTextInput--invalid': this.hasBeenValidated ? !this.isValid : false,
    }
  }
}
</script>

<style lang="scss">

$unselected: adjust-color($PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);
$unselectedText: adjust-color($PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114);

.RadioTextInput {  

  &__Wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  &__Field {
    margin-right: 20px;
    margin-bottom: 15px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }

  &__Label {
    width: 550px;
    height: 55px;
    position: relative;

    display: flex;
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

    transition: all .3s ease-in-out;

    padding-left: 45px; // space for the marker

    &:before {
      content: '';
      position: absolute;
      left: 15px;
      width: 24px;
      height: 24px;
      border: 2px solid #D4DAF0;
      border-radius: 50%;
      transition: all .3s ease-in-out;
    }
    &:after {
      content: '';
      position: absolute;
      left: 21px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transition: all .3s ease-in-out;
      background-color: transparent;
    }

    &:hover {
      border-color: $PRIMARY_COLOR;
    }
  }

  input {
    display: none;
  }
  input:checked + &__Label {
    background-color: rgba(156, 178, 255, 0.1); // TODO: Use color adjust
    border-color: $PRIMARY_COLOR;
    color: #202122;

    &:before {
      border-color: $PRIMARY_COLOR;
    }
    &:after {
      background-color: $PRIMARY_COLOR;
    }
  }
}
</style>