<template>
  <Page :step="7" :steps="8" class="Upload">
    
    <div class="Upload__Wrapper">
      <Title :center="true" subtitle="U kunt deze stap ook overslaan">
        Heeft u een onderzoeksrapport beschikbaar?
      </Title>
      
      <Form>
        <UploadArea @progress="handleUploadProgress" />

        <!-- <FormField label="Implement upload" id="upload" :valid="valid" @validate="handleValidation" /> -->
      </Form>

    </div>

    <template slot="footer">
      <Button :disabled="busy" :ghost="true" @click="handleNavigateBack">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>      
      <Button :disabled="busy"  @click="handleNavigate">
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

import UploadArea from '@/components/common/UploadArea.vue'

@Component({
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField, UploadArea
  }
})
export default class Upload extends Vue {

  /**
   * Busy means an upload is not finished yet
   */
  private busy = false;

  /**
   * Keep track of when an upload is ongoing
   */
  handleUploadProgress(status: string) {
    this.busy = status !== 'finished'
  }

  /**
   * Handle navigation forward
   */
  handleNavigate() {
    if (this.busy) return 

    this.$router.push({ 
      name: 'Profile'
    })
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {
    if (this.busy) return 

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