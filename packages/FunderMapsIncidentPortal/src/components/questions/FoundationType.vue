<template>
  <div class="FoundationType">
    <Title :center="true">
      Op welke type fundering is de woning gebouwd?
    </Title>
    
    <Form>
      <RadioImageInput :value="value" id="type" :options="options" :valid="valid" @validate="handleValidation" @input="handleInput" />
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
export default class FoundationType extends Vue {

  /**
   * The form field value
   */
  @Prop({ default: '' }) value !: string;

  /**
   * The validity status
   */
  private valid: boolean|null = false;

  /**
   * The form field options
   */
  private options: Array<IOption> = [
    {
      label: 'Houten palen',
      value: 'hout',
      image: 'options/type_hout'
    },
    {
      label: 'Ondiep op staal',
      value: 'staal',
      image: 'options/type_staal'
    },
    {
      label: 'Betonnen palen',
      value: 'beton',
      image: 'options/type_beton'
    },
    {
      label: 'Weet ik niet',
      value: 'onbekend',
      image: 'options/type_onbekend'
    }
  ]

  /**
   * Pass on changes in the validity status
   */
  @Watch('valid')
  validChange(newValue: boolean) {
    this.$emit('validity', newValue)
  }

  /**
   * Pass on the initial validity status
   */
  created() {
    if (this.value) {
      this.handleValidation(this.value)
    }
    this.$emit('validity', this.valid)
  }

  /**
   * Handle the form validation
   */
  handleValidation(value: string|number|boolean|Array<string>) {
    this.valid = value !== ''
  }

  /**
   * Pass on the input event
   */
  handleInput(value: string|number|boolean|Array<string>) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss">
.FoundationType {
  .Title {
    margin-bottom: 21px;
  }
}
</style>