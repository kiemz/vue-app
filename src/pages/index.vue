<template>
  <div class="index">

    <nav-bar class="nav-bar">
      <a slot="left" class="nav-back"></a>
      <div slot="center" class="input-wrap">
       <form action="" method="get">
          <label for="">
            <i class="icon-search"></i>
            <input type="text"  class="input-search empty" placeholder="如:logo设计"> 
          </label>
       </form>
      </div>
      <a slot="right" class="nav-kinds">
        <img src="../assets/img/kinds.png" alt="">
      </a>
    </nav-bar>
    
    <tab-control :class="['tab-control',{'show-tab': isShow ? true : false}]" 
    @keywordChange="keywordChange"></tab-control>
    <filter-nav :class="['filter-nav',{'topDist': isShow ? true : false}]" 
    @showBlock="showBlock"
    :allCity="allCity"
    :provinceData="provinceData"></filter-nav>

    <div class="search-container">
      <div class="search-bar">
        <img src="../assets/img/bar-search.png" alt="">
      </div>
      <item-list :listData="listData" :curCity='curCity'></item-list>
    </div>

    

  </div>
</template>

<script>
import NavBar from '../components/common/navbar/NavBar'
import TabControl from '../components/content/tabControl/TabControl'
import FilterNav from '../components/content/FilterNav'
import ItemList from '../components/content/itemList/itemList'

import axios from 'axios'
import qs from 'qs'

export default {
  name: 'index',
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
        pageSign: 'P20200525001',
      },
      listData: [],
      allCity: {},
      cityData: {},
      isShow: '',
      provinceData: [],
      curCity: '',
      regionId: 0,
      curProvinceId: 0,
      cityidfilter: [],
      provinceidfilter: []
    }
  },
  components: {
    NavBar,
    TabControl,
    FilterNav,
    ItemList
  },

  async created(){
    await this.getCityData()
    this.initData()
  },

  computed: {},

  mounted(){},

  methods: {
    showBlock(data){
      this.isShow = data.isShow
      if(!data.isShow){
        let params = {
          regionId: data.regionId,
          'cityidfilter[0]': data.cityidfilter[0],
          'provinceidfilter[0]': data.provinceidfilter[0]
        }
        this.getData(params)
      }
      this.curCity = data.curCity
      this.regionId = data.regionId
      this.cityidfilter = data.cityidfilter
      this.provinceidfilter = data.provinceidfilter
    },
    initData(){
      let params = {
        locationCityId: this.allCity.local.cityId,
        locationProvinceId: this.allCity.local.provinceId
      }
      this.curCity = this.allCity.local.provinceName
      this.getData(params)
    },
    keywordChange(type){
      this.formData[type]=type
      this.getData()
      this.formData = {}
    },
    getData(params = {}){
      
      const data = {
        ...this.params,
        ...params
      }

      console.log(data);
      axios.post('/service/search/v2', qs.stringify(data), {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        console.log('-',res);
        let result = {}
        result = res.data.data
        this.listData = result.list
        console.log(result.list);
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCityData(){
      return axios.post('/api/getAllCity')
      .then(res => {
        let result = {}
        result = res.data.data
        this.allCity = result
        this.dealData(result)
      })
      .catch(err => {
        console.log(err);
      })
    },
    dealData(data){
      let province = []
      for(let i = 0;i<data.list.length;i++){
        if(data.list[i].provinceName === data.list[i].cityName){
          province.push(data.list[i])
        }
      }
      this.provinceData = province
    }
  }
}

</script>

<style lang="less" scoped>
.show-tab{
  position: sticky;
  top: 45px;
  z-index: 9;
}
.index{
  position: relative;
}
.fixed{
  position: fixed;
  overflow: hidden;
}
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
.search-bar{
  margin-bottom: 10px;
}
input::-webkit-input-placeholder{
  color: #bdbebd;
}
.nav-bar{
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 9;
}
.filter-nav{
  background-color: #f4f4f4;
  position: sticky;
  top: 45px;
  z-index: 9;
}
.topDist{
  top:90px;
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
