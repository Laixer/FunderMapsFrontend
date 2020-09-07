<template>
  <div class="QuestionFive">
    <Title :center="true" subtitle="Meerdere opties mogelijk">
      Herkent u minstens één van de volgende punten in de omgeving van de woning? 
    </Title>
    
    <Form>
      <CheckboxInput id="omgeving" :options="options" :valid="valid" @validate="handleValidation" />
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
export default class QuestionFive extends Vue {

  private valid: boolean|null = true;

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
.QuestionFive {
  .Title {
    margin-bottom: 21px;
  }
}
</style>