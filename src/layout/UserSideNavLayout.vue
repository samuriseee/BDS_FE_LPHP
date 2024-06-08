<template>
  <a-layout :style="{
    background: '#fff',
  }">
    <NavBar></NavBar>
    <div style="display: flex;">
      <PostManagementSidebar style="flex: 0 0 30%"/>
      <div style="flex: 1;">
        <transition name="fade">
          <slot></slot>
        </transition>
      </div>
    </div>
    <AppFooter></AppFooter>
  </a-layout>

</template>

<script>
import NavBar from './NavBar.vue'
import PostManagementSidebar from '../components/UserPageComponent/PostManagementSidebar.vue'
export default {
  name: 'AppLayout',
  components: {
    NavBar,
    PostManagementSidebar
  },
  data() {
    return {
      collapsed: false,
      fixedSideBar: false,
      theme: {
        mode: 'dark'
      },
    }
  }
}
</script>

<style scoped>

</style>