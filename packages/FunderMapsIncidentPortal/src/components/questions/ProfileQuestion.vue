<template>
  <div class="Profile__Wrapper">
    <Title :center="true">Uw gegevens</Title>

    <Form :busy="busy">
      <div class="Form__Row">
        <FormField
          :value="this.firstName"
          label="Voornaam"
          id="voornaam"
          autocomplete="given-name"
          :valid="firstnameValid"
          @input="updateFirstname"
        />
        <FormField
          :value="this.lastName"
          label="Achternaam"
          id="achternaam"
          autocomplete="family-name"
          :valid="lastnameValid"
          @input="updateLastname"
        />
      </div>
      <FormField
        :value="this.email"
        label="E-mail"
        id="email"
        type="email"
        autocomplete="email"
        :valid="emailValid"
        @input="updateEmail"
      />
      <FormField
        :value="this.phoneNumber"
        label="Telefoonnummer"
        id="telefoon"
        type="tel"
        :pattern="this.phoneRegex"
        autocomplete="tel"
        placeholder="+31"
        :valid="phoneNumberValid"
        @input="updatePhonenumber"
      />
      <TextArea
        :value="this.note"
        label="Toelichting"
        placeholder="Korte beschrijving"
        id="toelichting"
        :valid="noteValid"
        :rows="4"
        @input="updateNote"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import FormField from '@/components/common/FormField.vue'
import TextArea from '@/components/form/TextArea.vue'

import * as EmailValidator from 'email-validator';

import axios from 'axios'

@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField, TextArea
  }
})

export default class ProfileQuestion extends Mixins(QuestionMixin) {
  private firstName: string | null = null
  private lastName: string | null = null
  private email: string | null = null
  private phoneNumber: string | null = null
  private note: string | null = null

  private phoneRegex = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/


  private get firstnameValid(): boolean | null {
    return this.firstName !== null
      && this.firstName.length < 255
      && this.firstName.length > 0
  }

  private get lastnameValid(): boolean {
    return this.lastName !== null
      && this.lastName.length < 255
      && this.lastName.length > 0
  }

  private get emailValid(): boolean {
    return this.email !== null
      && this.email.length < 255
      && this.email.length > 0
      && EmailValidator.validate(this.email)
  }

  private get phoneNumberValid(): boolean {
    return this.phoneNumber !== null
      && this.phoneNumber.length > 0
      && this.phoneRegex.test(this.phoneNumber)

  }

  private get noteValid(): boolean {
    return this.note !== null
      && this.note.length < 1000
      && this.note.length > 0
  }


  public get isValid(): boolean {
    const body = this.$store.getters.getIndicentRequestBody

    if (!body) {
      return false
    }

    return !!(
      body.Address
      && body.ClientId
    )
  }

  /**
   * Load the previously stored profile data from the store
   */
  created(): void {
    this.firstName = this.$store.state.firstName
    this.lastName = this.$store.state.lastName
    this.email = this.$store.state.email
    this.phoneNumber = this.$store.state.phoneNumber
    this.note = this.$store.state.note
  }

  public storeData(): void {
    this.$store.commit('updateState', [
      {
        key: 'firstName',
        value: this.firstName
      },
      {
        key: 'lastName',
        value: this.lastName
      },
      {
        key: 'email',
        value: this.email
      },
      {
        key: 'phoneNumber',
        value: this.phoneNumber
      },
      {
        key: 'note',
        value: this.note
      },
      {
        key: 'name',
        value: this.firstName ? `${this.firstName}${this.lastName ? ` ${this.lastName}` : ''} ` : null
      },
    ])
  }

  private updateFirstname(value: string): void {
    this.firstName = value
  }

  private updateLastname(value: string): void {
    this.lastName = value
  }

  private updateEmail(value: string): void {
    this.email = value
  }

  private updatePhonenumber(value: string): void {
    this.phoneNumber = value
  }

  private updateNote(value: string): void {
    this.note = value
  }
}
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