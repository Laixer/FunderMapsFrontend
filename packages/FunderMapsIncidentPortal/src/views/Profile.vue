<template>
  <Page :step="8" :steps="8" class="Profile">
    
    <div class="Profile__Wrapper">
      <Title :center="true" subtitle="Is niet verplicht">
        Uw gegevens
      </Title>
      
      <Form>
        <div class="Form__Row">
          <FormField label="Voornaam" id="voornaam" autocomplete="given-name" :valid="voornaamValid" @validate="handleVoornaamValidation" />
          <FormField label="Achternaam" id="achternaam" autocomplete="family-name" :valid="achternaamValid" @validate="handleAchternaamValidation" />
        </div>
        <FormField label="E-mail" id="email" type="email" autocomplete="email" :valid="emailValid" @validate="handleEmailValidation" />
        <FormField label="Telefoonnummer" id="telefoon" type="tel" autocomplete="tel" placeholder="+31" :valid="telefoonValid" @validate="handleTelefoonValidation" />
        <TextArea label="Toelichting" placeholder="Korte beschrijving" id="toelichting" :valid="toelichtingValid" @validate="handleToelichtingValidation" :rows="4" />
      </Form>

    </div>

    <template slot="footer">
      <Button :ghost="true" @click="handleNavigateBack">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>      
      <Button :disabled="!isValid"  @click="handleNavigate">
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
import TextArea from '@/components/form/TextArea.vue'

import * as EmailValidator from 'email-validator';

@Component({
  components: {
    Page, Button, Title, SvgIcon,
    Form, FormField, TextArea
  }
})
export default class Profile extends Vue {

  
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
   * 
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
    this.emailValid = value.length < 255 && EmailValidator.validate(value); // TODO: Wat is het limiet? 
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
    if (this.isValid) {
      this.$router.push({ 
        name: 'Finish'
      })
    }
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {
    this.$router.push({ 
      name: 'Upload'
    })
  }
}
</script>


<style lang="scss">
.Profile {
  &__Wrapper {
    max-width: 550px;
    width: 100%;
    margin: auto;
  }
  .Title{
    margin-bottom: 26px;
  }

  .Form__Row {
    display: flex;
    justify-content: space-between;

    .FormField {
      width: calc(50% - 10px);
    }
  }
}
</style>