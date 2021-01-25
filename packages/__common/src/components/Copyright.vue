<template>
  <span class="Copyright">&copy; Copyright {{ new Date().getFullYear() }} {{ company }} • @@VERSION@@</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Copyright",
  props: {
    company: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss">
.Copyright {
  font-size: 12px;
  color: #606976;
}
</style>
