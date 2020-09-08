<template>
  <div class="QuestionFour">
    <Title :center="true" subtitle="Meerdere opties mogelijk">
      Herkent u minstens één van de volgende punten aan de woning? 
    </Title>
    
    <Form>
      <CheckboxInput :value="value" id="woning" :options="options" :valid="valid" @validate="handleValidation" @input="handleInput" />
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
export default class QuestionFour extends Vue {

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
      label: 'Klemmende ramen en/of deuren',
      value: 'hout'
    },
    {
      label: 'De woning ligt hoger dan troittoir/weg',
      value: 'beton'
    },
    {
      label: 'Scheur(en) in de muur en/of gevel(s)',
      value: 'staal'
    },
    {
      label: 'De woning ligt lager dan triottoir/weg',
      value: 'beton'
    },
    {
      label: 'De woning staat wat scheef',
      value: 'beton'
    },
    {
      label: 'Scheve vloeren/muren in de woning',
      value: 'beton'
    },
    {
      label: 'Hoog water in de kruipruimte',
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
.QuestionFour {
  .Title {
    margin-bottom: 21px;
  }
}
</style>