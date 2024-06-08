<template>
  <CommonLayout>
    <div class="wrapper">
      <div class="container1">
        <div class="imageBox">
          <img class="logo" src="@/assets/image/logo.png" alt="" />
          <img class="person" src="@/assets/image/dangnhap.png" alt="" />
          <h4>Tìm nhà đất</h4>
          <h4>batdongsan.com.vn dẫn lối</h4>
        </div>
        <form @submit.prevent="onSubmit" class="form-style">
          <h5>Xin chào bạn!</h5>
          <h3>Đăng ký để tiếp tục</h3>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              :class="{ invalid: $v.newUser.name.$error }"
              placeholder="Nhập họ và tên"
              v-model="newUser.name"
            />
            <div class="errorText" v-if="$v.newUser.name.$error">
              Họ và tên nhập lỗi
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập số điện thoại"
              v-model="newUser.phone"
              :class="{ invalid: $v.newUser.phone.$error }"
            />
            <div class="errorText" v-if="$v.newUser.phone.$error">
              Số điện thoại nhập lỗi
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập email"
              v-model="newUser.email"
              :class="{ invalid: $v.newUser.email.$error }"
            />
            <div class="errorText" v-if="$v.newUser.email.$error">
              Email nhập lỗi
            </div>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Nhập mật khẩu"
              v-model="newUser.password"
              :class="{ invalid: $v.newUser.password.$error }"
            />
            <div class="errorText" v-if="$v.newUser.password.$error">
              Password nhập lỗi
            </div>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Nhập lại mật khẩu"
              v-model="newUser.confirmPassword"
              :class="{ invalid: $v.newUser.confirmPassword.$error }"
            />
            <div class="errorText" v-if="$v.newUser.confirmPassword.$error">
              Vui lòng nhập mật khẩu đúng như phía trên
            </div>
          </div>
          <button type="submit" class="loginButton">Đăng ký</button>
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
import CommonLayout from "@/layout/CommonLayout.vue";
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { AuthService } from "@/services/auth2.service";
export default {
  name: "RegisterView",
  mixins: [validationMixin],
  components: {
    CommonLayout,
  },
  data() {
    return {
      newUser: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  validations: {
    newUser: {
      name: {
        required,
      },
      phone: {
        required,
        minLength: minLength(8),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.register();
      }
    },
    register() {
      AuthService.register({
        ho_ten: this.newUser.name,
        so_dien_thoai: this.newUser.phone,
        email: this.newUser.email,
        mat_khau: this.newUser.password,
      }).then((res) => {
        this.$notification.success({
        message: res.message,
      });
        this.$router.push("/login");
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
@import '../../assets/css/sharedCssLoginRes.css';
.form-style {
  padding: 20px;
}
</style>