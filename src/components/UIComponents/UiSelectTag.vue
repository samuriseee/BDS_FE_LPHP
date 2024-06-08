<template>
  <div class="tag" :class="{ active: isActive }" @click="toggleActive">
    <span>{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: this.active,
    };
  },
  watch: {
    active(value) {
      this.isActive = value;
    },
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style>
.tag {
  width: fit-content;
  color: rgb(44, 44, 44);
  padding: 6px 12px;
  border-radius: 40px;
  border: 0px;
  background: rgb(242, 242, 242);
  cursor: pointer;
  margin-right: 8px;
}

.tag.active {
  background: rgb(255, 236, 235);
  color: rgb(116, 21, 15);
}

</style>
