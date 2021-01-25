<template>
  <div v-if="show" class="Feedback" :class="classList" role="alert">
    <SvgIcon v-if="icon" class="Feedback__Icon" :icon="icon" />
    <span>{{ message }}</span>

    <button type="button" class="Feedback__Close" aria-label="Close" @click="hideFeedback">
      <span aria-hidden="true">
        <SvgIcon icon="icon_error" />
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import SvgIcon from "./SvgIcon.vue";
import { defineComponent, PropType, ref, computed, watch } from "vue";

// Based on https://getbootstrap.com/docs/4.0/components/alerts/#dismissing
export default defineComponent({
  name: "Feedback",
  components: { SvgIcon },
  props: {
    // This input is processed by `processFeedback`
    feedback: {
      type: Object as PropType<{ message: string; variant: string; show: boolean }>,
      required: true
    }
  },
  setup(props: { feedback: { message: string; variant: string; show: boolean } }) {
    // The processed data, which is bound to the template
    const show = ref<boolean>(false);
    const variant = ref<string>("info");
    const message = ref<string>("");
    const fade = ref<boolean>(false);

    const icon = computed((): string => {
      switch (variant.value) {
        case "info":
          return "icon_info";
        case "error":
        case "warning":
        case "danger":
          return "icon_warning";
        case "success":
          return "icon_check_circle";
      }
      return "";
    });

    const classList = computed(
      (): Record<string, boolean> => {
        const v = `Feedback--${variant.value}`;
        return {
          "Feedback--has-icon": icon.value !== "",
          "Feedback--fade": fade.value,
          v: true
        };
      }
    );

    // Set the bound values based on the feedback input
    const processFeedback = (feedback: { message: string; variant: string; show: boolean }) => {
      if (feedback.variant) {
        variant.value = feedback.variant;
      }
      if (feedback.message) {
        message.value = feedback.message;
      }
      // If the message or variant is changed, we assume it should be visible
      if (feedback.variant || feedback.message) {
        show.value = true;
      }
      // The above assumption can be overwritten by explicitly passing a value
      if (feedback.show) {
        show.value = feedback.show;
      }
    };

    // These two methods allow programmatic access through a `ref` binding
    const hideFeedback = () => {
      if (fade.value !== true) {
        setTimeout(() => {
          show.value = false;
        }, 150);
      }
      fade.value = true;
    };

    const showFeedback = (_variant: string, _message: string) => {
      variant.value = _variant;
      message.value = _message;
      fade.value = false;
      show.value = true;
    };

    // When the feedback prop is updated, the input object is evaluated
    // and the bound data updated accordingly.
    watch(
      () => props.feedback,
      feedback => {
        processFeedback(feedback);
      }
    );

    processFeedback(props.feedback);

    return {
      show,
      variant,
      message,
      fade,
      icon,
      classList,
      hideFeedback,
      showFeedback
    };
  }
});
</script>

<style lang="scss">
.Feedback {
  position: relative;
  padding: 0.75rem 4rem 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  opacity: 1;
  transition: opacity 0.15s linear;

  &--fade {
    opacity: 0;
  }

  &--has-icon {
    padding-left: 4rem;
  }

  &--danger {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  &--success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &--info {
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }

  &__Icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.75rem 1.25rem;
  }

  &__Close {
    float: right;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;

    background-color: transparent;
    border: 0;
    -webkit-appearance: none;

    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75rem 1.25rem;
    color: inherit;

    cursor: pointer;
  }
}
</style>
