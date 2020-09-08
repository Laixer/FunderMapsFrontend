<template>
  <div class="FoundationDamageCause">
    <Title :center="true">
      Wat veroorzaakt de schade aan de woning?
    </Title>
    
    <Form>
      <RadioTextInput :value="value" id="type" :options="options" :valid="valid" @validate="handleValidation" @input="handleInput" />
    </Form>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'

import Title from '@/components/Title.vue'

import Form from '@/components/common/Form.vue'
import RadioTextInput from '@/components/form/RadioTextInput.vue'

import { IOption } from '@/components/common/IOption'

@Component({
  components: {
    Title, Form, RadioTextInput
  }
})
export default class FoundationDamageCause extends Vue {


  /**
   * The form field value
   */
  @Prop({ default: '' }) value !: string;

  /**
   * The validity status
   */
  private valid: boolean|null = false;

  /**
   * The form field options
   */
  private options: Array<IOption> = [
    {
      label: 'Verkeerd gefundeerd bij de bouw',
      value: 'hout'
    },
    {
      label: 'Beschadiging van de fundering door (planten)wortels',
      value: 'beton'
    },
    {
      label: 'Aantasting van houten palen door schimmels/bacterieën',
      value: 'staal'
    },
    {
      label: 'Gaswinning of mijnbouw',
      value: 'beton'
    },
    {
      label: 'De funderingspalen drukken de woning omhoog',
      value: 'beton'
    },
    {
      label: 'Verkeer nabij de woning',
      value: 'beton'
    },
    {
      label: 'De funderingspalen worden naar beneden getrokken',
      value: 'onbekend'
    },
    {
      label: 'Funderingsherstel bij de buren',
      value: 'beton'
    },
    {
      label: 'Bodemdaling',
      value: 'beton'
    },
    {
      label: 'Weet ik niet',
      value: 'beton'
    },
    {
      label: 'Fundering niet meer berekend op het huidige gewicht',
      value: 'onbekend'
    }
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
      this.handleValidation(this.value)
    }
    this.$emit('validity', this.valid)
  }

  /**
   * Handle the form validation
   */
  handleValidation(value: string|number|boolean|Array<string>) {
    this.valid = value !== ''
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
.FoundationDamageCause {
  .Title {
    margin-bottom: 21px;
  }
}
</style>