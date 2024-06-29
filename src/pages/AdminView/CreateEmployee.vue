<template>
  <el-form :model="user"
           label-width="120px"
           :style="{
             width: '100%',
           }"
  >
    <el-form-item label="Họ tên">
      <el-input v-model="user.ho_ten"></el-input>
      <div class="errorText" v-if="$v.user.ho_ten.$error">
        Họ và tên nhập lỗi
      </div>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="user.email"></el-input>
      <div class="errorText" v-if="$v.user.email.$error">Email nhập lỗi</div>
    </el-form-item>
    <el-form-item label="Số điện thoại">
      <el-input v-model="user.so_dien_thoai"></el-input>
      <div class="errorText" v-if="$v.user.so_dien_thoai.$error">
        Số điện thoại nhập lỗi
      </div>
    </el-form-item>
    <el-form-item label="Ngày sinh">
      <el-date-picker
        v-model="user.ngay_sinh"
        type="date"
        placeholder="Chọn ngày sinh"
      ></el-date-picker>
      <div v-if="$v.user.ngay_sinh.$error"
           class="errorText"
      >Ngày sinh nhập lỗi</div
      >
    </el-form-item>
    <el-form-item label="Mật khẩu">
      <el-input disabled v-model="user.mat_khau"></el-input>
    </el-form-item>
    <el-form-item label="Trạng thái">
      <el-switch v-model="user.trang_thai"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm"
      >{{ isEditing ? 'Cập nhật' : 'Tạo mới nhân viên'}}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { AdminService } from "@/services/admin.service";
export default {
  mixins: [validationMixin],
  data() {
    return {
      user: {
        ho_ten: "",
        email: "",
        so_dien_thoai: "",
        ngay_sinh: "",
        cccd: ("123456789" + Math.floor(Math.random() * 1000)).toString(),
        mat_khau: "123456",
        trang_thai: true,
        is_admin: false,
        is_employee: true,
      },
    };
  },
  props: {
    currentUser: {
      type: Object,
      default: () => [],
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    currentUser: {
      handler(newValue) {
        this.user = {
          ...newValue,
          mat_khau: "123456",
        };
      },
      immediate: true,
    },
  },
  validations: {
    user: {
      ho_ten: { required },
      email: { required, email },
      so_dien_thoai: { required, minLength: minLength(8) },
      ngay_sinh: { required },
    },
  },
  methods: {
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$message.error("Tạo nhân viên thất bại, vui lòng nhập đủ thông tin");
        return;
      }
      try {
        if (this.isEditing) {
          await AdminService.updateUser(this.currentUser.id, this.user);
          this.$message.success("Cập nhật nhân viên thành công");
          this.$emit("closeDialog");
          return;
        } else {
          await AdminService.createNewUser({
            ...this.user,
            cccd: ("123456789" + Math.floor(Math.random() * 1000)).toString(),
            mat_khau: "123456",
            is_admin: false,
            is_employee: true,
          });
        }
        this.$message.success("Tạo nhân viên thành công");
        this.$emit("closeDialog");
        return;
      } catch (error) {
        this.$message.error("Tạo nhân viên thất bại");
      }
    },
  },
};
</script>

<style scoped>
.errorText {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}
</style>
