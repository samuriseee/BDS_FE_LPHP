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
      Quản lý Nhân Viên
    </h1>
    <div class="header">
      <el-button
        @click="getAllUsers()"
        :style="{
          marginBottom: '10px',
        }"
      >
        <i class="el-icon-refresh"></i> 
      </el-button>
      <el-button
        type="primary"
        @click="handleCreateUser"
        :style="{
          marginBottom: '10px',
        }"
      >
        <i class="el-icon-plus"></i> Thêm nhân viên
      </el-button>
    </div>
    <a-table
      :columns="allColumns"
      :data-source="getIsEmployee"
      row-key="id"
      :loading="listLoading"
    >
      <span slot="trang_thai" slot-scope="trang_thai">
        <a-tag v-if="trang_thai == true" color="green">Hoạt động</a-tag>
        <a-tag v-else color="red">Dừng hoạt động</a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          @click="handleEditUser(record)"
          :style="{
            marginRight: '10px',
          }"
        >
            Sửa thông tin
        </a-button>
        <a-popconfirm
          v-if="trang_thai == true"
          title="Xác nhận dừng hoạt động nhân viên này?"
          ok-text="Xác nhận"
          cancel-text="Không"
          @confirm="confirmDeactivate(record)"
          @cancel="()=>{}"
        >

          <el-button type="danger">Đánh dấu dừng hoạt động nhân viên</el-button>
        </a-popconfirm>
      </span>
    </a-table>

    <el-dialog
      title="Tạo nhân viên mới"
      :visible.sync="openDialog"
      width="30%"
      center
    >
      <CreateEmployee @close-dialog="closeDialog()" />
    </el-dialog>

    <el-dialog
      title="Sửa đổi thông tin nhân viên"
      :visible.sync="openEditDialog"
      width="30%"
      center
    >
      <CreateEmployee :currentUser="selectedEditUser" :isEditing="true" @close-dialog="closeDialog()" />
    </el-dialog>
  </div>
</template>

<script>
import { AdminService } from "@/services/admin.service";
import CreateEmployee from "@/pages/AdminView/CreateEmployee.vue";

export default {
  name: "UserManagement",
  components: {
    CreateEmployee,
  },
  data() {
    return {
      allUsers: [],
      listLoading: false,
      openDialog: false,
      openEditDialog: false,
      selectedEditUser: {},
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
          title: "Hành động",
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
    getIsEmployee() {
      return this.allUsers.filter((user) => user.is_employee);
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
    handleCreateUser() {
      this.openDialog = true;
    },
    handleEditUser(record) {
      this.selectedEditUser = record;
      this.openEditDialog = true;
    },
    closeDialog() {
      this.openDialog = false;
      this.openEditDialog = false;
      this.getAllUsers();
    },
    async confirmnReactivate(record) {
      try {
        await AdminService.updateUser(record.id, {
          ...record,
          trang_thai: true,
          mat_khau: '123456'
        });
        this.getAllUsers();
      } catch (error) {
        console.log(error);
      }
    },
    async confirmDeactivate(record) {
      try {
        await AdminService.updateUser(record.id, {
          ...record,
          trang_thai: false,
          mat_khau: '123456'
        });
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

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
