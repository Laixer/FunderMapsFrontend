<template>
  <div class="QuestionTwo">
    <Form>
      <div class="QuestionTwo--one">
        <Title :center="true">
          Is het een vrijstaand pand of onderdeel van een (bouw)blok?
        </Title>
        <RadioImageInput :value="vrijstaandValue" id="vrijstaand" :options="vrijstaandOptions" :valid="vrijstaandValid" @validate="handleVrijstaandValidation" @input="handleVrijstaandInput" />
      </div>
      <div class="QuestionTwo--two">
        <Title :center="true">
          Bent u eigenaar of huurder van de woning?
        </Title>
        <RadioImageInput :value="eigendomValue" id="eigendom" :options="eigendomOptions" :valid="eigendomValid" @validate="handleEigendomValidation" @input="handleEigendomInput" />
      </div>
      <div class="QuestionTwo--three">
        <Title :center="true">
          Is bij een van uw directe buren funderingsherstel uitgevoerd?
        </Title>
        <RadioImageInput :value="burenValue" id="buren" :options="burenOptions" :valid="burenValid" @validate="handleBurenValidation" @input="handleBurenInput" />
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from 'vue-property-decorator'

import Title from '@/components/Title.vue'

import Form from '@/components/common/Form.vue'
import RadioImageInput from '@/components/form/RadioImageInput.vue'

import { IOption } from '@/components/common/IOption'

@Component({
  components: {
    Title, Form, RadioImageInput
  }
})
export default class QuestionTwo extends Vue {

  /**
   * The form field value
   */
  @Prop({ default: '' }) value !: Record<string, string>;

  /**
   * Form values proxy
   */
  private vrijstaandValue = ''
  private eigendomValue = ''
  private burenValue = ''

  /**
   * The validity status
   */
  private vrijstaandValid: boolean|null = false;
  private eigendomValid: boolean|null = false;
  private burenValid: boolean|null = false;
  
  /**
   * The form field options
   */
  private vrijstaandOptions: Array<IOption> = [
    {
      label: 'ChainedBuilding',
      value: 'ChainedBuilding',
      image: 'options/vrijstaand_vrijstaand'
    },
    {
      label: '(Bouw)blok',
      value: 'bouwblok',
      image: 'options/vrijstaand_bouwblok'
    }
  ]
  private eigendomOptions: Array<IOption> = [
    {
      label: 'Eigenaar',
      value: 'eigenaar',
      image: 'options/eigendom_eigenaar'
    },
    {
      label: 'Huurder',
      value: 'huurder',
      image: 'options/eigendom_huurder'
    }
  ]
  private burenOptions: Array<IOption> = [
    {
      label: 'Ja',
      value: 'ja',
      image: 'options/buren_ja'
    },
    {
      label: 'Nee',
      value: 'nee',
      image: 'options/buren_nee'
    }
  ]

  /**
   * Pass on changes in the validity status
   */
  @Watch('vrijstaandValid')
  vrijstaandValidChange() {
    this.$emit('validity', (this.vrijstaandValid && this.eigendomValid && this.burenValid ))
  }
  @Watch('eigendomValid')
  eigendomValidChange() {
    this.$emit('validity', (this.vrijstaandValid && this.eigendomValid && this.burenValid ))
  }
  @Watch('burenValid')
  burenValidChange() {
    this.$emit('validity', (this.vrijstaandValid && this.eigendomValid && this.burenValid ))
  }

  /**
   * Handle changes to the value prop
   */
  @Watch('value') 
  valueChange() {
    this.vrijstaandValue = this.value['ChainedBuilding'] || ''
    this.eigendomValue = this.value['Owner'] || ''
    this.burenValue = this.value['NeighborRecovery'] || ''
  }

  /**
   * Pass on the initial validity status
   */
  created() {
    this.vrijstaandValue = this.value['ChainedBuilding'] || ''
    this.eigendomValue = this.value['Owner'] || ''
    this.burenValue = this.value['NeighborRecovery'] || ''
    
    if (this.vrijstaandValue) {
      this.handleVrijstaandValidation(this.vrijstaandValue)
    }
    if (this.eigendomValue) {
      this.handleEigendomValidation(this.eigendomValue)
    }
    if (this.burenValue) {
      this.handleBurenValidation(this.burenValue)
    }
    this.$emit('validity', (this.vrijstaandValid && this.eigendomValid && this.burenValid ))
  }

  /**
   * No requirements
   */
  handleVrijstaandValidation(value: string|number|boolean|Array<string>) {
    this.vrijstaandValid = value !== ''
  }
  handleEigendomValidation(value: string|number|boolean|Array<string>) {
    this.eigendomValid = value !== ''
  }
  handleBurenValidation(value: string|number|boolean|Array<string>) {
    this.burenValid = value !== ''
  }

  /**
   * Pass on the input event
   */
  handleVrijstaandInput(value: string|number|boolean|Array<string>) {
    this.$emit('input', {
      'ChainedBuilding': value,
      'Owner': this.eigendomValue,
      'NeighborRecovery': this.burenValue
    })
  }
  handleEigendomInput(value: string|number|boolean|Array<string>) {
    this.$emit('input', {
      'ChainedBuilding': this.vrijstaandValue,
      'Owner': value,
      'NeighborRecovery': this.burenValue
    })
  }
  handleBurenInput(value: string|number|boolean|Array<string>) {
    this.$emit('input', {
      'ChainedBuilding': this.vrijstaandValue,
      'Owner': this.eigendomValue,
      'NeighborRecovery': value
    })
  }

}
</script>

<style lang="scss">
.QuestionTwo {
  
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

  &--one, &--two, &--three {
    width: 380px;
  }
  &--one, &--two {
    padding-bottom: 44px;
    border-bottom: 1px solid #D4DAF0;
  }
  &--two, &--three {
    padding-top: 25px;
  }
  &--three {
    padding-bottom: 24px;
  }

  // More than regular breakpoint, because the items won't fit otherwise 
  @media only screen and (min-width: 1115px) {
    &--one {
      width: 430px;
      padding: 0 50px 35px 0;
    }
    &--two {
      width: 430px;
      padding: 0 0 35px 50px;
      border-left: 1px solid #D4DAF0;
    }
    &--three {
      padding-bottom: 0;
    }
  }
}
</style>