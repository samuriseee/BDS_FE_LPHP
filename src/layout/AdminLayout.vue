<template>
  <a-layout :style="{
    background: '#fff',
  }">
    <NavBar></NavBar>
    <div style="display: flex;">
      <AdminSidebar style="flex: 0 0 30%"/>
      <div style="flex: 1;">
        <transition name="fade">
          <slot></slot>
        </transition>
      </div>
    </div>
  </a-layout>

</template>

<script>
import NavBar from './NavBar.vue'
import AdminSidebar from '../components/AdminPageComponent/AdminSidebar.vue';

export default {
  name: 'AdminLayout',
  components: {
    NavBar,
    AdminSidebar
  }
}
</script>
