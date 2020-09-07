<template>
  <Page :step="7" :steps="8" class="Upload">
    
    <div class="Upload__Wrapper">
      <Title subtitle="U kunt deze stap ook overslaan">
        Heeft u een onderzoeksrapport beschikbaar?
      </Title>
      
      <Form>
        <FormField label="Implement upload" id="upload" :valid="valid" @validate="handleValidation" />
      </Form>

    </div>

    <template slot="footer">
      <Button :ghost="true" @click="handleNavigateBack">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>      
      <Button :disabled="!valid"  @click="handleNavigate">
        <span>Volgende</span>
        <SvgIcon icon="icon_arrow_next" />
      </Button>
    </template>
  
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import FormField from '@/components/common/FormField.vue'


@Component({
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField
  }
})
export default class Upload extends Vue {

  private valid: boolean|null = true;

  /**
   * 
   */
  handleValidation(value: string|number|boolean|Array<string>) {
    this.valid = ((value + '').trim().length > 1)
  }

  /**
   * Handle navigation forward
   */
  handleNavigate() {
    if (this.valid) {
      this.$router.push({ 
        name: 'Profile'
      })
    }
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {
    this.$router.push({ 
      name: 'Questions',
      params: {
        question: '5'
      }
    })
  }
}
</script>

<style lang="scss">
.Upload {
  &__Wrapper {
    max-width: 100%;
  }
  .Title{
    margin-bottom: 26px;
  }
}
</style>