<template>
  <a-layout
    :style="{
      background: '#fff',
    }"
  >
    <NavBar></NavBar>
    <div>
      <slot></slot>
    </div>
    <a-layout-footer>
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
export default {
  name: "HomeLayout",
  components: {
    NavBar,
    Footer,
  },
};
</script>
