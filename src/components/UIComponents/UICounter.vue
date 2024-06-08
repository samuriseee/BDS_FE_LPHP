<template>
  <div class="container">
    <button @click="decrement">-</button>
    <p>{{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: "ACounter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    increment() {
      this.$emit("increment");
    },
    decrement() {
      this.$emit("decrement");
    },
  },
};
</script>

<style scoped>
.container {
  width: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
button {
  position: relative;
  height: 32px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  width: fit-content;
  background-color: rgb(153, 153, 153);
  padding: 8px;
  color: rgb(255, 255, 255);
  opacity: 0.4;
  border: none;
}
input {
  width: 50px;
  margin: 0 7px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  padding: 5px 12px 5px 11px;
  caret-color: rgb(0, 0, 0);
  color: rgb(44, 44, 44);
  outline: none;
  opacity: 1;
  font-size: 14px;
  font-family: Roboto;
  line-height: 20px;
}
</style>
