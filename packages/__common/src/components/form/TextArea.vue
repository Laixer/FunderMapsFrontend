<script lang="ts">
import FormField from "./FormField.vue";
import { defineComponent } from "vue";

// TODO: rewrite, don't extend FormField
export default defineComponent({
  name: "TextArea",
  extends: FormField,
  props: {
    type: {
      type: String,
      default: "textarea"
    }
  }
});
</script>
