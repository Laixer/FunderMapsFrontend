<template>
  <div class="QuestionOne">
    <Title :center="true">
      Op welke type fundering is de woning gebouwd?
    </Title>
    
    <Form>
      <RadioImageInput value="hout" id="type" :options="options" :valid="valid" @validate="handleValidation" />
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
export default class QuestionOne extends Vue {

  private valid: boolean|null = true;

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
.QuestionOne {
  .Title {
    margin-bottom: 21px;
  }
}
</style>