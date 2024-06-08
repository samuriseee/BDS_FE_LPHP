<template>
  <a-layout :style="{
    background: '#fff',
  }">
    <NavBar></NavBar>
    <div class="wrapper">
      <!-- <transition name="fade">
        <router-view></router-view>
      </transition> -->
      <slot></slot>
    </div>
  </a-layout>

</template>

<script>
import NavBar from './NavBar.vue'

export default {
  name: 'CommonLayout',
  components: {
    NavBar
  }
}
</script>
