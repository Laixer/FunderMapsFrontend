<template>
  <div class="LoginForm">
    <h1 class="mb-5">Inloggen</h1>

    <Form id="myform" @submit="handleSubmit">
      <Feedback :feedback="feedback" />

      <FormField v-model="fields.email.value" v-bind="fields.email" />
      <FormField v-model="fields.password.value" v-bind="fields.password" class="mt-2" />

      <button
        type="submit"
        :disabled="isDisabled"
        class="btn btn-success btn-lg btn-block rounded-pill font-weight-bold border-0 mt-3 p-3"
      >
        Aanmelden
      </button>
    </Form>

    <div class="d-flex justify-content-center mt-5">
      <PasswordResetLink mailto="info@fundermaps.com" />
    </div>
  </div>
</template>

<script>
import { login, getLastUserEmail } from "@/services/auth";
import PasswordResetLink from "@/components/atoms/branding/PasswordResetLink.vue";

import { required, email } from "vuelidate/lib/validators";

import Feedback from "@/components/atoms/Feedback.vue";
import Form from "@/components/molecules/forms/Form.vue";
import FormField from "@/components/molecules/forms/FormField.vue";

import fields from "@/mixins/fields.js";

export default {
  name: "LoginForm",
  components: {
    PasswordResetLink,
    Feedback,
    Form,
    FormField
  },
  mixins: [fields],
  data() {
    return {
      feedback: {},
      isDisabled: false,
      fields: {
        email: {
          label: "E-mail",
          autocomplete: "username",
          type: "email",
          placeholder: "naam@bedrijf.nl",
          value: getLastUserEmail(),
          validationRules: {
            required,
            email
          },
          disabled: false
        },
        password: {
          label: "Wachtwoord",
          autocomplete: "current-password",
          type: "password",
          value: "",
          validationRules: {
            required
          },
          disabled: false
        }
      }
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      try {
        this.disableAllFields();
        this.isDisabled = true;
        this.feedback = {
          variant: "info",
          message: "Bezig met inloggen..."
        };
        await login(this.fieldValue("email"), this.fieldValue("password"));
        await this.$router.push({ name: "dashboard" });
      } catch (err) {
        // FUTURE: BUG: Cannot throw empty exception.
        if (typeof err == "undefined") {
          return;
        }
        this.enableAllFields();
        this.isDisabled = false;

        if (err.response && err.response.status === 401) {
          this.fields.password.value = null;
          this.feedback = {
            variant: "danger",
            message: "Uw inlog gegevens zijn ongeldig"
          };
        } else {
          this.feedback = {
            variant: "danger",
            message: "Onbekende fout. Probeer het later nog eens."
          };
        }
      }
    }
  }
};
</script>
