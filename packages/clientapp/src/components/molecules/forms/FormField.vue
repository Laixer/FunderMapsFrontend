<template>
  <b-form-group class="FormField" :state="state">
    <!-- :label="label" -->
    <template #label>
      <span>{{ label }}</span>
      <span v-if="hasInfo" class="info ml-1" @click="openInfo">
        <img style="margin-top: -2px; cursor: pointer" :src="icon('info-circle-light.svg')" width="16" height="16" />
      </span>
    </template>

    <b-form-select
      v-if="type === 'select'"
      v-model="fieldValue"
      :options="options"
      :state="state"
      :disabled="isDisabled"
      @input="handleInput"
      @blur="handleBlur"
    />

    <div v-else-if="type === 'radio' && options.length === 2" class="FormField--choice d-flex align-items-center w-100">
      <b-form-radio
        v-model="fieldValue"
        class="check"
        :state="state"
        :disabled="isDisabled"
        :value="options[0].value"
        @input="handleInput"
        @blur="handleBlur"
      >
        {{ options[0].text }}
      </b-form-radio>
      <b-form-radio
        v-model="fieldValue"
        class="ml-3 none"
        :state="state"
        :disabled="isDisabled"
        :value="options[1].value"
        @input="handleInput"
        @blur="handleBlur"
      >
        {{ options[1].text }}
      </b-form-radio>
    </div>

    <b-form-radio-group
      v-else-if="type === 'radio'"
      v-model="fieldValue"
      :options="options"
      :state="state"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
      @input="handleInput"
      @blur="handleBlur"
    ></b-form-radio-group>

    <!-- <v-date-picker
      locale="nl"
      :popover="{ visibility: 'click' }"
      v-else-if="type === 'datepicker'"
      @input="handleDatepickerInput"
      v-model="datepickerValue">
      <b-form-input
        v-model="fieldValue"
        type="text"
        :style="datepickerStyle"
        :state="state"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="isDisabled"
        @blur="handleDatepickerBlur"
        trim />
    </v-date-picker> -->

    <Datepicker
      v-else-if="type === 'datepicker'"
      :monday-first="true"
      :disabled="isDisabled"
      :language="nl"
      :input-class="state ? 'form-control is-valid' : 'form-control'"
      :value="fieldValue"
      :bootstrap-styling="true"
      @input="handleInput"
    ></Datepicker>

    <b-form-textarea
      v-else-if="type === 'textarea'"
      v-model="fieldValue"
      :state="state"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="isDisabled"
      :rows="rows"
      trim
      @input="handleInput"
      @blur="handleBlur"
    ></b-form-textarea>

    <b-form-file
      v-else-if="type === 'upload'"
      v-model="fieldValue"
      :state="state"
      :accept="accept"
      :browse-text="browseLabel"
      :placeholder="placeholder || 'Choose a file...'"
      :disabled="isDisabled"
      :drop-placeholder="dropInPlaceholder"
      @input="handleInput"
      @blur="handleBlur"
    ></b-form-file>

    <!-- TODO: Hide the listview if no items exist -->
    <vue-typeahead-bootstrap
      v-else-if="type === 'typeahead'"
      ref="typeahead"
      v-model="fieldValue"
      :prepend="prepend"
      :append="append"
      :state="state"
      :serializer="serializer"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :data="data"
      trim
      @input="handleInput"
      @blur="handleBlur"
      @hit="handleHit"
    ></vue-typeahead-bootstrap>

    <b-input-group v-else :prepend="prepend" :append="append">
      <b-form-input
        v-model="fieldValue"
        :type="type"
        :state="state"
        :accept="accept"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="isDisabled"
        trim
        @input="handleInput"
        @blur="handleBlur"
      />
    </b-input-group>

    <template slot="invalid-feedback">
      {{ invalidFeedback }}
    </template>
  </b-form-group>
</template>

<script>
import { validationMixin } from "vuelidate";
import { icon } from "@/helpers/assets";

// TODO: https://github.com/charliekassel/vuejs-datepicker
// TODO: https://vue-multiselect.js.org

import Datepicker from "vuejs-datepicker";
import { nl } from "vuejs-datepicker/dist/locale";

export default {
  name: "FormField",
  components: { Datepicker },
  mixins: [validationMixin],
  inject: ["registerFormField"],
  props: {
    value: {
      type: [String, Boolean, Number, Date, File],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Field is always disabled
     */
    permaDisabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    placeholder: {
      type: String,
      default: ""
    },
    validationRules: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // Makes it possible to disable validation
    novalidate: {
      type: Boolean,
      default: false
    },
    // Used by `type === select & radio`
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // Used by `type === typeahead`
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    serializer: {
      type: Function,
      default: d => d
    },
    // Used by `type === text`
    append: {
      type: String,
      default: ""
    },
    prepend: {
      type: String,
      default: ""
    },
    // Used by `type === textarea`
    rows: {
      type: Number,
      default: 5
    },
    // Used by `type === upload`
    browseLabel: {
      type: String,
      default: "Browse"
    },
    dropInPlaceholder: {
      type: String,
      default: "Drop file here..."
    },
    accept: {
      type: String,
      default: null
    },
    // Info icon in label
    info: {
      type: String,
      default: null
    },
    infoHeader: {
      type: String,
      default: null
    },
    infoHTML: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fieldValue: "",
      blurred: false,
      nl // Datepicker translation object
    };
  },
  computed: {
    state() {
      if (this.novalidate) {
        return null;
      }
      return this.$v.fieldValue.$dirty ? !this.$v.fieldValue.$error : null;
    },
    isDisabled() {
      return this.disabled || this.permaDisabled;
    },
    invalidFeedback() {
      const validator = this.$v.fieldValue;

      // Go over the validation rules, and return the
      // name of the first rule that is broken
      const match = Object.keys(this.validationRules).find(rule => !validator[rule]);
      if (match === -1) {
        return ""; // apparently no rules are broken?
      }

      const params = validator.$params;

      switch (match) {
        case "email":
          return "Voer a.u.b. een geldig e-mail adres in";
        case "required":
          return "Dit is een vereist veld";
        case "minLength":
          return "Uw invoer moet minimaal " + params.minLength.min + " karakters zijn.";
        case "maxLength":
          return "Uw invoer mag maximaal " + params.maxLength.max + " karakters zijn.";
        case "combinedHundred":
          return "De verdeling moet samen uit komen op 100%";
      }

      return "Controleer uw invoer a.u.b.";
    },
    hasInfo() {
      return this.info;
    }
  },
  watch: {
    /**
     * Observe changes to the value prop
     */
    value(newValue) {
      this.fieldValue = newValue;
    }
  },
  mounted() {
    // NOTE: Workaround. Cannot set value on typeahead via interface
    if (this.$refs.typeahead) {
      this.$refs.typeahead.inputValue = this.fieldValue;
    }
  },
  created() {
    // On creation, set the internal field value
    this.fieldValue = this.value;

    // If no value was passed, and this is a datepicker, default to today
    if (this.type === "datepicker" && !this.value) {
      this.$emit("input", new Date());
      this.resetValidation();
    }

    // If contained within a Form component, register the form field
    if (this.registerFormField) {
      this.registerFormField(this);
    }
  },
  /**
   * Vuelidate validation rules. Set through the validationRules prop
   */
  validations() {
    return this.validationRules ? { fieldValue: this.validationRules } : {};
  },
  methods: {
    /**
     * Info modal
     */
    icon,
    openInfo() {
      this.openModal({
        title: this.infoHeader,
        content: this.infoHTML
          ? this.$createElement("div", {
              domProps: {
                innerHTML: this.info
              }
            })
          : this.info
      });
    },
    openModal({ title, content }) {
      this.$bvModal.msgBoxOk(content, {
        title,
        okVariant: "secondary",
        headerClass: "pl-5",
        bodyClass: "pr-5 pl-5 pt-4 pb-4"
      });
    },

    // Start validation after initial blur
    handleBlur() {
      if (this.blurred === false) {
        this.validate();
      }
      this.blurred = true;
    },
    handleInput(value) {
      if (this.blurred || this.type === "select") {
        this.validate();
      }
      this.$emit("input", value);
    },
    handleHit(value) {
      this.$emit("hit", value);
    },
    validate() {
      if (!this.novalidate) {
        this.$v.$touch();
      }
    },
    isValid() {
      // Not ideal, but otherwise form processing would cancel
      return this.novalidate ? true : !!this.state;
    },
    resetValidation() {
      this.$v.$reset();
    }
  }
};
</script>

<style lang="scss">
.FormField {
  font-size: 16px;
  position: relative;

  input {
    color: rgba(53, 64, 82, 0.5);
  }
  input:disabled {
    color: #495057 !important;
  }

  label,
  legend {
    color: #7f8fa4;
    text-transform: uppercase;
    padding-bottom: 0;
  }

  // .invalid-feedback {
  //   position: absolute;
  //   top: -1.75rem;
  //   text-align: right;
  // }

  &--choice {
    height: 33px;

    .custom-control-input:checked ~ .custom-control-label::before {
      border-color: transparent;
      background-color: transparent;
    }
    .custom-radio.check .custom-control-input:checked ~ .custom-control-label::after {
      background-color: white;
      background-image: url("../../../assets/icons/Check-icon.svg");
      background-size: cover;
    }
    .custom-radio.none .custom-control-input:checked ~ .custom-control-label::after {
      background-color: white;
      background-image: url("../../../assets/icons/None-icon.svg");
      background-size: cover;
    }
  }

  .vdp-datepicker {
    .form-control[readonly] {
      background-color: #fff;
    }
    &__calendar,
    .cell:hover,
    .selected {
      border-radius: 0.25rem;
    }
  }
}
</style>
