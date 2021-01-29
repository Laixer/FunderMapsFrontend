<template>
  <div class="Profile__Wrapper">
    <Title :center="true">Uw gegevens</Title>

    <Form :busy="busy">
      <div class="Form__Row">
        <FormField
          id="voornaam"
          :value="firstName"
          label="Voornaam"
          autocomplete="given-name"
          :valid="isFirstNameValid"
        />
        <FormField
          id="achternaam"
          :value="lastName"
          label="Achternaam"
          autocomplete="family-name"
          :valid="isLastNameValid"
        />
      </div>
      <FormField id="email" :value="email" label="E-mail" type="email" autocomplete="email" :valid="isEmailValid" />
    </Form>
  </div>
</template>

<script lang="ts">
import { Form, FormField, Title } from "@fundermaps/common";

import * as EmailValidator from "email-validator";
import { computed, ComputedRef, defineComponent, provide, ref, Ref } from "vue";
import { isValidKey, storeDataKey } from "./Question";
import form from "../../store/modules/form";

export default defineComponent({
  name: "ProfileQuestion",
  components: { Title, Form, FormField },
  setup() {
    // Load the previously stored profile data from the store
    const firstName: Ref<string | null> = ref(form.firstName);
    const lastName: Ref<string | null> = ref(form.lastName);
    const email: Ref<string | null> = ref(form.email);

    const isFirstNameValid: ComputedRef<boolean> = computed(
      () => (firstName.value && firstName.value.length < 255) || false
    );
    const isLastNameValid: ComputedRef<boolean> = computed(
      () => (lastName.value && lastName.value.length < 255) || false
    );
    const isEmailValid: ComputedRef<boolean> = computed(
      () => (email.value && email.value.length < 255 && EmailValidator.validate(email.value)) || false
    );

    const isValid: ComputedRef<boolean> = computed(
      () => (isEmailValid.value && isLastNameValid.value && isFirstNameValid.value) || false
    );

    function storeData(): void {
      form.setFirstname(firstName.value);
      form.setLastname(lastName.value);
      form.setEmail(email.value);
    }

    provide(isValidKey, isValid);
    provide(storeDataKey, storeData);

    return {
      firstName,
      lastName,
      email,
      isFirstNameValid,
      isLastNameValid,
      isEmailValid
    };
  }
});
</script>

<style lang="scss">
.Profile {
  &__Wrapper {
    padding: 20px 20px;

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
