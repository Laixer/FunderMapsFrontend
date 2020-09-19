<template>
  <div class="FormField GeoCoder" :class="fieldClasses">
    <label :for="id" class="FormField__Label">{{ label }}</label>

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
        @blur="handleBlur"
      />

      <SvgIcon :icon="fieldIcon" class="FormField__Icon" />

      <div v-if="suggestions.length !== 0" class="GeoCoder__Suggestions">
        <div
          class="Suggestion"
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click="handleSelect(suggestion)"
        >
          <SvgIcon icon="icon_location" class="Suggestion__Icon" />
          <span v-html="format(suggestion)"></span>
        </div>
      </div>
    </div>

    <span v-if="error" class="FormField__Feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Debounce } from 'vue-debounce-decorator'

import FormField from '@/components/common/FormField.vue'

import { ISuggestion } from './ISuggestion'
import { formatAddressSuggestionWithMarkup } from '@/helpers/text'


@Component
export default class GeoCoder extends FormField {
  private suggestions: Array<ISuggestion> = []

  get fieldIcon(): string {
    return this.validationIcon ? this.validationIcon : 'icon_search'
  }

  async requestThenMap<T>(request: string): Promise<T> {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await response.json()
  }

  /**
   * Handle input changes
   */
  @Debounce(20)
  async handleInput(e: Event): Promise<void> {
    const target = e.target as HTMLInputElement
    if (target.value.length > 2) {
      try {
        this.suggestions = await this.requestThenMap<ISuggestion[]>(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/address-suggest?query=${target.value}&limit=5`)
      } catch (e) {
        this.suggestions = []
      }
    }
    this.fieldValue = target.value
  }

  private handleSelect(suggestion: ISuggestion): void {
    this.suggestions = []
    this.$emit('suggestion', suggestion)
  }

  private format(sug: ISuggestion): string {
    return formatAddressSuggestionWithMarkup(sug, this.fieldValue as string)
  }
}
</script>

<style lang="scss">
.GeoCoder {
  position: relative;

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
  padding-top: 5px;
  border: 2px solid #d4daf0;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  background: white;

  @media only screen and (max-width: $BREAKPOINT) {
    position: absolute;
    top: 80px;
    z-index: 9999;
  }

  .Suggestion {
    display: block;
    position: relative;
    padding: 13px 15px 14px 50px;
    width: 100%;

    span {
      font-size: 14px;
      line-height: 19px;
      color: #202122;
    }

    .SvgIcon {
      color: #d4daf0;
      position: absolute;
      top: 13px;
      left: 20px;
      font-size: 19px;
    }

    &:hover {
      cursor: pointer;
      background: $PRIMARY_COLOR;

      .SvgIcon,
      span {
        color: white;
      }
    }
  }
}
</style>