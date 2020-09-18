<template>
  <div class="EnvironmentDamageCharacteristics">
    <Title
      :center="true"
      subtitle="Meerdere opties mogelijk"
    >Herkent u minstens één van de volgende punten in de omgeving van de woning?</Title>

    <Form>
      <CheckboxInput
        :value="value"
        id="omgeving"
        :options="options"
        :valid="isValid"
        @input="handleInput"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Title from '@/components/Title.vue'

import Form from '@/components/common/Form.vue'
import CheckboxInput from '@/components/form/CheckboxInput.vue'

import { IOption } from '@/components/common/IOption'
import EnvironmentDamageCharacteristics from '@/types/EnvironmentDamageCharacteristics'

@Component({
  mixins: [QuestionMixin],
  components: {
    Title, Form, CheckboxInput
  }
})
export default class EnvironmentDamageCharacteristicsQuestion extends Mixins(QuestionMixin) {
  private value: Array<EnvironmentDamageCharacteristics> = []

  private options: Array<IOption> = [
    {
      label: 'Er is sprake van bodemdaling tuin/erf',
      value: EnvironmentDamageCharacteristics.Subsidence
    },
    {
      label: 'Andere panden in de buurt met funderingsproblemen',
      value: EnvironmentDamageCharacteristics.FoundationDamageNearby
    },
    {
      label: 'Verzakkende rioolaansluitingen',
      value: EnvironmentDamageCharacteristics.SaggingSewerConnection
    },
    {
      label: 'Toenemende verkeersdrukte in de straat',
      value: EnvironmentDamageCharacteristics.IncreasingTraffic
    },
    {
      label: 'Verzakkende kabels en leidingen',
      value: EnvironmentDamageCharacteristics.SaggingCablesPipes
    },
    {
      label: 'De straat is onlangs opgehoogd',
      value: EnvironmentDamageCharacteristics.Elevation
    },
    {
      label: 'Wateroverlast (water op straat)',
      value: EnvironmentDamageCharacteristics.Flooding
    },

    {
      label: 'Er zijn bouwactiviteiten in de omgeving gaande (geweest)',
      value: EnvironmentDamageCharacteristics.ConstructionNearby
    },
    {
      label: 'Water onderlast (droge bodem)',
      value: EnvironmentDamageCharacteristics.LowGroundWater
    },
    {
      label: 'Er staan grote bomen dicht bij (< 10 m) mijn woning',
      value: EnvironmentDamageCharacteristics.VegetationNearby
    },
    {
      label: 'Lekke riolering',
      value: EnvironmentDamageCharacteristics.SewageLeakage
    },
  ]

  created(): void {
    this.value = this.$store.state.environmentDamageCharacteristics
  }

  public get isValid(): boolean {
    return this.value.length > 0
  }

  public storeData(): void {
    this.$store.commit('updateState', [{
      key: 'environmentDamageCharacteristics',
      value: this.value
    }])
  }

  private handleInput(value: Array<EnvironmentDamageCharacteristics>): void {
    this.value = value.flatMap((val) => parseInt(val + '', 10))
  }
}
</script>

<style lang="scss">
.EnvironmentDamageCharacteristics {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }
}
</style>