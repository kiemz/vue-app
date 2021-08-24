<template>
  <div
    :class="['filter-select', { isChecked: isSelected == 'filter-select' }]"
    @click="showForm('filter-select')"
  >
    <div>
      <a href="javascript:;">
        <label for="">筛选&nbsp;</label>
        <i class="filter-png"></i>
      </a>
      <div :class="['shadow', { curShow: isShow == 'filter-select' }]">
        <div class="mask" @click.stop="hide"></div>
        <div class="screen-content">
          <screen-item
            :facets="$attrs.facetsData[1]"
            v-if="$attrs.facetsData[1]"
            :isComfirmed="isComfirmed"
            @sendInfo="sendInfo"
          ></screen-item>
          <screen-item
            :facets="$attrs.facetsData[2]"
            v-if="$attrs.facetsData[2]"
            :isComfirmed="isComfirmed"
            @sendInfo="sendInfo"
          ></screen-item>
          <screen-item
            :facets="$attrs.facetsData[0]"
            v-if="$attrs.facetsData[0]"
            :isComfirmed="isComfirmed"
            @sendInfo="sendInfo"
          ></screen-item>
        </div>
          <div class="btn">
            <button class="reset" @click.stop="reset">重置</button>
            <button class="comfirm" @click.stop="comfirm">确认</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenItem from "./ScreenItem";
export default {
  name: "FilterScreen",
  data() {
    return {
      isChecked: false,
      isSelected: "",
      isActive: "filter-complex",
      isShow: "",
      isComfirmed: false,
      obj: {},
      curObj: {}
      // cityShowItem: "",
      // cityShowItem1: "",
      // cityShowItem2: "",
      // cityArray: [],
      // cityTown: [],
      // curCity: "",
      // regionId: 0,
      // curProvinceId: 0,
      // cityidfilter: [],
      // provinceidfilter: [],
      // sort: 1,
      // sortWay: "综合",
    };
  },
  components: {
    ScreenItem,
  },

  created() {},

  computed: {},

  mounted() {},

  methods: {
    sendInfo(info){ 
      if(info.id != -1){
        this.obj[info.type] = info.id
      }else if(info.id == -1){
        delete this.obj[info.type]
      }
    },

    comfirm(){
      this.isComfirmed = true
      let ids = []
      let valueIds = []
      let tags
      for(let i in this.obj){
        if(i== '1000'){
          tags = this.obj[i]
        }else{
          valueIds.push(this.obj[i])
          ids.push(i)
        }
      }
      let vi=valueIds.join(',')
      let id=ids.join(',')
      let curObj = {}
      curObj.isShow = ""
      curObj.navigationIds = id
      curObj.navigationValueIds = vi
      curObj.tagsName = tags
      this.hideBlock(curObj)
    },
    reset(){
      this.isComfirmed = false
      let curObj = {}
      curObj.isShow = ""
      this.obj = {}
      this.isSelected = ""
      this.hideBlock(curObj)
    },
    hide() {
      document.body.style.position = "static";
      this.isShow = "";
    },
    showForm(curFilter, curBlock = "") {
      this.curObj = {
        sort: this.$attrs.params.sort,
        curCity: this.$attrs.curCity,
        regionId: this.$attrs.regionId,
        cityidfilter: this.$attrs.cityidfilter,
        provinceidfilter: this.$attrs.provinceidfilter,
      }
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
    hideBlock(params = {}) {
      let obj = {
        ...this.curObj,
        ...params
      }
      this.$emit("showBlock", obj);
      this.hide()
    },
  },
};
</script>

<style lang="less" scoped>

.screen-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
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

.curShow {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.mask {
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.btn {
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80%;
  -webkit-box-shadow: 0 0 1px #e5e5e5;
  box-shadow: 0 0 1px #e5e5e5;
  .reset {
    display: inline-block;
    height: 100%;
    width: 50%;
    color: #333;
    background: #fff;
    border: none;
    border-right: 1px solid #eee;
  }
  .comfirm {
    display: inline-block;
    height: 100%;
    width: 50%;
    color: #fff;
    background: #ff6900;
    border: none;
  }
}
</style>
