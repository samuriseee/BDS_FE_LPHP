<template>
  <div class="app-container">
    <h1 class="header-title">Thống Kê</h1>
    <div class="header">
      <a-card
        title="Số người dùng hoạt động"
        :bordered="false"
        class="stat-card"
      >
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
            marginLeft: '20px',
          }"
        >
          {{ getIsEmployee.length }}
        </h1>
      </a-card>
      <a-card title="Số người dùng vi phạm" :bordered="false" class="stat-card">
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
            marginLeft: '20px',
          }"
        >
          {{ getIsDeactivated.length }}
        </h1>
      </a-card>
      <a-card
        title="Số nhân viên hoạt động"
        :bordered="false"
        class="stat-card"
      >
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
            marginLeft: '20px',
          }"
        >
          {{ getIsEmployee.length }}
        </h1>
      </a-card>
      <a-card title="Số bài đăng BĐS" :bordered="false" class="stat-card">
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
            marginLeft: '20px',
          }"
        >
          {{ totalRecords || 0 }}
        </h1>
      </a-card>
    </div>
    <div class="body">
     <a-card
        title="Biểu đồ tỷ lệ loại bất động sản"
        :bordered="false"
        class="stat-card"
      >
        <PieChartGenerator
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="'pie-chart'"
          borderWidth="13"
        />
      </a-card>
      <a-card
        title="Biểu đồ giá bất động sản theo thời gian"
        :bordered="false"
        class="stat-card"
      >
        <LineChartGenerator
          :chart-options="lineChartOptions"
          :chart-data="lineChartData"
          :chart-id="'line-chart'"
          borderWidth="13"
        />
      </a-card>
      <a-card
        title="Biểu đồ số lượng bất động sản theo loại"
        :bordered="false"
        class="stat-card"
      >
        <BarChartGenerator
          :chart-options="barChartOptions"
          :chart-data="barChartData"
          :chart-id="'bar-chart'"
          borderWidth="13"
        />
      </a-card>
    </div>
  </div>
</template>

<script>
import { AdminService } from "@/services/admin.service";
import { RealEstateService } from "@/services/real_estate.service";
import { Pie as PieChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    PieChartGenerator,
  },
  data() {
    return {
      allUsers: [],
      allRealEstate: [],
      chartData: {
        labels: ["Nhà", "Đất", "Căn hộ", "Văn phòng", "Kho xưởng"],
        datasets: [{
          data: [300, 50, 100, 40, 120],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB']
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Biểu đồ tỷ lệ loại bất động sản",
        },
      },
      lineChartData: {
        labels: ["Q1/23", "Q2/23", "Q3/23", "Q4/23"],
        datasets: [
          {
            label: "Giá cao nhất",
            backgroundColor: "#C2C2C2",
            borderColor: "#C2C2C2",
            data: [40, 41, 42, 43],
            fill: false,
          },
          {
            label: "Giá phổ biến nhất",
            backgroundColor: "#f87979",
            borderColor: "#f87979",
            data: [30, 31, 32, 34],
            fill: false,
          },
          {
            label: "Giá thấp nhất",
            backgroundColor: "#009BA1",
            borderColor: "#009BA1",
            data: [25, 25, 25, 26],
            fill: false,
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Biểu đồ giá bất động sản theo thời gian",
        },
      },
      barChartData: {
        labels: ["Nhà ở", "Căn hộ", "Đất nền", "Biệt thự"],
        datasets: [
          {
            label: "Số lượng",
            backgroundColor: ['#f87979', '#C2C2C2', '#009BA1', '#FFCE56'],
            data: [50, 30, 20, 10],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Biểu đồ số lượng bất động sản theo loại",
        },
      },
    };
  },
  computed: {
    getIsEmployee() {
      return this.allUsers.filter((user) => user.isEmployee);
    },
    getIsDeactivated() {
      return this.allUsers.filter((user) => user.isDeactivated);
    },
    formatNumber() {
      return (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    },
  },
  created() {
    this.getAllUsers();
    this.getAllRealEstates();
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
    getAllRealEstates() {
      RealEstateService.getAllRealEstates({
        offset: 0,
        limit: 1000,
      })
        .then((response) => {
          this.allRealEstate = response;
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
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

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  text-align: left;
  margin-bottom: 20px;
}

.header {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.stat-card .ant-card-head-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.stat-card .ant-card-body {
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
}

.chart-title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: #2c2c2c;
  text-align: left;
  margin-bottom: 10px;
}
</style>
