<template>
  <!-- 选项卡 -->
  <div class="select-wrap" @click="showBlock">
    <div class="select-left">
      <div
        class="filter-city isChecked"
        @click="showForm('filter-complex', 'filter-city')"
      >
        <div>
          <a href="javascript:;">
            <label for="">{{choose}}&nbsp;</label>
            <i class="select-icon"></i>
          </a>
          <div
            :class="['shadow', { curShow: isShow == 'filter-city' }]"
            @click.stop="hideBlock('hide')"
          >
            <div class="city-content">
              <div class="city-level city-level1">
                <ul>
                  <li
                    v-for="(item, index) in provinceData"
                    :key="index"
                    :class="['city-item', { cityActive: cityShow == item }]"
                    @click.stop="optCity(item)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div :class="['city-level',{'city-level2':firstOpt}]">
                <ul>
                  <li v-for="(item, index) in cityArray"
                    :key="index"
                    :class="['city-item', { cityActive: cityShowItem1 == item }]"
                    @click.stop="optCity1(item)">
                    {{item}}
                  </li>
                </ul>
              </div>
              <div class="city-level city-level3">
                <ul></ul>
              </div>
            </div>
            <div class="mask"></div>
          </div>
        </div>
      </div>

      <div
        :class="['filter-complex', { isChecked: isActive == 'filter-complex' }]"
        @click="showForm('filter-complex')"
      >
        <div>
          <a href="javascript:;">
            <label for="">综合&nbsp;</label>
            <i class="select-icon"></i>
          </a>
          <div class="shadow">
            <div class="city-content">
              <div class="city-level"></div>
              <div class="city-level"></div>
              <div class="city-level"></div>
            </div>
            <div class="mask"></div>
          </div>
        </div>
      </div>

      <div
        :class="['filter-sales', { isChecked: isActive == 'filter-sales' }]"
        @click="showForm('filter-sales')"
      >
        <a href="javascript:;">
          <label for="">销量&nbsp;</label>
        </a>
      </div>

      <div
        :class="['filter-select', { isChecked: isActive == 'filter-select' }]"
        @click="showForm('filter-select')"
      >
        <a href="javascript:;">
          <label for="">筛选&nbsp;</label>
          <i class="filter-png"></i>
        </a>
      </div>
    </div>

    <div class="select-right">
      <div class="filter-layout">
        <img src="../../assets/img/category.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterNav",
  data() {
    return {
      isActive: "filter-complex",
      isShow: "",
      cityShow: "",
      cityShowItem1: "",
      cityArray: [],
      firstOpt: false,
      curCity: ''
    };
  },
  props: {
    allCity: Object,
    provinceData: Array,
  },
  created() {},
  components: {},

  computed: {
    choose(){
      return this.curCity || (this.allCity.local && this.allCity.local.cityName || '')
    }
  },

  mounted() {},

  methods: {
    showBlock() {
      this.$emit("showBlock", this.isShow);
    },
    hideBlock() {
      this.isShow = "";
      this.$emit("showBlock", this.isShow);
    },
    showForm(curFilter, curBlock = "") {
      this.isActive = curFilter;
      this.isShow = curBlock ? curBlock : curFilter;
      console.log(this.isShow);
    },
    optCity(cityName) {
      this.firstOpt = true
      this.cityShow = cityName;
      let data = this.allCity.list;
      this.cityArray = []
      for(let i = 0;i<data.length;i++){
        if(data[i].provinceName === cityName){
          this.cityArray.push(data[i].cityName)
        }
      }
    },
    optCity1(cityName) {
      this.secondOpt = true
      this.cityShowItem1 = cityName;
      
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
  background: url(../../assets/img/filter.png) no-repeat;
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
    background-color: #eee;
    width: 100%;
    max-height: 320px;
    .city-level1 {
      background-color: rebeccapurple;
    }
    .city-level2 {
      background-color: royalblue;
    }
    .city-level3 {
      background-color: red;
    }
    .city-level {
      flex: 1;
      overflow: scroll;
      background-color: #fff;
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

