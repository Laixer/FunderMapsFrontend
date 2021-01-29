import { PropType } from "vue";
import { Option } from "../types/Option";
// TODO: Move
export const withFormFieldProps = () => {
  return {
    // The type of form field
    type: {
      type: String,
      default: "text"
    },
    pattern: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    // The field id
    id: {
      type: String,
      required: true
    },
    // The input label
    label: {
      type: String,
      default: ""
    },
    // The field value
    modelValue: {
      type: Object as PropType<null | string | boolean | number | Array<string | boolean | number>>,
      default: null
    },
    // The placeholder value
    placeholder: {
      type: String,
      default: ""
    },

    /******************************************
     * Field validation
     *******************************************/

    // The validation state. Initialized as null
    valid: {
      type: Object as PropType<boolean | null>,
      default: null
    },
    // The error message
    error: {
      type: String,
      default: ""
    },
    // Disables the validation process
    novalidate: {
      type: Boolean,
      default: false
    },

    /******************************************
     * Type specific props
     ******************************************/

    // The input label
    rows: {
      type: Number,
      default: 10
    },
    // The options list for select, radio & checkbox lists
    options: {
      type: Object as PropType<Array<Option>>,
      default: Array<Option>()
    },
    // The select type can support one or multiple answers
    multiple: {
      type: Boolean,
      default: false
    },

    /******************************************
     * State props
     ******************************************/

    // Whether the field is disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // Disables the browser's auto complete function
    autocomplete: {
      type: Object as PropType<boolean | string>,
      default: false
    }
  };
};
