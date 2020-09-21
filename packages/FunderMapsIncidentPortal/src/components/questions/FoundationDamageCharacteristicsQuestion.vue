<template>
  <div class="FoundationDamageCharacteristics">
    <Title
      :center="true"
      subtitle="Meerdere opties mogelijk"
    >Herkent u minstens één van de volgende punten aan de woning?</Title>

    <Form>
      <CheckboxInput
        :value="value"
        id="woning"
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
import FoundationDamageCharacteristics from '@/types/FoundationDamageCharacteristics'

@Component({
  mixins: [QuestionMixin],
  components: {
    Title, Form, CheckboxInput
  }
})
export default class FoundationDamageCharacteristicsQuestion extends Mixins(QuestionMixin) {
  private value: Array<FoundationDamageCharacteristics> = []

  private options: Array<IOption> = [
    {
      label: 'Klemmende ramen en/of deuren',
      value: FoundationDamageCharacteristics.JammingDoorWindow
    },
    {
      label: 'De woning ligt hoger dan troittoir/weg',
      value: FoundationDamageCharacteristics.ThresholdAboveSubsurface
    },
    {
      label: 'Scheur(en) in de muur en/of gevel(s)',
      value: FoundationDamageCharacteristics.Crack
    },
    {
      label: 'De woning ligt lager dan triottoir/weg',
      value: FoundationDamageCharacteristics.ThresholdBelowSubsurface
    },
    {
      label: 'De woning staat wat scheef',
      value: FoundationDamageCharacteristics.Skewed
    },
    {
      label: 'Scheve vloeren/muren in de woning',
      value: FoundationDamageCharacteristics.CrookedFloorWall
    },
    {
      label: 'Hoog water in de kruipruimte',
      value: FoundationDamageCharacteristics.CrawlspaceFlooding
    }
  ]

  created(): void {
    this.value = this.$store.state.foundationDamageCharacteristics
  }

  public get isValid(): boolean {
    return this.value.length > 0
  }

  public storeData(): void {
    this.$store.commit('updateState', [{
      key: 'foundationDamageCharacteristics',
      value: this.value
    }])
  }

  private handleInput(value: Array<FoundationDamageCharacteristics>): void {
    this.value = value
  }
}
</script>

<style lang="scss">
.FoundationDamageCharacteristics {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }
}
</style>