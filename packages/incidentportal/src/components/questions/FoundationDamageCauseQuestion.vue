<template>
  <div class="FoundationDamageCause">
    <Title :center="true">Wat veroorzaakt de schade aan de woning?</Title>

    <Form>
      <RadioTextInput
        :value="value"
        id="type"
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
import RadioTextInput from '@/components/form/RadioTextInput.vue'

import { IOption } from '@/components/common/IOption'
import FoundationDamageCharacteristics from '@/types/FoundationDamageCharacteristics'
import FoundationDamageCause from '@/types/FoundationDamageCause'

@Component({
  mixins: [QuestionMixin],
  components: {
    Title, Form, RadioTextInput
  }
})
export default class FoundationDamageCauseQuestionQuestion extends Mixins(QuestionMixin) {
  private value: FoundationDamageCause | null = null

  private options: Array<IOption> = [
    {
      label: 'Verkeerd gefundeerd bij de bouw',
      value: FoundationDamageCause.ConstructionFlaw
    },
    {
      label: 'Beschadiging van de fundering door (planten)wortels',
      value: FoundationDamageCause.Vegetation
    },
    {
      label: 'Aantasting van houten palen door schimmels/bacterieën',
      value: FoundationDamageCause.BioFungusInfection
    },
    {
      label: 'Gaswinning of mijnbouw',
      value: FoundationDamageCause.Gas
    },
    {
      label: 'De funderingspalen drukken de woning omhoog',
      value: FoundationDamageCause.ConstructionHeave
    },
    {
      label: 'Verkeer nabij de woning',
      value: FoundationDamageCause.Vibrations
    },
    {
      label: 'De funderingspalen worden naar beneden getrokken',
      value: FoundationDamageCause.NegativeCling
    },
    {
      label: 'Funderingsherstel bij de buren',
      value: FoundationDamageCause.PartialFoundationRecovery
    },
    {
      label: 'Bodemdaling',
      value: FoundationDamageCause.Subsidence
    },
    {
      label: 'Fundering niet meer berekend op het huidige gewicht',
      value: FoundationDamageCause.FoundationFlaw
    },
    {
      label: 'Weet ik niet',
      value: FoundationDamageCause.Unknown
    },
  ]

  created(): void {
    this.value = this.$store.state.foundationDamageCause
  }

  public get isValid(): boolean {
    return this.value !== null
  }

  public storeData(): void {
    this.$store.commit('updateState', [{
      key: 'foundationDamageCause',
      value: this.value
    }])
  }

  private handleInput(value: FoundationDamageCause) {
    this.value = value
  }
}
</script>

<style lang="scss">
.FoundationDamageCause {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }
}
</style>