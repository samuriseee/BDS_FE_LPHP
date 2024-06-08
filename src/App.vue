<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "App",
    methods: {
    ...mapActions(["getCurrentUserInfo"]),
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUserInfo(token);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    max-height: 30px;
    border-radius: 10px;
  background: #b4b4b4;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
