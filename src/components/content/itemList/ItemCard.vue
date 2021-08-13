<template>
  <div class="item-card">
    <a class="item">
      <div class="picture">
        <img :src="itemInfo.imgUrl" alt="">
      </div>
      <div class="info">
        <div class="title">
          {{itemInfo.highlightTitle}}
        </div>
        <p class="tags">
          <span class="item-tag" v-for="(item,index) in itemInfo.proTags" :key="index">
            <i class="inner-tag">
              {{item}}
            </i>
          </span>
        </p>
        <div class="price-info">
          <span class="price">
              <i class="price-symbol">¥</i>
              <span class="item-price">{{parseInt(itemInfo.appPrice)}}</span>
              <span class="unit">{{itemInfo.appPriceShow.split(".")[1] ? '.'+itemInfo.appPriceShow.split(".")[1]:''}}</span>                           
              <span class="unit" style="margin-left:5px">{{itemInfo.unit ? '/'+itemInfo.unit : itemInfo.unit}}</span>                           
          </span>
          <span class="item-sales fonts-size">{{itemInfo.saleCount+'销量'}}</span>
          <span class="item-score fonts-size">{{itemInfo.comprehensiveScore+'评分'}}</span>
          <span class="item-ad fonts-size">{{itemInfo.adInfo ? '广告' : ''}}</span>
        </div>     
        <div class="comment">
            <span class="comment-eg">{{itemInfo.serviceComment}}</span>
        </div> 
        <div class="shop-block">
          <div class="shop-info">
            <p class="shop-name">{{itemInfo.shopName}}</p>
            <span class="shop-address">&nbsp;{{curCity}}</span>
          </div>
          <span class="shop-service">免费咨询</span>
        </div>    
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  data() { 
    return {

    }
  },
  props: {
    itemInfo: Object,
    curCity: String
  },
  methods: {}
}

</script>

<style lang="less" scoped>
.item-card {
  padding: 0 15px 6px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 15px;
  box-shadow: 0 3px 12px 0 rgba(0,0,0,0.1);
}
.item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 15px 0 0;
}
.picture {
  width: 85px;
  height: 85px;
  overflow: hidden;
  border-radius: 4px;
  margin-right: 15px;
  img{
    width: 100%;
    height: 100%;
  }
}
.info {
  flex: 1;
  min-width: 0;
}
.title {
  font-size: 14px;
  font-weight: 700;
  color: #333333;
  line-height: 17px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.tags {
  margin:5px 0 9px;
  height: 5vw;
  line-height: 5vw;
  overflow: hidden;
  .item-tag {
    display: inline-block;
    padding: 0 2px;
    margin-right: 2px;
    color: #ff6900;
    border: 1px solid #ffcaa5;
    border-radius: 2px;
    font-size: 2.4vw;
    text-overflow: ellipsis;
    line-height: 3vw;
  }
}
.price-info {
  display: flex;
  margin-top: 8px;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price {
  color: #ff6900;
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  margin-right: 3px;
  .price-symbol{
    font-size: 10px;
  }
  .unit{
    font-size: 10px;
  }
}
.fonts-size {
  font-size: 10px;
  color: #999999;
  margin: 0 0 0 3px;
}
.item-ad{
  color: #d6d6d6;
}

.comment {
  margin-top: 7px;
  background: #f2f2f2;
  color: #999999;
  border-radius: 2px;
  padding: 0px 5px;
  font-size: 10px;
  line-height: 16px;
  .comment-eg{
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.shop-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  .shop-info{
    display: flex;
    align-items: center;
    width: calc(100% - 54px);
    font-size: 10px;
    color: #999999;
    line-height: 14px;
    .shop-name{
      max-width: 75%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .shop-service{
    width: 54px;
    height: 19px;
    line-height: 19px;
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    border-radius: 2px;
    color: #ffffff;
    background: linear-gradient(-47deg,#ff6830,#ff9c54);
  }
}

</style>
