<template>
  <div>
    <div
        :class="[
          'filter-complex',
          { isChecked: isActive == 'filter-complex' },
          { arrowChange: isActive == isShow },
        ]"
        @click.stop="showForm('filter-complex')"
      >
        <div>
          <a href="javascript:;">
            <label for="">{{ sortWay }}&nbsp;</label>
            <i class="select-icon"></i>
          </a>
          <div
            :class="['shadow', { curShow: isShow == 'filter-complex' }]"
            @click.stop="hideBlock()"
          >
            <div class="sort-content">
              <ul>
                <li
                  v-for="(item, index) in [
                    '综合',
                    '价格从低到高',
                    '价格从高到低',
                    '评分从高到低',
                  ]"
                  :key="index"
                  :class="{ sortActive: isActive1 == index }"
                  @click.stop="optSort(item, index)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="mask"></div>
          </div>
        </div>
      </div>

    <div
        :class="['filter-sales', { isChecked: isActive == 'filter-sales' }]"
        @click.stop="showForm('filter-sales')"
      >
        <a href="javascript:;">
          <label for="">销量&nbsp;</label>
        </a>
      </div>  
  </div>
</template>

<script>
export default {
  name: 'FilterSort',
  data() { 
    return {
      isChecked: false,
      isSelected: "",
      isActive: "filter-complex",
      isActive1: 0,
      isShow: "",
      sort: 1,
      sortWay: "综合",
    };
  },
  components: {},

  created(){},

  computed: {},

  mounted(){
  },

  methods: {
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
    hideBlock(sales = 0) {
      this.isShow = ""
      if (sales != 0) {
        this.sort = 5;
      }
      this.$emit("showBlock", {
        isShow: "",
        sort: this.sort,
        curCity: this.$attrs.curCity,
        regionId: this.$attrs.regionId,
        cityidfilter: this.$attrs.cityidfilter,
        provinceidfilter: this.$attrs.provinceidfilter,
      });
    },
    optSort(item, index) {
      this.sortWay = item;
      this.isActive1 = index;
      this.sort = parseInt(index) + 1;
      this.hideBlock();
    },
  }
}

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
.filter-sort{
  display: flex;
  justify-content: space-around;
  .div{
    flex: 1;
  }
}
</style>
