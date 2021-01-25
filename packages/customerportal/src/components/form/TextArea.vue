<script lang="ts">
import { Prop, Component } from "vue-property-decorator";
import { FormField } from "@fundermaps/common";

@Component
export default class TextArea extends FormField {
  /**
   * The type of form field
   */
  @Prop({ default: "textarea" }) readonly type!: string;
}
</script>
