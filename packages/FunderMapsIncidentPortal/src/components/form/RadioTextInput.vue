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
import { Component } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'
import FormField from '@/components/common/FormField.vue'

@Component({
  components: {
    SvgIcon
  }
})
export default class RadioTextInput extends FormField {
  
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

// TODO: Fix sizing
// TODO: Add checkbox svg 

$unselected: adjust-color($PRIMARY_COLOR, $red: 81, $green: 41, $blue: -114, $alpha: -0.7);

.RadioTextInput {  

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
    // TODO: fix sizing
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