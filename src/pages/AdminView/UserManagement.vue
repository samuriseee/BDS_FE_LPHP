<template>
  <div class="app-container">
    <h1
      :style="{
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '500',
        letterSpacing: '-0.2px',
        color: '#2C2C2C',
        display: 'block',
        textAlign: 'left',
        marginBottom: '10px',
      }"
    >
      Quản lý người dùng
    </h1>
    <a-table
      :columns="allColumns"
      :data-source="allUsers"
      row-key="id"
      :loading="listLoading"
    >
      <span slot="trang_thai" slot-scope="trang_thai">
        <a-tag v-if="trang_thai == true" color="green">Hoạt động</a-tag>
        <a-tag v-else color="red">Cảnh cáo vi phạm</a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          @click="handleViewDetail(record)"
          :style="{
            marginRight: '10px',
          }"
        >
          <i class="el-icon-s-operation"></i>
        </a-button>
        <a-button type="danger">
          <i class="el-icon-remove-outline"></i>
        </a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import { AdminService } from "@/services/admin.service";

export default {
  name: "UserManagement",
  data() {
    return {
      allUsers: [],
      listLoading: false,
      allColumns: [
        {
          dataIndex: "ho_ten",
          title: "Họ Tên",
          key: "ho_ten",
        },
        {
          dataIndex: "email",
          title: "Email",
          key: "email",
        },
        {
          dataIndex: "so_dien_thoai",
          title: "Số điện thoại",
          key: "so_dien_thoai",
        },
        {
          dataIndex: "trang_thai",
          title: "Trạng thái",
          slots: { title: "customTrangThai" },
          scopedSlots: { customRender: "trang_thai" },
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      this.loading = true;
      AdminService.getAllUsers()
        .then((response) => {
          this.allUsers = response;
          console.log("res", response);
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleViewDetail(record) {
      this.$router.push({
        name: "UserDetail",
        params: { id: record.id },
      });
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px;
  min-height: 100vh;
  font-family: "Lexend Medium", Roboto, Arial !important;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
}
</style>
