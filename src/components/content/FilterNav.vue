<template>
   <!-- 选项卡 -->
    <div class="select-wrap">
      
      <div class="select-left">
          <div class="filter-city isChecked" @click="showForm">
            <div>
              <a href="javascript:;">
                <label for="">重庆&nbsp;</label>
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
          
          <div :class="['filter-complex',{isChecked:isShow == 'filter-complex'}]" @click="showForm('filter-complex')">
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

          <div :class="['filter-sales',{isChecked:isShow == 'filter-sales'}]" @click="showForm('filter-sales')">
            <a href="javascript:;">
              <label for="">销量&nbsp;</label>
            </a>
          </div>

          <div :class="['filter-select',{isChecked:isShow == 'filter-select'}]" @click="showForm('filter-select')">
            <a href="javascript:;">
              <label for="">筛选&nbsp;</label>
              <i class="filter-png"></i>
            </a>
          </div>
        </div>

      <div class="select-right">
        <div class="filter-layout">
          <img src="../../assets/img/category.png" alt="">
        </div>
      </div>

    </div>
    
</template>

<script>
export default {
  name: 'FilterNav',
  data() { 
    return {
      isShow: 'filter-complex'
    }
  },
  components: {},

  ceated(){},

  computed: {},

  mounted(){},

  methods: {
    showForm(curFilter){
      this.isShow = curFilter
    }
  }
}

</script>

<style lang="less" scoped>
.isChecked{
  a{
    color: #ff6900;
    .select-icon {
      border-right: 2px solid #ff6900;
      border-bottom: 2px solid #ff6900;
    }
  }
}
.shadow{
  display: none;
}
.select-wrap{
  display: flex;
  justify-content: space-between;
  height: 42px;
  font-weight: 400;
  font-size: 13px;
  font-family: PingFangSC, PingFangSC-Regular;
}
.select-left{
  display: flex;
  justify-content: space-between;
  width: 100%;
  & > div{
    line-height: 42px;
  }
  a{
    display: block;
  }
  
}
.filter-layout{
  position: relative;
  top: 50%;
  width: 12px;
  transform: translateY(-50%);
  img{
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
.filter-png{
  display: inline-block;
  width: 11px;
  height: 10px;
  background: url(../../assets/img/filter.png) no-repeat;
  background-size: 100%;
}

.filter-select{
  a{
    position: relative;
    margin-right: 14px;
    padding-right: 15px;
    &::after{
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
</style>

