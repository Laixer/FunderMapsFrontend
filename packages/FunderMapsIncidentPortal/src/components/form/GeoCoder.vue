<template>
  <div class="FormField GeoCoder" :class="fieldClasses">
    <label 
      :for="id"
      class="FormField__Label">
      {{ label }}
    </label>

    <div class="FormField__Wrapper">
      <input 
        :id="id"
        :value="fieldValue" 
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete: 'off'"
        :disabled="isDisabled"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur" />

      <SvgIcon 
        :icon="fieldIcon" 
        class="FormField__Icon" />
    </div>
    <div v-if="suggestions.length !== 0" class="GeoCoder__Suggestions">
      <div class="Suggestion" v-for="suggestion in suggestions" :key="suggestion.value" @click="handleSelect(suggestion)">
        <SvgIcon 
          icon="icon_location" 
          class="Suggestion__Icon" />
        <span>{{ suggestion.label }}</span>
      </div>
    </div>

    <span v-if="error" class="FormField__Feedback">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FormField from '@/components/common/FormField.vue'

import { ISuggestion } from './ISuggestion'

@Component
export default class GeoCoder extends FormField {


  private suggestions: Array<ISuggestion> = []


  get fieldIcon(): string {
    return this.validationIcon ? this.validationIcon : 'icon_search'
  }

  /**
   * Handle input changes
   */
  handleInput( e: Event ) {
    const target = e.target as HTMLInputElement


    // TODO: Make API call to get results
    this.suggestions = [
      {
        label: 'Winterkersstraat Utrecht',
        value: '1',
        coordinates: [5.261593, 52.203787]
      },
      {
        label: 'Vonddellaan Utrecht',
        value: '2',
        coordinates: [5.143572, 52.061672]
      },
      {
        label: 'Croesselaan Utrecht',
        value: '3',
        coordinates: [5.023806, 52.080801]
      },
    ]

    this.fieldValue = target.value
  }

  handleSelect( suggestion: ISuggestion ) {
    
    this.suggestions = []

    this.fieldValue = suggestion.label 
    
    this.$emit('coordinates', suggestion.coordinates)
    this.$emit('suggestion', suggestion)
  }
}
</script>

<style lang="scss">
.GeoCoder {

  .FormField__Field {
    padding-right: 45px;
  }

  .FormField__Icon {
    opacity: 1;
    font-size: 20px;
  }
}
.GeoCoder.FormField--invalid,
.GeoCoder.FormField--valid {
  .FormField__Icon {
    font-size: 12px;
  }
}

.GeoCoder__Suggestions {
  width: 100%;
  padding-top: 15px;
  border: 2px solid #D4DAF0;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  background: white;
  margin-top: -4px;

  .Suggestion {
    display: block;
    position: relative;
    padding: 13px 15px 14px 50px;
    width: 100%;

    span {
      font-size: 14px;
      font-weight: bold;
      line-height: 19px;
      color: #202122;
    }

    .SvgIcon {
      color: #D4DAF0;
      position: absolute;
      top: 13px;
      left: 20px;
      font-size: 19px;
    }

    &:hover {
      cursor: pointer;
      background: $PRIMARY_COLOR;

      .SvgIcon, span {
        color: white;
      }
    }
  }
}
</style>