<template>
  <div class="FormField" :class="fieldClasses">
    <label 
      :for="id"
      class="FormField__Label">
      {{ label }}
    </label>

    <input 
      :id="id"
      :value="fieldValue" 
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
      class="FormField__Field"
      @input="handleInput"
      @blur="handleBlur" />

    <span v-if="error" class="FormField__Feedback">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Inject, Watch, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'

import { IConnectedField } from './IConnectedField'
import { IOption } from './IOption'

@Component({
  components: {
    SvgIcon
  }
})
export default class FormField extends Vue {

  @Inject() registerFormField!: Function;

  /**
   * The type of form field
   */
  @Prop({ default: 'text' }) readonly type!: string;

  /**
   * The field id
   */
  @Prop({ default: '', required: true }) readonly id!: string;

  /**
   * The input label
   */
  @Prop({ default: '' }) readonly label!: string;

  /**
   * The field value
   */
  @Prop({ default: '' }) readonly value!: string|boolean|number|Array<string>;

  /**
   * The placeholder value
   */
  @Prop({ default: '' }) readonly placeholder!: string;


  /******************************************
   * Field validation
   */

  /**
   * The validation state. Starts out as null
   */
  @Prop({ default: null }) readonly valid!: boolean|null;

  /**
   * The error message
   */
  @Prop({ default: '' }) readonly error!: string;

  /**
   * Disables the validation process
   */
  @Prop({ default: false }) readonly novalidate!: boolean;


  /******************************************
   * Type specific props
   */

  /**
   * The textarea rows attribute
   */
  @Prop({ default: 3 }) readonly rows!: number;

  /**
   * The options list for select, radio & checkbox lists
   */
  @Prop({ default: () => [] }) readonly options!: Array<IOption>;


  /******************************************
   * State props
   */

  /**
   * Whether the field is disabled
   */
  @Prop({ default: false }) readonly disabled!: boolean;

  /**
   * Disables the browser's auto complete function
   */
  @Prop({ default: false }) readonly autocomplete!: boolean;



  /******************************************
   * Data
   */

  /**
   * Whether the field is disabled because it is busy
   */
  private busy = false;

  /**
   * Indicates whether the user has interacted with this field.
   */
  private hasBeenInteractedWith = false;

  /**
   * The bound field value
   */
  private fieldValue: string|boolean|number|Array<string> = ''

  /******************************************
   * Computed
   */

  /**
   * The disabled state can be set on field level as a prop, and can be determined by the busy state of the form
   */
  get isDisabled(): boolean {
    return this.disabled || this.busy
  }

  /**
   * Provide read access to the busy property
   */
  get isBusy(): boolean {
    return this.busy
  }

  /**
   * Whether the field has been validated positively
   *  Returns null if validation has not been applied yet
   */
  get isValid(): boolean {
    if (this.novalidate) { // = validation is disabled
      return false
    }
    return !! this.valid
  }

  /**
   * Whether the validation has been applied.
   *  We cannot know for certain about this. The interaction indicator that triggers the 
   *  first validation is taken as validation indicator
   */
  get hasBeenValidated(): boolean {
    return this.hasBeenInteractedWith && ! this.novalidate
  }

  /**
   * List of css classes
   */
  get fieldClasses(): Record<string, boolean> {
    return {
      'FormField--disabled': this.isDisabled,
      'FormField--busy': this.isBusy,
      'FormField--valid': this.hasBeenValidated ? this.isValid : false,
      'FormField--invalid': this.hasBeenValidated ? !this.isValid : false,
    }
  }


  /******************************************
   * Watchers
   */
  @Watch('value')
  valueChanged(newValue: string|boolean|number|Array<string>) {
    this.fieldValue = newValue
  }


  /******************************************
   * Lifecycle Hooks
   */

  created() {
    this.fieldValue = this.value
    
    // If contained within a Form component, register the form field
    if (this.registerFormField) {
      const field: IConnectedField = {
        enable: this.enable,
        disable: this.disable,
        validate: this.validate,
        isValid: this.isValid,
        resetValidation: this.resetValidation
      } 
      this.registerFormField(field);
    }
  }

  /******************************************
   * Methods
   */
 
  /**
   * Validation starts after the initial blur (first user interaction)
   */
  handleBlur() {
    if (this.hasBeenInteractedWith === false) {
      this.validate();
    }
    this.hasBeenInteractedWith = true;
  }

  /**
   * Handle input changes
   */
  handleInput(e: Event ) {
    
    const target = e.target as HTMLInputElement
    this.fieldValue = target.value
    console.log(this.fieldValue)

    if (this.hasBeenInteractedWith || this.type === 'select') {
      this.validate()
    }
    this.$emit('input', this.fieldValue)
  }

  /**
   * The actual field validation is externalised. 
   */
  validate(): void {
    if (!this.novalidate) {
      this.$emit('validate', this.fieldValue)
    }
  }

  /**
   * This resets the validation trigger mechanism.
   *  Because the validation process itself is external, it does not reset state
   */
  resetValidation() {
    this.hasBeenInteractedWith = false 
  }

  /**
   * Enabe / disable the busy state
   */
  enable() {
    this.busy = false
  }
  disable() {
    this.busy = true
  }

}
</script>

<style lang="scss">
// .FormField {
//   font-size: 16px;
//   position: relative;

//   input {
//     color: rgba(53, 64, 82, 0.5);
//   }
//   input:disabled {
//     color: #495057 !important
//   }

//   label, legend {
//     color: #7F8FA4;
//     text-transform: uppercase;
//     padding-bottom: 0;
//   }

//   .invalid-feedback {
//     position: absolute;
//     top: -1.75rem;
//     text-align: right;
//   }

//   &--choice {
//     height: 33px;

//     .custom-control-input:checked ~ .custom-control-label::before {
//       border-color: transparent;
//       background-color: transparent;
//     }
//     .custom-radio.check .custom-control-input:checked ~ .custom-control-label::after {
//       background-color: white;
//       // background-image: url('../../../assets/icons/Check-icon.svg');
//       background-size: cover;
//     }
//     .custom-radio.none .custom-control-input:checked ~ .custom-control-label::after {
//       background-color: white;
//       // background-image: url('../../../assets/icons/None-icon.svg');
//       background-size: cover;
//     }
//   }
// }
</style>