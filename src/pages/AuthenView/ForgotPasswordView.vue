<template>
  <CommonLayout>
    <div class="wrapper">
      <div class="container1">
        <div class="imageBox">
          <img class="logo" src="@/assets/image/CityAHomes.vn-1.png" alt="" />
          <img class="person" src="@/assets/image/dangnhap.png" alt="" />
          <h4>Tìm nhà đất</h4>
          <h4>batdongsan.com.vn dẫn lối</h4>
        </div>
        <form @submit.prevent="onSubmit">
          <h3>Khoi phuc mat khau</h3>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập email"
              v-model="forgotPasswordUser.email"
              :class="{ invalid: $v.forgotPasswordUser.email.$error }"
            />
            <div class="errorText" v-if="$v.forgotPasswordUser.email.$error">
              Email nhập lỗi
            </div>
          </div>
          <button type="submit" class="loginButton">Gui</button>
          <h6 style="margin-top: 10px">
            Bạn đã có tài khoản?
            <router-link
              style="text-decoration: underline; color: red"
              to="/login"
            >Đăng nhập</router-link
            >
          </h6>
        </form>
      </div>
    </div>
  </CommonLayout>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import CommonLayout from "@/layout/CommonLayout.vue";

export default {
  name: "ForgotPasswordView",
  mixins: [validationMixin],
    components: {
    CommonLayout,
  },
  data() {
    return {
      forgotPasswordUser: {
        email: "",
      },
    };
  },
  validations: {
    forgotPasswordUser: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.forgotPassword();
      }
    },
    async forgotPassword() {
      // const API = `${process.env.VUE_APP_API}/auth/forgot-password`;
      // alert(this.forgotPasswordUser.email);
      // try {
      //   const response = await axios.post(API, this.forgotPasswordUser);
      //   alert(response.data.message);
      //   this.$router.push("/login");
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
};
</script>

<style scoped>
@import '../../assets/css/sharedCssLoginRes.css';
</style>