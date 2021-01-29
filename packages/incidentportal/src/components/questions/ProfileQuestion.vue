<template>
  <div class="Profile__Wrapper">
    <Title :center="true">Uw gegevens</Title>
    <BodyText
      :center="true"
      :italic="true"
      text="Uw persoonsgegevens worden vertrouwelijk behandeld en niet gedeeld met derden."
    />

    <Form :busy="busy" :on-submit="onSubmit">
      <div class="Form__Row">
        <FormField
          id="voornaam"
          v-model="firstName"
          label="Voornaam"
          autocomplete="given-name"
          :valid="isFirstNameValid"
        />
        <FormField
          id="achternaam"
          v-model="lastName"
          label="Achternaam"
          autocomplete="family-name"
          :valid="isLastNameValid"
        />
      </div>
      <FormField id="email" v-model="email" label="E-mail" type="email" autocomplete="email" :valid="isEmailValid" />
      <FormField
        id="telefoon"
        v-model="phoneNumber"
        label="Telefoonnummer"
        type="tel"
        :pattern="phoneRegex"
        autocomplete="tel"
        placeholder="+31"
        :valid="isPhoneNumberValid"
      />
      <TextArea
        id="toelichting"
        v-model="note"
        label="Toelichting"
        placeholder="Aanvullende informatie of beschrijving
      opnemen"
        :valid="isNoteValid"
        :rows="4"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import { Form, FormField, Title, TextArea } from "@fundermaps/common";

import * as EmailValidator from "email-validator";
import { computed, ComputedRef, defineComponent, ref, Ref } from "vue";
import form from "../../store/modules/form";

export default defineComponent({
  name: "ProfileQuestion",
  components: {
    Title,
    Form,
    FormField,
    TextArea
  },
  setup() {
    const address = ref(null);
    // Load the previously stored profile data from the store
    const firstName: Ref<string | null> = ref(form.firstName);
    const lastName: Ref<string | null> = ref(form.lastName);
    const email: Ref<string | null> = ref(form.email);
    const phoneNumber: Ref<string | null> = ref(form.phoneNumber);
    const note: Ref<string | null> = ref(form.note);

    const phoneRegex = /\d+$/;

    const isFirstNameValid: ComputedRef<boolean> = computed(() =>
      firstName.value ? firstName.value.length < 255 : true
    );

    const isLastNameValid: ComputedRef<boolean> = computed(() => (lastName.value ? lastName.value.length < 255 : true));
    const isEmailValid: ComputedRef<boolean> = computed(() =>
      email.value ? email.value.length < 255 && EmailValidator.validate(email.value) : true
    );

    const isPhoneNumberValid: ComputedRef<boolean> = computed(() =>
      phoneNumber.value
        ? phoneNumber.value !== null &&
          phoneNumber.value.length > 0 &&
          phoneNumber.value.length <= 16 &&
          phoneRegex.test(phoneNumber.value)
        : true
    );

    const isNoteValid: ComputedRef<boolean> = computed(() =>
      note.value ? note.value.length < 1000 && note.value.length > 0 : true
    );

    const isValid: ComputedRef<boolean> = computed(
      () =>
        isFirstNameValid.value &&
        isLastNameValid.value &&
        isEmailValid.value &&
        isPhoneNumberValid.value &&
        isNoteValid.value
    );

    function onSubmit(): void {
      form.setFirstname(firstName.value);
      form.setLastname(lastName.value);
      form.setEmail(email.value);
      form.setPhoneNumber(phoneNumber.value);
      form.setNote(note.value);
    }

    // provide(isValidKey, isValid);
    // provide(storeDataKey, storeData);

    return {
      firstName,
      lastName,
      email,
      phoneNumber,
      note,
      onSubmit,
      isValid,
      isFirstNameValid,
      isLastNameValid,
      isEmailValid,
      isPhoneNumberValid,
      isNoteValid,
      phoneRegex,
      address
    };
  }
});
</script>

<style lang="scss">
.Profile {
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
      padding: 20px 80px;
    }
    max-width: 550px;
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
