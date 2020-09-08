<template>
  <div class="EnvironmentDamageCharacteristics">
    <Title :center="true" subtitle="Meerdere opties mogelijk">
      Herkent u minstens één van de volgende punten in de omgeving van de woning? 
    </Title>
    
    <Form>
      <CheckboxInput :value="value" id="omgeving" :options="options" :valid="valid" @validate="handleValidation" @input="handleInput" />
    </Form>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'

import Title from '@/components/Title.vue'

import Form from '@/components/common/Form.vue'
import CheckboxInput from '@/components/form/CheckboxInput.vue'

import { IOption } from '@/components/common/IOption'

@Component({
  components: {
    Title, Form, CheckboxInput
  }
})
export default class EnvironmentDamageCharacteristics extends Vue {

  /**
   * The form field value
   */
  @Prop({ default: '' }) value !: string;

  /**
   * The validity status
   */
  private valid: boolean|null = true;

  /**
   * The form field options
   */
  private options: Array<IOption> = [
    {
      label: 'Er is sprake van bodemdaling tuin/erf',
      value: 'hout'
    },
    {
      label: 'Andere panden in de buurt met funderingsproblemen',
      value: 'beton'
    },
    {
      label: 'Verzakkende rioolaansluitingen',
      value: 'staal'
    },
    {
      label: 'Toenemende verkeersdrukte in de straat',
      value: 'beton'
    },
    {
      label: 'Verzakkende kabels en leidingen',
      value: 'beton'
    },
    {
      label: 'De straat is onlangs opgehoogd',
      value: 'beton'
    },
    {
      label: 'Wateroverlast (water op straat)',
      value: 'onbekend'
    },

    {
      label: 'Er zijn bouwactiviteiten in de omgeving gaande (geweest)',
      value: 'onbekend'
    },
    {
      label: 'Water onderlast (droge bodem)',
      value: 'onbekend'
    },
    {
      label: 'Er staan grote bomen dicht bij (< 10 m) mijn woning',
      value: 'onbekend'
    },
    {
      label: 'Lekke riolering',
      value: 'onbekend'
    },
  ]

  /**
   * Pass on changes in the validity status
   */
  @Watch('valid')
  validChange(newValue: boolean) {
    this.$emit('validity', newValue)
  }

  /**
   * Pass on the initial validity status
   */
  created() {
    if (this.value) {
      this.handleValidation() // this.value
    }
    this.$emit('validity', this.valid)
  }

  /**
   * No requirements
   */
  handleValidation() {
    this.valid = true
  }

  /**
   * Pass on the input event
   */
  handleInput(value: string|number|boolean|Array<string>) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss">
.EnvironmentDamageCharacteristics {
  .Title {
    margin-bottom: 21px;
  }
}
</style>