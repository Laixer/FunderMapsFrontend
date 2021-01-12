<template>
  <div class="AddressCharacteristics">
    <Form>
      <div class="AddressCharacteristics--one">
        <Title :center="true">Is het een vrijstaand pand of onderdeel van een (bouw)blok?</Title>
        <RadioImageInput
          :value="this.chainedBuilding"
          id="vrijstaand"
          :options="vrijstaandOptions"
          :valid="this.chainedBuilding !== null"
          @input="updateChainedBuilding"
        />
      </div>
      <div class="AddressCharacteristics--two">
        <Title :center="true">Bent u eigenaar of huurder van de woning?</Title>
        <RadioImageInput
          :value="this.owner"
          id="eigendom"
          :options="eigendomOptions"
          :valid="this.owner !== null"
          @input="updateOwner"
        />
      </div>
      <div class="AddressCharacteristics--three">
        <Title :center="true">Is bij een van uw directe buren funderingsherstel uitgevoerd?</Title>
        <RadioImageInput
          :value="this.neighborRecovery"
          id="buren"
          :options="burenOptions"
          :valid="this.neighborRecovery !== null"
          @input="updateNeighborRecovery"
        />
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'


import Title from '@/components/Title.vue'

import Form from '@/components/common/Form.vue'
import RadioImageInput from '@/components/form/RadioImageInput.vue'

import { IOption } from '@/components/common/IOption'

@Component({
  mixins: [QuestionMixin],
  components: {
    Title, Form, RadioImageInput
  }
})
export default class AddressCharacteristicsQuestion extends Mixins(QuestionMixin) {

  private chainedBuilding: boolean | null = null
  private owner: boolean | null = null
  private neighborRecovery: boolean | null = null

  private vrijstaandOptions: Array<IOption> = [
    {
      label: 'Vrijstaand',
      value: false,
      image: 'options/vrijstaand_vrijstaand'
    },
    {
      label: '(Bouw)blok',
      value: true,
      image: 'options/vrijstaand_bouwblok'
    }
  ]
  private eigendomOptions: Array<IOption> = [
    {
      label: 'Eigenaar',
      value: true,
      image: 'options/eigendom_eigenaar'
    },
    {
      label: 'Huurder',
      value: false,
      image: 'options/eigendom_huurder'
    }
  ]
  private burenOptions: Array<IOption> = [
    {
      label: 'Ja',
      value: true,
      image: 'options/buren_ja'
    },
    {
      label: 'Nee',
      value: false,
      image: 'options/buren_nee'
    }
  ]

  public get isValid(): boolean {
    return (this.chainedBuilding !== null
      && this.owner !== null
      && this.neighborRecovery !== null
    )
  }

  public storeData(): void {
    this.$store.commit('updateState', [
      {
        key: 'chainedBuilding',
        value: this.chainedBuilding
      },
      {
        key: 'owner',
        value: this.owner
      },
      {
        key: 'neighborRecovery',
        value: this.neighborRecovery
      },
    ])
  }

  /**
   * Pass on the initial validity status
   */
  created(): void {
    this.chainedBuilding = this.$store.state.chainedBuilding
    this.owner = this.$store.state.owner
    this.neighborRecovery = this.$store.state.neighborRecovery
  }

  private updateOwner(val: string) {
    this.owner = (val === 'true')
  }

  private updateNeighborRecovery(val: string) {
    this.neighborRecovery = (val === 'true')
  }

  private updateChainedBuilding(val: string) {
    this.chainedBuilding = (val === 'true')
  }

}
</script>

<style lang="scss">
.AddressCharacteristics {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }

  .Title {
    margin-bottom: 21px;
  }
  .Form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @media only screen and (min-width: 1115px) {
      flex-direction: row;
    }
  }

  &--one,
  &--two,
  &--three {
  }
  &--one,
  &--two {
    padding-bottom: 44px;
    border-bottom: 1px solid #d4daf0;
  }
  &--two,
  &--three {
    padding-top: 25px;
  }
  &--three {
    padding-bottom: 24px;
  }

  // More than regular breakpoint, because the items won't fit otherwise
  @media only screen and (min-width: 1115px) {
    &--one {
      width: 430px;
      padding: 0 50px 31px 0;
    }
    &--two {
      width: 430px;
      padding: 0 0 31px 50px;
      border-left: 1px solid #d4daf0;
    }
    &--three {
      padding-bottom: 0;
    }
  }
}
</style>