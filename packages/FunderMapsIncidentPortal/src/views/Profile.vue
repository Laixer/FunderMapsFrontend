<template>
  <Page :step="8" :steps="8" class="Profile">
    
    <div class="Profile__Wrapper">
      <Title :center="true" subtitle="Is niet verplicht">
        Uw gegevens
      </Title>
      
      <Form :busy="busy">
        <div class="Form__Row">
          <FormField v-model="questionData.FirstName" label="Voornaam" id="voornaam" autocomplete="given-name" :valid="voornaamValid" @validate="handleVoornaamValidation" />
          <FormField v-model="questionData.LastName" label="Achternaam" id="achternaam" autocomplete="family-name" :valid="achternaamValid" @validate="handleAchternaamValidation" />
        </div>
        <FormField v-model="questionData.Email" label="E-mail" id="email" type="email" autocomplete="email" :valid="emailValid" @validate="handleEmailValidation" />
        <FormField v-model="questionData.PhoneNumber" label="Telefoonnummer" id="telefoon" type="tel" autocomplete="tel" placeholder="+31" :valid="telefoonValid" @validate="handleTelefoonValidation" />
        <TextArea v-model="questionData.Note" label="Toelichting" placeholder="Korte beschrijving" id="toelichting" :valid="toelichtingValid" @validate="handleToelichtingValidation" :rows="4" />
      </Form>
    </div>

    <template slot="footer">
      <Button :disabled="busy" :ghost="true" @click="handleNavigateBack">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>      
      <Button :disabled="!isValid"  @click="handleNavigate">
        <span>Versturen</span>
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
import TextArea from '@/components/form/TextArea.vue'

import * as EmailValidator from 'email-validator';

import axios from 'axios'

@Component({
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField, TextArea
  }
})
export default class Profile extends Vue {
  
  /**
   * Indicates the form is being submitted
   */
  private busy = false

  /**
   * Field values
   */
  private questionData: Record<string,string> = {
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'PhoneNumber': '',
    'Note': ''
  }

  /**
   * Validation state
   */
  private voornaamValid: boolean|null = true;
  private achternaamValid: boolean|null = true;
  private emailValid: boolean|null = true;
  private telefoonValid: boolean|null = true;
  private toelichtingValid: boolean|null = true;

  /**
   * Are all conditions met?
   */
  get isValid() {
    return this.voornaamValid 
      && this.achternaamValid 
      && this.emailValid 
      && this.telefoonValid 
      && this.toelichtingValid
  }

  /**
   * Load the previously stored profile data from the store
   */
  created() {
    Object.keys(this.questionData).forEach(key => {
      this.questionData[key] = this.$store.state[key]
    })
  }

  /**
   * Validation handlers
   */
  handleVoornaamValidation(value: string|number|boolean|Array<string>) {
    value = (value + '').trim(); // Hack: force into a string
    this.voornaamValid = value.length < 255; // TODO: Wat is het limiet? 
  }
  handleAchternaamValidation(value: string|number|boolean|Array<string>) {
    value = (value + '').trim(); // Hack: force into a string
    this.achternaamValid = value.length < 255; // TODO: Wat is het limiet? 
  }
  handleEmailValidation(value: string|number|boolean|Array<string>) {
    value = (value + '').trim(); // Hack: force into a string
    this.emailValid = value.length < 255 && (value.length === 0 || EmailValidator.validate(value)); // TODO: Wat is het limiet? 
  }
  handleTelefoonValidation(value: string|number|boolean|Array<string>) {
    value = (value + '').trim(); // Hack: force into a string
    this.telefoonValid = value.length < 20; // TODO: Wat is het limiet? 
  }
  handleToelichtingValidation(value: string|number|boolean|Array<string>) {
    value = (value + '').trim(); // Hack: force into a string
    this.toelichtingValid = value.length < 1000; // TODO: Wat is het limiet? 
  }

  /**
   * Handle navigation forward
   */
  handleNavigate() {
    if (! this.isValid || this.busy) return
      
    // TODO: Busy animation in button?
    this.busy = true;

    this.storeData()

    axios({
      method: 'POST',
      url: `${process.env.VUE_APP_API_HOST}/api/incident`,
      data: this.$store.getters.getIndicentRequestBody
    })
    .then(() => {
      this.busy = false
      this.$router.push({
        name: 'Finish'
      })
    })
    .catch(err => {
      // TODO: Handle error
      console.log(err)
    })
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {
    if (this.busy) return

    this.storeData()

    this.$router.push({ 
      name: 'Upload'
    })
  }

  /**
   * Go over the profile fields, and save only those fields that have valid input
   */
  storeData() {
    const validators = {
      'FirstName': this.voornaamValid,
      'LastName': this.achternaamValid,
      'Email': this.emailValid,
      'PhoneNumber': this.telefoonValid,
      'Note': this.toelichtingValid
    }

    Object
      .entries(validators)
      .filter((entry) => entry[1])
      .forEach((entry) => {
        this.$store.commit('updateState', {
          prop: entry[0],
          value: this.questionData[entry[0]]
        })
      })
  }
}
</script>


<style lang="scss">
.Profile {
  &__Wrapper {
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
  }
  .Title{
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