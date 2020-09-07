<template>
  <p class="BodyText" :class="{ 'BodyText--center': center }">
    <slot>{{ text }}</slot>
  </p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BodyText extends Vue {
  /**
   * The text
   */
  @Prop({ default: '' }) readonly text!: string;
  /**
   * Whether to center the text
   */
  @Prop({ default: false }) readonly center!: boolean;
}
</script>


<style lang="scss">

.BodyText {
  color: #77808D;
  font-size: 18px;
  line-height: 26px;
  margin: 0;
  padding: 0;

  &--center {
    text-align: center;
  }
}

</style>