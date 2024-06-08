<template>
  <div class="wrapper">
    <div class="container1">
      <div class="imageBox">
        <img class="logo" src="@/assets/image/logo.png" alt="" />
        <img class="person" src="@/assets/image/dangnhap.png" alt="" />
        <h4>Tìm nhà đất</h4>
        <h4>batdongsan.com.vn dẫn lối</h4>
      </div>
      <a-form @submit.prevent="onSubmit">
        <h3>
          Xin chào <span class="username">{{ userInfo.HoTen }}</span> <br />
          Đặt lại mật khẩu của bạn tại đây
        </h3>
        <a-form-item >
          <a-input
            type="password"
            class="form-control"
            placeholder="Nhập password mới"
            v-model="resetPassUser.newPassword"
            :class="{ invalid: $v.resetPassUser.newPassword.$error }"
          />
          <div class="errorText" v-if="$v.resetPassUser.newPassword.$error">
            Password nhập lỗi
          </div>
        </a-form-item>
        <a-form-item >
          <a-input
            type="password"
            class="form-control"
            placeholder="Xác nhận password mới"
            v-model="resetPassUser.confirmPassword"
            :class="{ invalid: $v.resetPassUser.confirmPassword.$error }"
          />
          <div class="errorText" v-if="$v.resetPassUser.confirmPassword.$error">
            Không trùng khớp với password ở trên
          </div>
        </a-form-item>
        <button type="submit" class="loginButton">Đổi mật khẩu</button>
        <h6 style="margin-top: 10px">
          Bạn đã có tài khoản?
          <router-link
            style="text-decoration: underline; color: red"
            to="/login"
          >Đăng nhập</router-link
          >
        </h6>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, sameAs } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  name: "ResetPasswordView",
  mixins: [validationMixin],
  data() {
    return {
      param_token: this.$route.params.token,
      userInfo: null,
      resetPassUser: {
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  validations: {
    resetPassUser: {
      newPassword: {
        required,
      },
      confirmPassword: {
        sameAsPassword: sameAs("newPassword"),
      },
    },
  },
  created() {
    this.getUserTokenInfo(this.param_token);
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.resetPassword();
      }
    },
    async getUserTokenInfo(token) {
      const API = `http://localhost:8000/auth/currentUser`;
      if (!token) return;
      try {
        const response = await axios.get(API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.userInfo = response.data.user;
      } catch (error) {
        console.error(error);
      }
    },
    resetPassword() {
      const API = `http://localhost:8000/auth/resetPassword`;
      const { newPassword } = this.resetPassUser;
      const { Email } = this.userInfo;
      axios
        .post(API, {
          Email,
          newPassword,
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@import '../../assets/css/sharedCssLoginRes.css';
.username {
  color: #d70000;
  font-weight: bold;
}
</style>