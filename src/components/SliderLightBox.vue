<template>
  <div>
    <el-carousel indicator-position="outside" trigger="click" width="100%" height="500px">
      <el-carousel-item v-for="(image, key) in images" :key="key">
          <el-image class="image" 
          :src="image" 
          :style="{
            minHeight: '250px',
            height: '100%',
          }"></el-image>
      </el-carousel-item>
    </el-carousel>
    <ul class="list-inline">
      <li class="list-inline-item" v-for="(image, key) in images" :key="key">
        <el-tooltip
          class="item"
          effect="dark"
          content="Click to see fullscreen"
          placement="bottom"
        >
          <el-image
            class="image"
            :src="image"
            style="width: 100px; height: 100px"
            :key="image"
            :preview-src-list="images"
          ></el-image>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SliderLightBox",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lightboxVisible: false,
      lightboxIndex: 0,
    };
  },
  methods: {
    openLightbox(index) {
      this.lightboxIndex = index;
      this.lightboxVisible = true;
    },
  },
};
</script>

<style scoped>
.el-carousel {
  margin: 0 auto;
  width: 80%;
}

.list-inline {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 20px 0;
}

.list-inline-item {
  margin: 0 10px;
}

.list-inline-item .image {
  border: 2px solid transparent;
}

.list-inline-item.active .image {
  border: 2px solid #007bff;
}
</style>
