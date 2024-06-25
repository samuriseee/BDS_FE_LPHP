<template>
  <CommonLayout>
    <div class="container1">
      <div class="imageBox">
        <img class="logo" src="@/assets/image/CityAHomes.vn-1.png" alt="" />
        <img class="person" src="@/assets/image/dangnhap.png" alt="" />
        <h4>Tìm nhà đất</h4>
        <h4>CityAHomes dẫn lối</h4>
      </div>
      <a-form @submit.prevent="onSubmit" class="loginForm">
        <h5>Xin chào bạn!</h5>
        <h3>Đăng nhập để tiếp tục</h3>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Nhập email"
            v-model="loginUser.email"
            :class="{ invalid: $v.loginUser.email.$error }"
          />
          <div class="errorText" v-if="$v.loginUser.email.$error">
            Email nhập lỗi
          </div>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Nhập mật khẩu"
            v-model="loginUser.password"
            :class="{ invalid: $v.loginUser.password.$error }"
          />
          <div class="errorText" v-if="$v.loginUser.password.$error">
            Password nhập lỗi
          </div>
        </div>
        <button type="submit" class="loginButton">Đăng nhập</button>
        <div
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }"
        >
          <router-link class="hyperlink"
                       to="/forgot-password"
          >Quên mật khẩu</router-link
          >
          <div>
            Chưa có tài khoản?
            <router-link class="hyperlink" to="/register">Đăng ký</router-link>
          </div>
        </div>
      </a-form>
    </div>
  </CommonLayout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import CommonLayout from "@/layout/CommonLayout.vue";
import { AuthService } from "@/services/auth2.service";

export default {
  name: "LoginView",
  mixins: [validationMixin],
  components: {
    CommonLayout,
  },
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      token: "",
    };
  },
  validations: {
    loginUser: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    is_admin() {
      return this.currentUser?.is_admin;
    },
  },
  methods: {
    ...mapActions(["getCurrentUserInfo"]),

    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },

    login() {
      AuthService.login({
        email: this.loginUser.email.trim(),
        mat_khau: this.loginUser.password,
      })
        .then((res) => {
          console.log(res);
          if (res.access_token) {
            localStorage.setItem("token", res.access_token);
            this.getCurrentUserInfo(res.access_token);
            this.$notification.success({
              message: "Đăng nhập thành công",
            });
            if (this.is_admin) {
              this.$router.push("/admin/dashboard");
            } else {
              this.$router.push("/");
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notification.error({
            message: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin",
          });
        });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/sharedCssLoginRes.css";
.loginForm {
  padding: 20px;
}
</style>
