<template>
  <p class="BodyText" :class="{ 'BodyText--center': center, 'BodyText--bold': bold }">
    <slot>{{ text }}</slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BodyText",
  componens: {},
  props: {
    // The text
    text: {
      type: String,
      required: true,
      default: ""
    },
    // Whether to center the text
    center: {
      type: Boolean,
      default: false
    },
    // Whether to make the text bol
    bold: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss">
.BodyText {
  color: #606976;
  font-size: 18px;
  line-height: 26px;
  margin: 0;
  padding: 0;

  max-width: 550px;

  &--center {
    text-align: center;
  }
  &--bold {
    font-weight: bold;
  }
}
</style>
