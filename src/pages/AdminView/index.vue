<template>
  <AdminLayout>
    <router-view></router-view>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout.vue";

export default {
    name: "AdminView",
    components: {
        AdminLayout,
    },
};
</script>