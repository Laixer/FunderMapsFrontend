<template>
  <div class="Title" :class="{ 'Title--center': center }">
    <h1>
      <slot>{{ title }}</slot>
    </h1>
    <slot name="subtitle">
      <p v-if="subtitle">{{ subtitle }}</p>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
  componens: {},
  props: {
    // The title / label text
    title: {
      type: String,
      required: true,
      default: ""
    },
    // Some titles have subtitles / instructions
    subtitle: {
      type: String,
      default: ""
    },
    // Whether to center the text
    center: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss">
.Title {
  color: #202122;

  h1 {
    font-size: 24px;
    line-height: 1.25;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  &--center {
    text-align: center;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 32px;
  }
}
</style>
