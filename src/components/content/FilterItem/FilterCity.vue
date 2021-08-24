<template>
  <div
    class="filter-city isChecked"
    @click="showForm('filter-complex', 'filter-city')"
  >
    <div>
      <a href="javascript:;">
        <label for="">{{ choose }}&nbsp;</label>
        <i class="select-icon"></i>
      </a>
      <div :class="['shadow', { curShow: isShow == 'filter-city' }]">
        <div class="city-content">
          <div class="city-level city-level1">
            <ul>
              <li
                v-for="(item, index) in $attrs.provinceData"
                :key="index"
                :class="[
                  'city-item',
                  { cityActive: cityShowItem == item.provinceName },
                ]"
                @click.stop="optCity(item)"
              >
                {{ item.provinceName }}
              </li>
            </ul>
          </div>
          <div :class="['city-level', { 'city-level2': firstOpt }]">
            <ul>
              <li
                v-for="(item, index) in cityArray"
                :key="index"
                :class="[
                  'city-item',
                  { cityActive: cityShowItem1 == item.cityName },
                ]"
                @click.stop="optCity1(item)"
              >
                {{ item.cityName }}
              </li>
            </ul>
          </div>
          <div :class="['city-level', { 'city-level3': secondOpt }]">
            <ul>
              <li
                v-for="(item, index) in cityTown"
                :key="index"
                :class="[
                  'city-item',
                  { cityActive: cityShowItem2 == item.regionName },
                ]"
                @click.stop="optCity2(item)"
              >
                {{ item.regionName }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mask" @click.stop="hide"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FilterCity",
  data() {
    return {
      isChecked: false,
      isShow: "",
      isSelected: "",
      cityShowItem: "",
      cityShowItem1: "",
      cityShowItem2: "",
      cityArray: [],
      cityTown: [],
      firstOpt: false,
      secondOpt: false,
      curCity: "",
      regionId: 0,
      cityidfilter: [],
      provinceidfilter: [],
    };
  },
  components: {},
  props: {},
  created() {},
  watch: {
    // 如果 `textValue` 发生改变，这个函数就会运行
    curCity(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.hideBlock();
      }
    },
  },
  computed: {
    choose() {
      return (
        this.curCity ||
        (this.$attrs.allCity.local && this.$attrs.allCity.local.cityName) ||
        ""
      );
    },
  },

  mounted() {},

  methods: {
    hide() {
      this.isShow = "";
      document.body.style.position = "static";
    },
    showForm(curFilter, curBlock = "") {
      if (curFilter == "filter-select") {
        this.isSelected = curFilter;
        this.isShow = curBlock ? curBlock : curFilter;
        return;
      }
      this.isActive = curFilter;
      this.isShow = curBlock ? curBlock : curFilter;
      if (curFilter == "filter-sales") {
        this.hideBlock(5);
      }
    },
    hideBlock() {
      let params = {
        isShow: this.isShow,
        sort: this.$attrs.params.sort,
        curCity: this.curCity,
        regionId: this.regionId,
        cityidfilter: this.cityidfilter,
        provinceidfilter: this.provinceidfilter,
      }
      if(this.$attrs.navigationIds!==-1){
        params.navigationIds=this.$attrs.navigationIds
      }
      if(this.$attrs.navigationValueIds!==-1){
        params.navigationValueIds = this.$attrs.navigationValueIds
      }
      if(this.$attrs.tagsName!==-1){
        params.tagsName = this.$attrs.tagsName
      }
      this.$emit("showBlock", params);
    },
    optCity(provinceItem) {
      this.firstOpt = true;
      this.cityTown = [];
      this.cityShowItem = provinceItem.provinceName;
      this.provinceidfilter = [
        provinceItem.provinceId,
        provinceItem.provinceName,
      ];
      let data = this.$attrs.allCity.list;
      this.cityArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].provinceName === provinceItem.provinceName) {
          let { cityName, cityId } = data[i];
          this.cityArray.push({ cityName, cityId });
        }
      }
    },
    optCity1(cityItem) {
      if (this.isChecked) {
        this.isChecked = false;
        this.curCity = this.cityShowItem1;
        this.cityShowItem2 = "";
        this.regionId = 0;
        this.cityidfilter = [cityItem.cityId, cityItem.cityName];
        this.hide();
        return;
      }
      this.secondOpt = true;
      this.cityShowItem1 = cityItem.cityName;
      this.cityidfilter = [cityItem.cityId, cityItem.cityName];
      this.getCityTown(cityItem.cityId);
    },
    optCity2(townItem) {
      this.cityShowItem2 = townItem.regionName;
      this.curCity = townItem.regionName;
      this.regionId = townItem.regionId;
      this.cityidfilter = [townItem.regionId, townItem.regionName];
      this.hide();
    },
    getCityTown(cityId) {
      this.isChecked = true;
      axios
        .post("/city/getCombineCityTown", { cityId })
        .then((res) => {
          if (res.data.data) {
            this.cityTown = res.data.data;
            this.secondOpt = true;
          } else {
            this.curCity = this.cityShowItem1;
            this.hide();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.cityActive {
  color: #ff6900;
}
.select-wrap {
  padding: 0 15px;
}
.isChecked {
  a {
    color: #ff6900;
    .select-icon {
      border-right: 2px solid #ff6900;
      border-bottom: 2px solid #ff6900;
    }
  }
}
.shadow {
  display: none;
}
.select-wrap {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  height: 42px;
  font-weight: 400;
  font-size: 13px;
  font-family: PingFangSC, PingFangSC-Regular;
}
.select-left {
  display: flex;
  justify-content: space-between;
  width: 100%;
  & > div {
    line-height: 42px;
  }
  a {
    display: block;
  }
}
.filter-layout {
  position: relative;
  top: 50%;
  width: 12px;
  transform: translateY(-50%);
  img {
    width: 100%;
  }
}

.select-icon {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-right: 2px solid #5b5b5b;
  border-bottom: 2px solid #5b5b5b;
  border-radius: 2px;
  transform: rotate(45deg) translateY(-50%);
}
.filter-png {
  display: inline-block;
  width: 11px;
  height: 10px;
  background: url(../../../assets/img/filter.png) no-repeat;
  background-size: 100%;
}

.filter-select {
  a {
    position: relative;
    margin-right: 14px;
    padding-right: 15px;
    &::after {
      content: "";
      width: 1px;
      height: 16px;
      background-color: #e0e0e0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.arrowChange {
  .select-icon {
    transform: rotate(-135deg) translateY(50%);
  }
}
.curShow {
  display: block;
  position: absolute;
  top: 42px;
  bottom: -2000px;
  left: 0;
  width: 100%;
  z-index: 10;
  .city-content {
    display: flex;
    width: 100%;
    max-height: 320px;
    .city-level1 ul li {
      background-color: #fff;
    }
    .city-level2 ul li {
      background-color: #fff;
    }
    .city-level3 ul li {
      background-color: #fff;
    }
    .city-level {
      flex: 1;
      overflow: scroll;
      background-color: #eeeeee;
    }
  }
  .sort-content {
    width: 100%;
    background-color: #fff;
    padding: 0 15px;
    ul {
      display: flex;
      flex-direction: column;
      li {
        background-color: #fff;
      }
      .sortActive {
        color: #ff6900;
        background-image: url(../../../assets/img/active.png);
        background-repeat: no-repeat;
        background-size: 14px;
        background-position: 100% 17px;
      }
    }
  }
}
.city-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  white-space: nowrap;
}
.mask {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
