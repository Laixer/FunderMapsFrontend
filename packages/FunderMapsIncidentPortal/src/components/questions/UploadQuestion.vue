<template>
  <div class="Upload__Wrapper">
    <Title
      :center="true"
      subtitle="U kunt deze stap ook overslaan"
    >Heeft u een onderzoeksrapport beschikbaar?</Title>

    <Form>
      <UploadArea
        @handleFileAdded="handleAddedFile"
        @handleFileRemoved="handleRemovedFile"
        @progress="handleUploadProgress"
      />

      <!-- <FormField label="Implement upload" id="upload" :valid="valid" @validate="handleValidation" /> -->
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import FormField from '@/components/common/FormField.vue'

import UploadArea from '@/components/common/UploadArea.vue'

@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField, UploadArea
  }
})
export default class UploadQuestion extends Mixins(QuestionMixin) {
  private value: Array<{ uuid: string, file: string }> = [];

  public get isValid(): boolean {
    return true
  }

  created(): void {
    this.value = this.$store.state.documentFile
  }

  public storeData(): void {
    this.$store.commit('updateState', [
      {
        key: 'documentFile',
        value: this.value
      },
    ])
  }

  private handleAddedFile(file: any, response: any) {
    this.value.push({ uuid: file.upload.uuid as string, file: response.name })
  }

  private handleRemovedFile(file: any, error: any, xhr: any) {
    this.value = this.value.filter((entry) => {
      entry.uuid !== file.upload.uuid
    })
  }

  private handleUploadProgress(status: string) {
    this.busy = status !== 'finished'
  }

}
</script>

<style lang="scss">
.Upload__Wrapper {
  height: 100%;
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  max-width: 100%;
}
.Title {
  margin-bottom: 26px;
}
</style>