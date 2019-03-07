<template>
  <div class="sellerAll" ref="sellerAll">
    <div class="sellerAll-bscroll">
    <div class="seller-container">
      <div class="seller-overview">
        <div class="seller-overview-top">
          <div class="overview-top-title">{{seller.name}}</div>
          <div class="overview-top-contnet">
            <star :size="24" :score="seller.score" class="overview-top-contnet-star"></star>
            <span class="overview-top-ratingCount">({{seller.ratingCount}})</span>
            <span class="overview-top-sellCount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="seller-overview-bottom">
          <div class="overview-bottom">
            <div class="overview-bottom-price">起送价</div>
            <span class="bottom-price">{{seller.minPrice}}<span class="mon">元</span></span>
          </div>
          <div class="overview-bottom">
            <div class="overview-bottom-price">商家配送</div>
            <span class="bottom-price">{{seller.deliveryPrice}}<span class="mon">元</span></span>
          </div>
          <div class="overview-bottom bottom-right-border">
            <div class="overview-bottom-price">平均配送时间</div>
            <span class="bottom-price">{{seller.deliveryTime}}<span class="mon">分钟</span></span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="seller-bulletin-wrapper">
        <div class="seller-bulletin-wrapper">
          <div class="seller-bulletin-wrapper-title">公告与活动</div>
          <div class="seller-bulletin-wrapper-content">{{seller.bulletin}}</div>
        </div>
        <ul v-if="seller.supports" class="seller-supports">
          <li v-for="support in seller.supports" :key="support.index" class="seller-supports-item">
            <span :class="classMap[support.type]"></span>
            <span class="supports-item-text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <!-- 商家实景 -->
      <!-- 商家信息 -->
      <div class="seller-infos-wrapper">
        <div class="seller-infos-title">商家信息</div>
        <ul>
          <li v-for="info in seller.infos" :key="info.index" class="seller-infos-content">{{info}}</li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../start/star'
import split from '../split/split'
import BScroll from 'better-scroll'

export default{
  data () {
    return {
      classMap: []
    }
  },
  props: {
    seller: {}
  },
  components: {
    star, split
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  ready () {
    console.log(123456)
    this.scroll = new BScroll(this.$refs.sellerAll, {
      click: true
    })
  }
}
</script>

<style>
.sellerAll{
  position: absolute;
  height: 493px;
  width: 100%;
  overflow: hidden;
}
.seller-overview-top{
  margin: 18px 18px 0 18px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
 .overview-top-title{
   font-size: 14px;
   color: rgb(7, 17, 27);
   line-height: 14px;
   margin-bottom: 8px;
 }
  .overview-top-contnet-star{
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
  }
  .overview-top-ratingCount, .overview-top-sellCount{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(77, 85, 93);
    line-height: 18px;
  }
  .overview-top-ratingCount{
    margin-right: 12px;
  }
.seller-overview-bottom{
  width: 100%;
  height: 74px;
  display: flex;
}
  .overview-bottom{
    flex: 1;
    text-align: center;
    margin: 18px 0;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
  }
    .overview-bottom-price{
      padding-bottom: 4px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 10px;
    }
    .bottom-price{
      display: inline-block;
      font-size: 24px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      line-height: 24px;
    }
    /* 修正样式 */
      .mon{
        font-size: 10px;
      }
      .bottom-right-border{
        border-right: none;
      }
  /* 公告与活动 */
  .seller-bulletin-wrapper{
    margin: 18px 18px 0 18px;
  }
    .seller-bulletin-wrapper-title{
      font-weight: 450;
      font-size: 18px;
    }
    .seller-bulletin-wrapper-content{
      padding: 8px 12px 16px 12px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(240, 20, 20);
      line-height: 24px;
    }
    /* 优惠活动区 */
.seller-supports
  .seller-supports-item{
    padding: 16px 12px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
    .decrease{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('decrease_1@2x.png');
      background-repeat: no-repeat;
      background-size: 16px 16px;
      margin-right: 6px;
      vertical-align: top
    }
    .discount{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('discount_1@2x.png');
      background-repeat: no-repeat;
      background-size: 16px 16px;
      margin-right: 6px;
      vertical-align: top
    }
    .special{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('special_1@2x.png');
      background-repeat: no-repeat;
      background-size: 16px 16px;
      margin-right: 6px;
      vertical-align: top
    }
    .invoice{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('invoice_1@2x.png');
      background-repeat: no-repeat;
      background-size: 16px 16px;
      margin-right: 6px;
      vertical-align: top
    }
    .guarantee{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('guarantee_1@2x.png');
      background-repeat: no-repeat;
      background-size: 16px 16px;
      margin-right: 6px;
      vertical-align: top
    }
    .supports-item-text{
      font-size: 12px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      line-height: 16px;
    }
/* 商家实景 */
/* 商家信息 */
.seller-infos-wrapper{
  margin: 18px;
}
.seller-infos-title{
  padding: 12px 12px 12px 0;
  font-weight: 500;
  font-size: 18px;
}
.seller-infos-content{
  padding: 16px 12px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 12px;
  font-weight: 200;
  color: rgb(7, 17, 27);
  line-height: 16px;
}
</style>
