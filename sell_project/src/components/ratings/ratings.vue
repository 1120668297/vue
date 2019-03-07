<template>
  <div class="ratingsAll" ref="ratingsAll">
  <div class="bscroll-container">
    <div class="ratings-overview">
      <div class="ratings-overview-left">
        <h1 class="overview-left-score">{{seller.score}}</h1>
        <div class="overview-left-title">综合评分</div>
        <div class="overview-left-rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="ratings-overview-right">
        <div class="overview-right-top">
          <span class="overview-right-top-title">服务态度</span>
          <star :size="36" :score="seller.serviceScore" class="overview-right-top-star"></star>
          <span class="overview-right-top-score">{{seller.serviceScore}}</span>
        </div>
        <div class="overview-right-middle">
          <span class="overview-right-top-title">服务态度</span>
          <star :size="36" :score="seller.serviceScore" class="overview-right-top-star"></star>
          <span class="overview-right-top-score">{{seller.foodScore}}</span>
        </div>
        <div class="overview-right-bottom">
          <span class="overview-right-top-title">送达时间</span>
          <span class="overview-right-bottom-title">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <!-- 分界线split组件 -->
    <split></split>
    <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="seller.ratings"></ratingselect>
    <!-- 用户评价部分 -->
    <div class="ratings-wrapper">
      <ul>
        <li v-for="rating in ratings" :key="rating.index" class="ratings-item">
          <div class="rating-item-avatarDv">
            <img :src="rating.avatar" alt="" class="rating-item-avatar">
          </div>
          <div class="rating-item-content">
            <h1 class="rating-item-name">{{rating.username}}</h1>
            <div class="rating-item-star">
              <star :size="24" :score="rating.score"></star>
            </div>
            <span class="rating-item-deliveryTime">{{rating.deliveryTime}}分种送达</span>
          </div>
          <div class="rating-item-text">{{rating.text}}</div>
          <div class="ratings-recommend" v-show="rating.recommend && rating.recommend.length">
            <span class="ratings-icon"></span>
            <span v-for="item in rating.recommend" :key="item.index" class="ratings-recommend-text">{{item}}</span>
          </div>
          <!-- 9-5节课程 显示评论时间 -->
          <!-- <div class="ratings-time">{{rating.rateTime | formatData}}</div> -->
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../start/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'

const ERR_OK = 0
const ALL = 2
export default {
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  props: {
    seller: {}
  },
  components: {
    star, split, ratingselect
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsAll, {
            click: true
          })
        })
      }
    })
  }
}
</script>

<style>
.ratingsAll{
  height: 493px;
  /* display: flex; */
  width: 100%;
  position: absolute;
  left: 0;
  top: 174px;
  overflow: hidden;/*若无，会出现滚动的内容覆盖已有内容*/
}
/* .bscroll-container{
  flex: 1;
} */
/* overview部分样式 */
.ratings-overview{
  width: 100%;
  height: 106px;
  display: flex;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
  .ratings-overview-left{
    flex: 0 0 137px;
    margin: 18px 0;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
  }
  /* 适应iPhone5下样式能在同一行显示，改变样式设置即设置 仅在320px屏幕宽度下按100px显示 */
  @media only screen and (max-width: 320px){
    .ratings-overview-left{
      flex: 0 0 100px;
      width: 100px;
    }
  }
   .overview-left-score{
     font-size: 28px;
     color: rgb(255, 153, 0);
     line-height: 28px;
   }
   .overview-left-title{
     font-size: 12px;
     color: rgb(7, 17, 27);
     line-height: 10px;
     padding: 6px 0 8px 0;
   }
   .overview-left-rank{
     font-size: 10px;
     color: rgb(7, 17, 27);
     line-height: 10px;
     padding-bottom: 6px;
   }
   /* overview右侧部分 */
  .ratings-overview-right{
    flex: 1;
    margin: 18px 24px;
    font-size: 0;
  }
  /* 适应iPhone5下样式可以在同一行显示 即设置仅在320px屏幕宽度条件下设置下列样式 */
  @media only screen and (max-width: 320px){
    .ratings-overview-right{
      margin-left: 8px;
    }
  }
    /* .overview-right-top{
       display: inline-block;
    } */
    /* display: inline-block应该添加到具体的单个标签上，对父级标签整体添加无法使其在一行显示 */
    .overview-right-top-title{
      display: inline-block;
      font-size: 12px;
      color: rgb(7, 17, 27);
      line-height: 18px;
      padding-right: 12px;
      vertical-align: top;
    }
    .overview-right-top-star{
      display: inline-block;
      margin: 0 6px;
      vertical-align: top;
    }
    .overview-right-top-score{
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
      line-height: 18px;
      color: rgb(255, 153, 0);
      /* line-height也应添加到具体标签上而不是添加到父级标签上 */
    }
  .overview-right-bottom-title{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 18px;
    padding-left: 8px;
  }
  /* 用户评论部分 */
  .ratings-wrapper{
    font-size: 0;
  }
  .ratings-item{
    margin: 18px 18px 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
    .rating-item-avatarDv{
      display: inline-block;
      vertical-align: top;
      padding-right: 12px;
    }
    .rating-item-avatar{
      /* display: inline-block; */
      width: 33px;
      height: 33px;
      border-radius: 50%;
    }
    .rating-item-content{
      display: inline-block;
      font-size: 0;
      /* padding: 0 */
      vertical-align: top;
    }
      .rating-item-name{
        font-size: 10px;
        color: rgb(7, 17, 27);
        line-height: 12px;
        padding-bottom: 4px;
      }
       .rating-item-star{
         display: inline-block;
         vertical-align: top;
         height: 20px;
       }
      .rating-item-deliveryTime{
        display: inline-block;
        font-size: 10px;
        font-weight: 200;
        color: rgb(147, 153, 159);
        line-height: 18px;
        vertical-align: top;
      }
    .rating-item-text{
      font-size: 12px;
      color: rgb(7, 17, 27);
      line-height: 18px;
      padding-left: 45px;
      padding-bottom: 8px;
    }
  /* 推荐部分 */
  .ratings-recommend{
    height: 18px;
    padding-left: 45px;
    margin-bottom: 18px;
    overflow: hidden;
  }
  .ratings-icon{
    display: inline-block;
    width: 18px;
    height: 18px;
    background: blueviolet;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 8px;

  }
  .ratings-recommend-text{
    display: inline-block;
    width: 30px;
    font-size: 9px;
    color: rgb(147, 153, 159);
    line-height: 16px;
    border: 1px solid rgb(147, 153, 159);
    margin-right: 8px;
    padding: 0 6px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
