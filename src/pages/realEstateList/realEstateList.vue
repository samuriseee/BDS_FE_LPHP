<template>
  <CommonLayout>
    <a-layout
      :style="{
        width: '90%',
        margin: '0 auto',
        background: 'transparent',
      }"
    >
      <a-layout-header
        :style="{
          background: 'transparent',
          padding: '16px',
          height: 'auto',
        }"
      >
        <a-input-search
          placeholder="Trên toàn quốc"
          size="large"

        >
          <a-button
            slot="enterButton"
            :style="{
              background: '#e03c31',
              color: 'white',
              border: 'none',
              fontWeight: 'bold',
            }"
          >
            Tìm kiếm
          </a-button>
        </a-input-search>
        <!-- <div
          :style="{
            display: 'flex',
          }"
        >
          <a-select
            mode="multiple"
            :style="{
              minWidth: '200px',
              maxWidth: '350px',
              overflow: 'hidden',
            }"
            placeholder="Loại Bất động sản"
            
            @change="handleChange"
          >
            <a-select-option v-for="item in allBuyTypes" :key="item">
              {{ item.LoaiBDS }}
            </a-select-option>
          </a-select>
        </div> -->
      </a-layout-header>
      <a-layout :style="{
        background: 'transparent'
      }">
        <a-layout-content>
          <a-row>
            <a-col v-for="estate in realEstatesByParams" :key="estate.id">
              <EstateCardOnListPage
                :estate="estate"
                @goToEstateDetails="goToEstateDetails"
              />
            </a-col>
          </a-row>
        </a-layout-content>
        <a-layout-sider
          :style="{
            background: 'transparent',
          }"
        >
          <a-card
            :style="{
              border: '1px solid #f2f2f2',
              borderRadius: '8px',
              marginBottom: '16px',
            }"
          >
            <a-list item-layout="horizontal" :data-source="filterCateByPrice">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item.label }}
              </a-list-item>
            </a-list>
          </a-card>

          <a-card
            :style="{
              border: '1px solid #f2f2f2',
              borderRadius: '8px',
              marginBottom: '16px',
            }"
          >
            <a-list item-layout="horizontal" :data-source="filterCateByArea">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item.label }}
              </a-list-item>
            </a-list>
          </a-card>
        </a-layout-sider>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </CommonLayout>
</template>

<script>
import CommonLayout from "@/layout/CommonLayout.vue";
import SearchBarOnEstateList from "@/components/UserPageComponent/SearchBarOnEstateList.vue";
import { RealEstateService } from "@/services/real_estate.service";
import EstateCardOnListPage from "@/components/UserPageComponent/EstateCardOnListPage.vue";
import { mapGetters } from "vuex/dist/vuex.common";
import { RealEstatePostStatus } from "@/constants/index";

export default {
  components: {
    CommonLayout,
    SearchBarOnEstateList,
    EstateCardOnListPage,
  },
  created() {
    this.getRealEstates();
  },
  data() {
    return {
      allRealEstates: [],
      searchQuery: "",
      filterCateByPrice: [
        { value: 0, label: "Tất cả" },
        { value: 1, label: "Dưới 1 tỷ" },
        { value: 2, label: "1 tỷ - 3 tỷ" },
        { value: 3, label: "3 tỷ - 5 tỷ" },
        { value: 4, label: "5 tỷ - 7 tỷ" },
        { value: 5, label: "7 tỷ - 10 tỷ" },
        { value: 6, label: "Trên 10 tỷ" },
      ],
      filterCateByArea: [
        { value: 0, label: "Tất cả" },
        { value: 1, label: "Dưới 30m2" },
        { value: 2, label: "30m2 - 50m2" },
        { value: 3, label: "50m2 - 80m2" },
        { value: 4, label: "80m2 - 100m2" },
        { value: 5, label: "100m2 - 150m2" },
        { value: 6, label: "Trên 150m2" },
      ],
      businessType: this.$route.params.businessType,
      realEstateType: this.$route.params.realEstateType,
    };
  },
  computed: {
    ...mapGetters(["allRealEstateType"]),
    realEstatesByParams() {
      return this.allRealEstates.filter(
        (estate) =>
          estate.LoaiBDS === this.realEstateType &&
          estate.TrangThai === RealEstatePostStatus.DA_DUYET
      );
    },
  },
  methods: {
    goToEstateDetails(id) {
      this.$router.push({ name: "estate", params: { id: id } });
    },
    updateSearchQuery(searchQuery) {
      this.searchQuery = searchQuery;
    },
    async getRealEstates() {
      try {
        const response = await RealEstateService.getAllRealEstates();
        this.allRealEstates = response;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
