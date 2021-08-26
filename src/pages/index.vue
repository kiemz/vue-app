<template>
  <div class="index" ref="scroll">
    <nav-bar class="nav-bar">
      <a slot="left" class="nav-back"></a>
      <div slot="center" class="input-wrap">
        <form action="" method="get">
          <label for="">
            <i class="icon-search"></i>
            <input
              type="text"
              class="input-search empty"
              placeholder="如:logo设计"
            />
          </label>
        </form>
      </div>
      <a slot="right" class="nav-kinds">
        <img src="../assets/img/kinds.png" alt="" />
      </a>
    </nav-bar>

    <tab-control
      :class="['tab-control']"
      @keywordChange="keywordChange"
    ></tab-control>
    <filter-nav
      :class="['filter-nav']"
      @showBlock="showBlock"
      :allCity="allCity"
      :facetsData="facetsData"
      :provinceData="provinceData"
      :curCity="curCity"
      :regionId="regionId"
      :cityidfilter="cityidfilter"
      :provinceidfilter="provinceidfilter"
      :navigationIds="navigationIds"
      :navigationValueIds="navigationValueIds"
      :tagsName="tagsName"
      :params="params"
    ></filter-nav>

    <div class="search-container">
      <div class="search-bar">
        <img src="../assets/img/bar-search.png" alt="" />
      </div>
      <item-list :listData="listData" :curCity="curCity"></item-list>
      <div class="loadMore">{{ loadText }}</div>
      <!-- :class="['loadMore',{loadMoreShow:!this.load}]" -->
    </div>
  </div>
</template>

<script>
import NavBar from "../components/common/navbar/NavBar";
import TabControl from "../components/content/tabControl/TabControl";
import FilterNav from "../components/content/FilterNav";
import ItemList from "../components/content/itemList/itemList";

import axios from "axios";
import qs from "qs";

export default {
  name: "index",
  data() {
    return {
      formData: {},
      params: {
        page: 0,
        pagesize: 20,
        sort: 1,
        minOpenShopDays: 0,
        userType: 0,
        platform: 0,
        pageSign: "P20200525001",
      },
      listData: [],
      facetsData: [],
      allCity: {},
      cityData: {},
      isShow: false,
      provinceData: [],
      curCity: "",
      regionId: 0,
      curProvinceId: 0,
      cityidfilter: [],
      provinceidfilter: [],
      navigationIds: -1,
      navigationValueIds: -1,
      tagsName: -1,
      allParams: {},
      load: true,
      loadText: "加载更多...",
      city: [],
    };
  },
  components: {
    NavBar,
    TabControl,
    FilterNav,
    ItemList,
  },

  async created() {
    await this.getCityData();
    this.initData();
  },

  computed: {},
  watch: {},
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },

  methods: {
    onScroll() {
      let innerHeight = this.$refs.scroll.clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;

      if (outerHeight + scrollTop >= innerHeight - 60 && this.load) {
        this.load = false;
        this.allParams.page = this.allParams.page + 1;
        const data = this.allParams;
        console.log(data);
        axios
          .post("/service/search/v2", qs.stringify(data))
          .then((res) => {
            let result = {};
            result = res.data.data;
            if (result.list && result.list.length) {
              this.listData.push(...result.list);
              this.load = true;
            } else {
              this.load = false;
              this.loadText = "没有更多了";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    showBlock(data) {
      window.scrollTo(0, 0);
      this.isShow = data.isShow;
      document.body.style.position = "fixed";
      if (!data.isShow) {
        this.city = data.city ? data.city : this.city;
        this.curCity = data.curCity;
        this.regionId = data.regionId;
        this.cityidfilter = data.cityidfilter;
        this.provinceidfilter = data.provinceidfilter;
        this.params.sort = data.sort;
        this.navigationIds = data.navigationIds;
        this.navigationValueIds = data.navigationValueIds;
        this.tagsName = data.tagsName;
        let params = {
          regionId: data.regionId,
          sort: data.sort,
          "cityidfilter[0]": data.cityidfilter[0],
          "provinceidfilter[0]": data.provinceidfilter[0],
          navigationIds: data.navigationIds,
          navigationValueIds: data.navigationValueIds,
          tagsName: data.tagsName,
        };
        // console.log('index里的showBlock的params',params);
        if (!data.cityidfilter.length && !data.provinceidfilter.length) {
          params.locationCityId = this.allCity.local.cityId;
          params.locationProvinceId = this.allCity.local.provinceId;
        }
        // console.log('index里的showBlock',this.facetsData);

        this.getData(params);
      }
    },
    initData() {
      let params = {
        locationCityId: this.allCity.local.cityId,
        locationProvinceId: this.allCity.local.provinceId,
      };
      this.curCity = this.allCity.local.provinceName;
      this.getData(params);
    },
    keywordChange(type) {
      this.formData[type] = type;
      this.getData();
      this.formData = {};
    },
    getData(params = {}) {

      let m = JSON.parse(sessionStorage.getItem("ofenUse")) || [
        { cityName: "全国" },
        {
          cityName: this.allCity.local.cityName,
          cityId: this.allCity.local.cityId,
          provinceName: this.allCity.local.provinceName,
          provinceId: this.allCity.local.provinceId,
        },
      ];
      if (this.cityidfilter && this.cityidfilter.length > 0) {
        let ar = {
          cityName: this.regionId == 0 ? this.cityidfilter[1] : this.city[1],
          cityId: this.regionId == 0 ? this.cityidfilter[0] : this.city[0],
          provinceName: this.provinceidfilter[1],
          provinceId: this.provinceidfilter[0],
        };
        if (
          ar.cityName != "全国" &&
          ar.cityName != this.allCity.local.provinceName
        ) {
          let flag = true;
          for (let i = 0; i < m.length; i++) {
            if (m[i].cityName == ar.cityName) {
              flag = false;
              break;
            }
          }
          if (flag) {
            m.push(ar);
          }
        }
      }
      sessionStorage.setItem("ofenUse", JSON.stringify(m));

      document.body.style.position = "static";
      const data = {
        ...this.params,
        ...params,
      };
      this.allParams = { ...data };
      // console.log('index里的getData的data',data);
      axios
        .post("/service/search/v2", qs.stringify(data))
        .then((res) => {
          let result = {};
          result = res.data.data;
          this.listData = result.list;
          if (result.facets && result.facets.length) {
            this.facetsData = result.facets;
          }
          // console.log('result',result);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log('index里的get',this.facetsData);
    },
    getCityData() {
      return axios
        .post("/api/getAllCity")
        .then((res) => {
          let result = {};
          result = res.data.data;
          this.allCity = result;
          this.dealData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dealData(data) {
      let province = [];
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].provinceName === data.list[i].cityName) {
          province.push(data.list[i]);
        }
      }
      this.provinceData = province;
      this.provinceData.unshift({ provinceName: "常用", provinceId: 9999 });
    },
  },
};
</script>

<style lang="less" scoped>
.loadMore {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 44px;
  line-height: 36px;
}
.show-tab {
  position: sticky;
  top: 45px;
  z-index: 9;
}
.index {
  position: relative;
}
.fixed {
  position: fixed;
  overflow: hidden;
}
.empty {
  padding: 0 25px 0 24px;
}
.search-container {
  position: relative;
  padding: 0 15px;
}
.search-bar {
  width: 100%;
  img {
    width: 100%;
  }
}
.search-bar {
  margin-bottom: 10px;
}
input::-webkit-input-placeholder {
  color: #bdbebd;
}
.nav-bar {
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 9;
}
.filter-nav {
  background-color: #f4f4f4;
  position: sticky;
  top: 45px;
  z-index: 9;
}
.topDist {
  top: 90px;
}
.input-wrap {
  background-color: #f3f3f3;
  height: 32px;
  padding-left: 10px;
  border-radius: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  form {
    flex: 1;
  }
  label {
    display: flex;
    position: relative;
    align-items: center;
    .icon-search {
      position: absolute;
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      background: url(../assets/img/search.png) no-repeat;
      background-size: 100%;
      background-position: center;
    }
    .input-search {
      height: 24px;
      width: 100%;
      background-color: transparent;
      font-size: 15px;
    }
  }
}

.nav-back {
  display: block;
  width: 12px;
  height: 12px;
  margin-left: 5px;
  border-bottom: 2px solid #ccc;
  border-left: 2px solid #ccc;
  transform: rotate(45deg);
}
.nav-kinds {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  right: -8px;
  img {
    width: 20px;
  }
}
</style>
