<template>
  <div>
    <a-spin :spinning="loading" tip="Loading...">
      <input
        type="file"
        ref="fileInput"
        multiple
        accept="image/*"
        @change="handleFileUpload"
        class="hidden"
      />
      <div class="default" @click="openFileInput">
        <img src="@/assets/Icon/uploadFileIcon.svg" alt="" />
        <div>Bấm để chọn ảnh cần tải lên</div>
        <div>hoặc kéo thả ảnh vào đây</div>
      </div>
      <div v-if="imageUrls.length" class="image-preview">
        <div v-for="(url, index) in imageUrls" :key="index" class="image-frame">
          <div :style="{
            padding: '0px',
            position: 'relative',
          }">
            <el-image
              :style="{
                width: '250px',
                height: '200px',
                objectFit: 'cover',
              }"
              :src="url"
              :preview-src-list="imageUrls">
            </el-image>
            <el-button :style="{
                         top: '5px',
                         position: 'absolute',
                         right: '5px'

                       }"
                       @click="removeImage(index)"
                       icon="el-icon-close"
                       circle></el-button>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import axios from "axios";
import UiLinearLoading from "./progress-loaders/UiSpinnerWave.vue";
import { cloudinaryConfig } from "../../cloudinaryConfig";
export default {
  data() {
    return {
      imageUrls: [],
      loading: false,
    };
  },
  components: {
    UiLinearLoading,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.imageUrls = newValue;
      },
      immediate: true,
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileUpload(event) {
      this.loading = true;
      const files = Array.from(event.target.files);

      const uploaders = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset);
        return axios.post(cloudinaryConfig.apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      });
      const results = await Promise.all(uploaders);
      const urls = results.map((res) => res.data.secure_url);
      this.imageUrls.push(...urls);
      this.$emit("image-uploaded", this.imageUrls);
      this.loading = false;
    },
    removeImage(index) {
      this.imageUrls.splice(index, 1);
      this.$emit("image-uploaded", this.imageUrls);
    },
  },
};
</script>

  <style scoped>
.image-frame {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-preview {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.image-preview img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.default {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.file-input {
  position: relative;
  display: inline-block;
}

.hidden {
  position: absolute;
  left: -9999px;
}

.default {
  /* your default styles */
  cursor: pointer;
}
</style>
