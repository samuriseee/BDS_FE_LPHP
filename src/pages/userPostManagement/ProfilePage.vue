<template>
  <div class="wrapper" style="padding: 20px; margin: 0 auto">
    <h1
      :style="{
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '500',
        letterSpacing: '-0.2px',
        color: '#2C2C2C',
        display: 'block',
        textAlign: 'center',
        marginBottom: '10px',
      }"
    >
      Cập nhật Thông tin cá nhân
    </h1>
    <el-card shadow="never">
      <el-form
        ref="form"
        :model="currentUser"
        label-width="120px"
        :label-position="'top'"
        :style="{
          padding: '20px',
          margin: '0 auto',
          maxWidth: '600px',
        }"
      >
        <el-form-item>
          <el-col :span="6">
            <a-avatar
              :size="70"
              :style="{
                backgroundColor: '#ffeceb',
                color: '#74150f',
                verticalAlign: 'middle',
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }"
              :theme="'light'"
            >
              {{ spliceUsernameToMakeAvatar }}
            </a-avatar>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button 
              :style="{
              background: '#e03c31',
            }" 
            size="small" 
            type="primary">Click to upload</el-button>
            </el-upload>
          </el-col>

          <el-col :span="11">
            <el-form-item label="Họ Tên">
              <el-input v-model="currentUser.ho_ten"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="Ngày sinh">
          <el-date-picker
            type="date"
            v-model="currentUser.ngay_sinh"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="currentUser.email"></el-input>
        </el-form-item>
        <el-form-item label="Số điện thoại">
          <el-input v-model="currentUser.so_dien_thoai"></el-input>
        </el-form-item>
        <el-form-item label="Địa chỉ">
          <el-input v-model="currentUser.dia_chi"></el-input>
        </el-form-item>
        <el-form-item label="Số căn cước công dân">
          <el-input v-model="currentUser.cccd"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :style="{
              background: '#e03c31',
            }"
            >Cập nhật thông tin cá nhân</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfilePage",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser"]),
    spliceUsernameToMakeAvatar() {
      if (this.currentUser) {
        return this.currentUser?.ho_ten.slice(0, 1).toUpperCase();
      }
      return "";
    },
    getUserFromStore() {
      if (this.currentUser) {
        return this.currentUser?.ho_ten;
      }
      return "";
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
