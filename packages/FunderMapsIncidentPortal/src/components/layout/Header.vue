<template>
  <header class="Header">

    <router-link :to="{ name: 'Home' }">
      <img class="Header__Logo" src="../../assets/logo.png" />
    </router-link>
  </header>
</template>

<style lang="scss">
.Header {
  height: 115px;
  width: 100%;
  padding: 20px 80px;
  border-bottom: 1px solid #D4DAF0;

  display: flex;
  align-items: center;
  
  user-select: none;
}
</style>