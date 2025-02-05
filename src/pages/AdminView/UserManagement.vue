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
      :data-source="onlyGetUsers"
      row-key="id"
      :loading="listLoading"
    >
      <span slot="trang_thai" slot-scope="trang_thai">
        <a-tag v-if="trang_thai == true" color="green">Hoạt động</a-tag>
        <a-tag v-else color="red">Cảnh cáo vi phạm</a-tag>
      </span>
      <span slot="action" slot-scope="text, record, trang_thai">
        <a-button
          type="primary"
          @click="handleViewUserDetail(record)"
          :style="{
            marginRight: '10px',
          }"
        >
          Xem thông tin
        </a-button>
        <a-popconfirm
          v-if="trang_thai == true"
          title="Xác nhận dừng hoạt động người dùng này?"
          ok-text="Xác nhận"
          cancel-text="Không"
          @confirm="confirmDeactivate(record)"
          @cancel="() => {}"
        >
          <el-button type="danger">Đánh dấu người dùng vi phạm</el-button>
        </a-popconfirm>
        <a-popconfirm
          v-if="!trang_thai"
          title="Xác nhận mở lại hoạt động người dùng này?"
          ok-text="Xác nhận"
          cancel-text="Không"
          @confirm="confirmDeactivate(record)"
          @cancel="() => {}"
        >
          <el-button type="danger">Mở hoạt động người dùng này</el-button>
        </a-popconfirm>
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
  computed: {
    onlyGetUsers() {
      return this.allUsers.filter(
        (user) => !user.is_admin && !user.is_employee
      );
    },
  },
  methods: {
    getAllUsers() {
      this.loading = true;
      AdminService.getAllUsers()
        .then((response) => {
          this.allUsers = response;
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleViewUserDetail(record) {
      this.$router.push(`/admin/user-management/${record.id}`);
    },
    async confirmDeactivate(record) {
      try {
        await AdminService.updateUser(record?.id, {
          ...record,
          mat_khau: record.mat_khau || "",
          trang_thai: !record.trang_thai,
        });
        this.getUserById(record.id);
        this.getAllUsers();
      } catch (error) {
        console.log(error);
      }
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
