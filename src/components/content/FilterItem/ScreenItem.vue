<template>
  <div class="screen-item">
    <p class="screen-title" @click.stop="unfoldItem">{{name}}<i :class="['iconfont',{'arrowTop':isUnfold}]">&#xe601;</i></p>
    <div class="screen-wrap">
      <div :class="['screen-list',{'list-unfold':isUnfold}]">
        <div v-for="item in facets.properties" :key="item.labelId" 
        @click="chooseThis(item.labelId)" 
        :class="['not-choosed',{'is-choosed':isChoose==item.labelId}]">
          {{item.labelName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenItem',
  data() { 
    return {
      isUnfold:false,
      isChoose: -1,
      obj: {},
      
    }
  },
  props: {
    facets: {
      type: Object,
      default: () => {},
    },
    isComfirmed: Boolean,
  },
  components: {},

  created(){

  },

  computed: {
    name() {
      return (
        (this.facets && this.facets.name) || ""
      );
    },
  },
  watch: {
    isComfirmed(newVal,oldVal){
      console.log(oldVal);
      if(!newVal){
        this.isChoose = -1
        // this.$emit('sendInfo',{})
      }
    }
  },
  mounted(){},

  methods: {
    unfoldItem(){
      this.isUnfold = !this.isUnfold
    },
    chooseThis(id){
        let facets = JSON.parse(JSON.stringify(this.facets))
        let {name,type} = facets
        this.obj = {name,type}
        if(this.isChoose == id){
          this.isChoose = -1
          this.obj.id = -1
        }else{
          this.isChoose = id
          this.obj.id = id
        }
        this.$emit('sendInfo',this.obj)
    }
  }
}

</script>

<style lang="less" scoped>

@font-face {
  font-family: 'iconfont';
  src: url('../../../assets/fonts/iconfont.woff2?t=1629688249262') format('woff2'),
       url('../../../assets/fonts/iconfont.woff?t=1629688249262') format('woff'),
       url('../../../assets/fonts/iconfont.ttf?t=1629688249262') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 12px;
  color: #666;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  float: right;
  margin-right: 15px;
}
.arrowTop{
  transform: rotate(180deg);
}
.screen-item{
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
  padding-top: 5px;
}
.screen-title{
  cursor: pointer;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  margin-left: 15px;
  line-height: 30px;
}
.screen-wrap{
  padding-bottom: 7.5px;
}
.screen-list{
  max-height: 180px;
  overflow: hidden;
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  .not-choosed{
    width: calc(33.33333% - 10px);
    height: 35px;
    line-height: 35px;
    border-radius: 2px;
    background-color: #f5f5f5;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    border: 1px solid rgba(0,0,0,0);
    margin: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .is-choosed{
    color: #ff6900;
    background: #fdf4ed;
    border-color: #e0834d;
    position: relative;
    &::after{
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: url(../../../assets/img/cancel.png);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    }
  }
}
.list-unfold{
  max-height: none;
}

</style>
