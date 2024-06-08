<template>
  <div class="wrapper">
    <div class="tab-box">
      <router-link to="/estate-for-rent"> Cho thuê </router-link>
      <router-link to="/estate-for-sale"> Bán </router-link>
    </div>
    <div>
      <input
        style="color: #ccc"
        type="text"
        class="search-box"
        v-model="searchQuery"
        @keyup.enter="search()"
        placeholder="Nhập tên căn hộ hoặc địa điểm"
      />
    </div>
    <div class="list__option relative text-left flex">
      <div>
        <button
          type="button"
          class="item__option inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="openFilter"
        >
          <div class="option_input">
            <p>Loại nhà đất</p>
            <span>Tất cả</span>
          </div>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 7.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div>
        <button
          type="button"
          class="item__option inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="openFilter"
        >
          <div class="option_input">
            <p>Khu vực & Dự án</p>
            <span>Toàn quốc</span>
          </div>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 7.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div>
        <button
          type="button"
          class="item__option inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="openFilter"
        >
          <div class="option_input">
            <p>Mức giá</p>
            <span>Tất cả</span>
          </div>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 7.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div>
        <button
          type="button"
          class="item__option inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="openFilter"
        >
          <div class="option_input">
            <p>Diện tích</p>
            <span>Tất cả</span>
          </div>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 7.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div>
        <button
          type="button"
          class="item__option btn-option inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="openFilter"
        >
          <div class="option_input">
            <span>Lọc Thêm</span>
          </div>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 7.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div>
        <button
          type="button"
          class="item__option inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="openFilter"
        >
          <div class="option_input">
            <span>Đặt lại</span>
          </div>
          <!-- Heroicon name: chevron-down -->
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M6.293 7.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-white ring-opacity-5"
        aria-labelledby="options-menu"
        role="menu"
      >
        <div class="py-1" role="none" v-show="showFilter">
          <div
            class="selectOptions"
            v-for="(type, index) in typeOfEstate"
            :key="index"
          >
            <label :for="type">{{ type }}</label>
            <input type="checkbox" :ref="type" @click="checkOption(type)" />
          </div>
          <div class="selectOptionsFooter">
            <a href="" class="submitFilter">Tìm kiếm</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBarOnEstateListVue",
  props: {
    updateSearchQuery: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showFilter: false,
      typeOfEstate: [
        "Căn hộ chung cư",
        "Nhà riêng",
        "Biệt thự",
        "Đất nền",
        "Đất thổ cư",
        "Nhà mặt phố",
      ],
      selectedOption: null,
      searchQuery: "",

    };
  },
  methods: {
    openFilter() {
      this.showFilter = !this.showFilter;
    },
    search() {
      this.$emit("search", this.searchQuery);
    },
    checkOption(value) {
      this.typeOfEstate.forEach((option) => {
        if (option === value) {
          this.$refs[option][0].checked = true;
        } else this.$refs[option][0].checked = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #f2f2f2;
  box-shadow: 0px 4px 10px rgba(182, 182, 182, 0.18) !important;
}

.tab-box a:nth-child(1) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.tab-box a:nth-child(2) {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}

a {
  width: 80px;
  color: rgb(153, 153, 153);
  cursor: pointer;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  font-family: "Roboto Medium", Roboto, Arial !important;
  font-weight: normal !important;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(204, 204, 204);
  border-image: initial;
  background: rgb(255, 255, 255);
  padding: 7px 15px;

  &.router-link-exact-active {
    color: rgb(255, 255, 255);
    background: rgb(80, 80, 80);
    border-color: rgb(80, 80, 80);
  }
}

a.active {
  background-color: #ccc;
}

.search-box {
  width: 300px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
}

.py-1 {
  top: 8px;
  z-index: 9;
  width: 280px;
  background: #fff;
  box-shadow: 0px 8px 20px rgba(182, 182, 182, 0.42);
  border-radius: 8px;
  max-height: 315px;
  position: relative;
}

input[type="text"]::before {
  position: absolute;
  z-index: 1;
  text-align: center;
  left: 12px;
  top: 8px;
  line-height: 16px;
  width: 16px;
  height: 16px;
  font-size: 16px;
  background: url("../../assets/Icon/search.svg");
  content: '',
}

input[type="checkbox"] {
  margin: 0 10px 0 0;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  top: 2px;
}

.submitFilter {
  color: #fff;
  background: #e03c31;
  border: solid 1px #e03c31;
  font-family: "Lexend Medium", Roboto, Arial !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -0.2px;
  padding: 5px 11px;
  border-radius: 4px;
}

.selectOptions {
  width: 100%;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
}

.selectOptionsFooter {
  width: 100%;
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #f2f2f2;
}

// -----------------------------
.item__option {
  padding-right: 40px;
  align-items: center;
  height: 100%;
}

.btn-option svg {
  font-size: 14px;
  color: #ccc;
  margin-left: 10px;
}

.option_input {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.option_input span {
  font-size: 14px;
  font-weight: 600;
}
</style>
