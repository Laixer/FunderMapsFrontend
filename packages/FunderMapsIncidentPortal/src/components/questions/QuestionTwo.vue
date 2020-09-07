<template>
  <div class="QuestionTwo">
    <Form>
      <div class="QuestionTwo--one">
        <Title :center="true">
          Is het een vrijstaand pand of onderdeel van een (bouw)blok?
        </Title>
        <RadioImageInput id="vrijstaand" :options="vrijstaandOptions" :valid="vrijstaandValid" @validate="handleVrijstaandValidation" />
      </div>
      <div class="QuestionTwo--two">
        <Title :center="true">
          Bent u eigenaar of huurder van de woning?
        </Title>
        <RadioImageInput id="eigendom" :options="eigendomOptions" :valid="eigendomValid" @validate="handleEigendomValidation" />
      </div>
      <div class="QuestionTwo--three">
        <Title :center="true">
          Is bij een van uw directe buren funderingsherstel uitgevoerd?
        </Title>
        <RadioImageInput id="buren" :options="burenOptions" :valid="burenValid" @validate="handleBurenValidation" />
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from 'vue-property-decorator'

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

  private vrijstaandValid: boolean|null = false;
  private eigendomValid: boolean|null = false;
  private burenValid: boolean|null = false;
  
  private vrijstaandOptions: Array<IOption> = [
    {
      label: 'Vrijstaand',
      value: 'vrijstaand',
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

  created() {
    this.$emit('validity', (this.vrijstaandValid && this.eigendomValid && this.burenValid ))
  }

  /**
   * 
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
  }

  &--one {
    width: 430px;
    padding: 0 50px 40px 0;
    border-bottom: 1px solid #D4DAF0;
  }
  &--two {
    width: 430px;
    padding: 0 0 40px 50px;
    border-bottom: 1px solid #D4DAF0;
    border-left: 1px solid #D4DAF0;
  }
  &--three {
    width: 380px;
    padding-top: 40px;
  }
}
</style>