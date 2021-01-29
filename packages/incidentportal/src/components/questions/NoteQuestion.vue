<template>
  <div class="Note__Wrapper">
    <Title :center="true">Aanvullende informatie of beschrijving</Title>
    <BodyText
      :center="true"
      :italic="true"
      text="Heeft u aanvullende informatie over uw schade? Meld deze in het onderstaande tekstveld."
    />

    <Form :busy="busy" :on-submit="onSubmit">
      <TextArea id="toelichting" v-model="note" :valid="isNoteValid" :rows="20" />
    </Form>
  </div>
</template>

<script lang="ts">
import { Form, Title, TextArea, BodyText } from "@fundermaps/common";
import { computed, ComputedRef, defineComponent, ref, Ref } from "vue";
import form from "../../store/modules/form";

export default defineComponent({
  name: "NoteQuestion",
  components: {
    BodyText,
    Title,
    Form,
    TextArea
  },
  setup() {
    const note: Ref<string | null> = ref(form.note);

    const isNoteValid: ComputedRef<boolean> = computed(() => true);

    const isValid: ComputedRef<boolean> = computed(() => true);

    function onSubmit(): void {
      form.setNote(note.value);
    }

    return {
      note,
      onSubmit,
      isValid,
      isNoteValid
    };
  }
});
</script>

<style lang="scss">
.Note {
  &__Wrapper {
    padding: 20px 20px;
    .Title {
      margin-bottom: 6px;
    }

    .BodyText {
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 12px;
    }

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
  }
  .Title {
    margin-bottom: 26px;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    .Form__Row {
      display: flex;
      justify-content: space-between;

      .FormField {
        width: calc(50% - 10px);
      }
    }
  }
}
</style>
