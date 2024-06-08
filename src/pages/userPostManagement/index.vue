<template>
  <UserSideNavLayout>
    <router-view></router-view>
  </UserSideNavLayout>
</template>

<script>
import UserSideNavLayout from "@/layout/UserSideNavLayout.vue";
export default {
  name: "UserPostManagement",
  components: {
    UserSideNavLayout,
  },
};
</script>
