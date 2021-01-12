<template>
  <div class="FoundationType">
    <Title :center="true">Op welke type fundering is de woning gebouwd?</Title>

    <Form>
      <RadioImageInput
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
import RadioImageInput from '@/components/form/RadioImageInput.vue'

import { IOption } from '@/components/common/IOption'
import FoundationType from '@/types/FoundationType'

@Component({
  mixins: [QuestionMixin],
  components: {
    Title, Form, RadioImageInput
  }
})
export default class FoundationTypeQuestion extends Mixins(QuestionMixin) {
  private value: FoundationType | null = null

  public get isValid(): boolean {
    return this.value !== null
  }

  public storeData(): void {
    this.$store.commit('updateState', [{
      key: 'foundationType',
      value: this.value
    }])
  }

  created(): void {
    this.value = this.$store.state.foundationType
  }

  /**
   * The form field options
   */
  private options: Array<IOption> = [
    {
      label: 'Houten palen',
      value: FoundationType.Wood,
      image: 'options/type_hout'
    },
    {
      label: 'Ondiep op staal',
      value: FoundationType.SteelPile,
      image: 'options/type_staal'
    },
    {
      label: 'Betonnen palen',
      value: FoundationType.Concrete,
      image: 'options/type_beton'
    },
    {
      label: 'Weet ik niet',
      value: FoundationType.Unknown,
      image: 'options/type_onbekend'
    }
  ]

  /**
   * Pass on the input event
   */
  private handleInput(value: FoundationType) {
    this.value = value
  }
}
</script>

<style lang="scss">
.FoundationType {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }

  .RadioImageInput__Wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .RadioImageInput__Field {
    margin: 10px 10px 10px 10px;
  }
}
</style>