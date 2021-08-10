<template>
  <div id="index">

    <nav-bar class="nav-bar">
      <a slot="left" class="nav-back"></a>
      <div slot="center" class="input-wrap">
       <form action="" method="get">
          <label for="">
            <i class="icon-search"></i>
            <input type="text"  class="input-search empty" placeholder="请选择：如设计logo"> 
          </label>
       </form>
      </div>
      <a slot="right" class="nav-kinds">
        <img src="../assets/img/kinds.png" alt="">
      </a>
    </nav-bar>
    
    <tab-control @keywordChange="keywordChange"></tab-control>
    
    <div class="search-container">
      <filter-nav></filter-nav>
      <div class="search-bar">
        <img src="../assets/img/bar-search.png" alt="">
      </div>
    </div>


  </div>
</template>

<script>
import NavBar from '../components/common/navbar/NavBar'
import TabControl from '../components/content/tabControl/TabControl'
import FilterNav from '../components/content/FilterNav'
import axios from 'axios'

export default {
  name: 'index',
  data() { 
    return {
      formData: {},
    }
  },
  components: {
    NavBar,
    TabControl,
    FilterNav
  },

  created(){
    this.getData()
  },

  computed: {},

  mounted(){},

  methods: {
    initData(){
      this.formData = {}
    },
    keywordChange(data){
      this.formData[data]=data
      console.log(this.formData);
      this.initData()
    },
    getData(){
      axios.post('/service/search/v2', {
        page: 0,
        pagesize: 20,
        sort: 1,
        minOpenShopDays: 0,
        userType: 0,
        platform: 0,
        locationCityId: 3418,
        locationProvinceId: 6561,
        pageSign: 'P20200525001'
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}

</script>

<style lang="less" scoped>
.empty{
  padding: 0 25px 0 24px;
}
.search-container{
  padding: 0 15px;
}
.search-bar{
  width: 100%;
  img{
    width: 100%;
  }
}
input::-webkit-input-placeholder{
  color: #bdbebd;
}
.nav-bar{
  padding: 0 15px;
}
.input-wrap{
  background-color: #f3f3f3;
  height: 32px;
  padding-left: 10px;
  border-radius: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  form{
    flex: 1;
  }
  label{
    display: flex;
    position: relative;
    align-items: center;
    .icon-search{
      position: absolute;
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      background: url(../assets/img/search.png) no-repeat;
      background-size: 100%;
      background-position: center;
    }
    .input-search{
      height: 24px;
      width: 100%;
      background-color: transparent;
      font-size: 15px;
    }
  }
}

.nav-back{
  display: block;
  width: 12px;
  height: 12px;
  margin-left: 5px;
  border-bottom: 2px solid #ccc;
  border-left: 2px solid #ccc;
  transform: rotate(45deg);
}
.nav-kinds{
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  right: -8px;
  img{
    width: 20px;
  }
}


</style>
