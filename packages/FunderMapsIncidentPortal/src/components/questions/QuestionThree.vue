<template>
  <div class="QuestionThree">
    <Title :center="true">
      Wat veroorzaakt de schade aan de woning?
    </Title>
    
    <Form>
      <RadioTextInput id="type" :options="options" :valid="valid" @validate="handleValidation" />
    </Form>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'

import Title from '@/components/Title.vue'

import Form from '@/components/common/Form.vue'
import RadioTextInput from '@/components/form/RadioTextInput.vue'

import { IOption } from '@/components/common/IOption'

@Component({
  components: {
    Title, Form, RadioTextInput
  }
})
export default class QuestionThree extends Vue {

  private valid: boolean|null = false;

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

  @Watch('valid')
  validChange(newValue: boolean) {
    this.$emit('validity', newValue)
  }

  created() {
    this.$emit('validity', this.valid)
  }

  /**
   * 
   */
  handleValidation(value: string|number|boolean|Array<string>) {
    this.valid = value !== ''
  }
}
</script>

<style lang="scss">
.QuestionThree {
  .Title {
    margin-bottom: 21px;
  }
}
</style>