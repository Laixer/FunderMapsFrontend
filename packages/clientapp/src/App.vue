<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { refreshLogin } from "./services/auth";

import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  created(): void {
    console.log("Setting interval");
    setInterval(() => {
      refreshLogin();
    }, 60000 * 10);
  }
}
</script>

<style lang="scss">
@import "~@/style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
