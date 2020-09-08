<template>
  <footer class="Footer">
    <slot />
  </footer>
</template>

<style lang="scss">
.Footer {
  height: 98px;
  width: 100%;
  border-top: 1px solid #D4DAF0;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: center; 

  @media only screen and (min-width: $BREAKPOINT) {
    height: 115px;
    padding: 0 80px;
  }
}
</style>