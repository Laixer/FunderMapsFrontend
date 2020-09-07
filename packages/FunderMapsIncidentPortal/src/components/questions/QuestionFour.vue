<template>
  <div class="QuestionFour">
    <Title :center="true" subtitle="Meerdere opties mogelijk">
      Herkent u minstens één van de volgende punten aan de woning? 
    </Title>
    
    <Form>
      <CheckboxInput id="woning" :options="options" :valid="valid" @validate="handleValidation" />
    </Form>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'

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

  private valid: boolean|null = true;

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

  @Watch('valid')
  validChange(newValue: boolean) {
    this.$emit('validity', newValue)
  }

  created() {
    this.$emit('validity', this.valid)
  }

  /**
   * No requirements
   */
  handleValidation() {
    this.valid = true
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