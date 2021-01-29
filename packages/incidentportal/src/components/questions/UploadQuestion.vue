<template>
  <div class="Upload__Wrapper">
    <Title :center="true" subtitle="(onderzoeksrapporten, archiefstukken, tekeningen of foto's)"
      >Heeft u informatie beschikbaar?</Title
    >

    <BodyText :center="true" :italic="true" text="U kunt deze stap ook overslaan." />

    <Form :on-submmit="onSubmit">
      <UploadArea @handleFileAdded="handleAddedFile" @handleFileRemoved="handleRemovedFile" />

      <!-- <FormField label="Implement upload" id="upload" :valid="valid" @validate="handleValidation" /> -->
    </Form>
  </div>
</template>

<script lang="ts">
import { Title, Form, BodyText, UploadArea } from "@fundermaps/common";
import { defineComponent, Ref, ref, computed, ComputedRef } from "vue";
import form from "../../store/modules/form";

export default defineComponent({
  name: "UploadQuestion",
  components: {
    Title,
    Form,
    UploadArea,
    BodyText
  },
  setup() {
    const files: Ref<Array<{ uuid: string; file: string }>> = ref(form.documentFile);

    const isValid: ComputedRef<boolean> = computed(() => true);

    function onSubmit(): void {
      form.setDocumentFile(files.value);
    }

    const handleAddedFile = (file: any, response: any) => {
      files.value.push({ uuid: file.upload.uuid as string, file: response.name });
    };

    const handleRemovedFile = (file: any, error: any, xhr: any) => {
      files.value = files.value.filter(entry => {
        entry.uuid !== file.upload.uuid;
      });
    };

    return { files, isValid, onSubmit, handleAddedFile, handleRemovedFile };
  }
});
</script>

<style lang="scss">
.Upload__Wrapper {
  height: 100%;
  padding: 20px 20px;

  .Title {
    margin-bottom: 4px;
  }

  .BodyText {
    max-width: 100%;
    margin-bottom: 26px;
    font-size: 16px;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  max-width: 100%;
}
.Title {
  margin-bottom: 26px;
}
</style>
