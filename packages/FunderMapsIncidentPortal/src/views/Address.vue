<template>
  <Page :step="1" :steps="9" class="Address">
    
    <div class="Address__Wrapper">
      <div class="Address--left">
        <Title>
          Melding maken voor het adres:
        </Title>
        
        <Form>

          <FormField label="Zoek het adres" id="address" :valid="valid" @validate="handleValidation" />
        </Form>

      </div>
      <!-- Replace with Mapbox / Google Map + position without borders: remove padding from wrapper + apply to left -->
      <img class="Address--right" src="../assets/home.jpg" width="640" />
    </div>

    <template slot="footer">
      <Button :disabled="!valid" :line="true" @click="handleNavigate">
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
import BodyText from '@/components/BodyText.vue'
import Copyright from '@/components/Copyright.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import FormField from '@/components/common/FormField.vue'


@Component({
  components: {
    Page, Button, SvgIcon, Copyright, Title, BodyText,
    Form, FormField
  }
})
export default class Address extends Vue {

  private valid: boolean|null = null;

  /**
   * 
   */
  handleValidation(value: string|number|boolean|Array<string>) {
    value = value + ''; // Hack: force into a string
    
    console.log(value)

    if (value.trim().length > 1) {
      this.valid = true
    } else {
      this.valid = false
    }
  }

  handleNavigate() {
    if (this.valid) {
      this.$router.push({
        name: 'Questions',
        params: {
          question: '1'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.Address {
  &__Wrapper {
    display: flex;
    max-width: 100%;
    justify-content: space-between;

    img {
      max-width: 640px;
    }
  }
  &--left {
    max-width: calc(100% - 720px);

    .Title, .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 24px;
    }
  }
}
</style>