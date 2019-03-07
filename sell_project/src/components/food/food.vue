<template>
  <div>
    <transition name="move">
      <div class="foodItem" v-show="showFlag" ref="foodItem">
        <div class="foodItem-content">
          <div class="image-header">
            <img :src="foodItem.image" class="foodItem-img">
            <div class="back">
              <i class="icon-arrow-lift" @click="hide"></i>
            </div>
          </div>
          <div class="foods-content">
            <h2 class="foodItem-title">{{foodItem.name}}</h2>
            <div class="foodItem-detail">
              <span class="sell-count">月售{{foodItem.sellCount}}份</span>
              <span class="foodItem-rating">好评率{{foodItem.rating}}%</span>
            </div>
            <div class="foodItem-price">
              <span class="price-now">￥{{foodItem.price}}</span>
              <span class="price-old" v-if="foodItem.oldPrice">￥{{foodItem.oldPrice}}</span>
            </div>
            <!-- 加入购物车以及cartcontrol组件 -->
            <div class="foods-artcontrol-wrapper">
              <cartcontrol :food="foodItem"></cartcontrol>
            </div>
            <div @click.stop.prevent="addFirst" class="buy" v-show="!foodItem.count||foodItem.count===0">
              加入购物车
            </div>
          </div>
          <!-- split组件 -->
          <split v-show="foodItem.info"></split>
          <div class="foods-info" v-show="foodItem.info">
            <div class="foods-info-title">商品介绍</div>
            <div class="foods-info-text">{{foodItem.info}}</div>
          </div>
          <split></split>
          <div class="ratings">
            <h1 class="ratings-title">商品评价</h1>
            <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="foodItem.ratings"></ratingselect>
          </div>
          <!-- 展示评价内容 -->
          <div class="rating-wrapper">
            <ul v-show="foodItem.ratings && foodItem.ratings.length">
              <!-- v-show用于控制只看内容与吐槽，推荐等部分的显示 -->
              <li v-for="rating in foodItem.ratings" :key="rating.index" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                <!-- 评价内容-》用户名称日期等 -->
                <div class="rating-wrapper-user">
                  <span class="rating-wrapper-name">{{rating.username}}</span>
                  <img class="rating-wrapper-avater" width="12px" height="12px" :src="rating.avatar">
                </div>
                <div class="rating-wrapper-time">{{rating.rateTime}}</div>
                <!-- 用户对商品的评价内容 -->
                <p class="rating-wrapper-text">
                  <span :class="{'rating-wrapper-thumb-up':rating.rateType===0,
                  'rating-wrapper-thumb-down':rating.rateType===1}">
                  </span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// better-scroll所绑定的层(父层)有一个固定/适合高度(可不设置高度但建议设置高度)，当其内容层(子级)高度超过父级高度时出现滚动
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import Vue from 'vue'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    foodItem: Object
  },
  data () {
    return {
      showFlag: false,
      selectType: POSITIVE,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    // 该方法供父组件goods点击时启动,该页面展示的同时加载better-scroll
    show () {
      this.onlyContent = false
      this.selectType = ALL
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodItem, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    // 设置隐藏事件
    hide () {
      this.showFlag = false
    },
    // 设置购买事件，点击加入购物车后隐藏该按钮并显示cartcontrol组件
    addFirst (event) { // 无参数传入则event默认为当前事件
      // console.log('12135')
      // 有cartcontrol组件可知count属性是在点击+时设置的，所以此次可能存在之前没有用count属性的现象
      // 若此前存在count属性,此次可点击也表示count为0，重置为1
      Vue.set(this.foodItem, 'count', 1)
    },
    needShow (type, text) {
      // 用于控制只看内容，推荐，吐槽等部分的评论显示
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  components: {
    cartcontrol, split, ratingselect
  }
}
</script>

<style>
/* 进入和退出的动画效果 */
.move-enter-active{
  transition: all 0.2s linear;
  transform: translate3d(100%, 0, 0);
}
.move-leave-active{
  transition: all 0.2s linear;
  transform: translate3d(100%, 0, 0);
}
.move-enter, .move-leave-to{
  transform: translate3d(0, 0, 0);
}
.foodItem {
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
}
/* 设置图片定位 */
/* 子级foodItem-img脱离文档流后，子级的width/height（设置了static以为定位的）为父级的width/height+padding */
/* 此时不论屏幕宽高如何变化，图片都是固定比例的正方形 */
  .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
   .foodItem-img{
     position: absolute;
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
   }
   /* 返回图标按钮 */
   .back{
     position: absolute;
     top: 10px;
     left: 10px;
   }
    .icon-arrow-lift{
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #fff;
      border-radius: 50%;
      line-height: 20px;
    }
/* 商品信息 */
.foods-content{
  position: relative; /*用于加入购物车和cartcontrol组件做定位*/
  padding: 18px;
  background: #fff;
}
  .foodItem-title{
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 700;
  }
  .foodItem-detail{
    margin-bottom: 18px;
    font-size: 0;
    line-height: 10px;
    height: 10px;
  }
    .sell-count, .foodItem-rating{
      display: inline-block;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .sell-count{
      margin-right: 12px;
    }
  .foodItem-price{
    font-weight: 700;
    line-height: 24px;
  }
  .price-now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .price-old{
    font-size: 10px;
    color: rgb(147, 153, 159);
    text-decoration: line-through; /*穿过文本中间的一条划线*/
  }
/* 加入购物车按钮，没有购买时显示cartcontrol组件 */
.foods-artcontrol-wrapper{
  position: absolute;
  right: 12px;
  bottom: 10px;
}
.buy{
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 10;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 12px;
  color: #fff;
  background: rgb(0, 160, 220);
}
/* 商品介绍部分split下 */
.foods-info{
  padding: 18px;
}
  .foods-info-title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .foods-info-text{
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77, 85, 93);
    line-height: 24px;
    font-weight: 200;
  }
/* ratings部分 */
.ratings{
  padding: 18px 0;
}
 .ratings-title{
   line-height: 14px;
   margin-left: 18px;
   font-size: 14px;
   color: rgb(7, 17, 27);
 }
 /* 用户评价部分 */
 .rating-wrapper{
   padding: 0 18px;
 }
  .rating-item{
    position: relative;
    padding: 10px 0;
  }
    .rating-wrapper-user{
      position: absolute;
      right: 0px;
      top: 16px;
      line-height: 12px;
      font-size: 0;
    }
      .rating-wrapper-name{
        display: inline-block;
        margin-right: 6px;
        vertical-align: top;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .rating-wrapper-avater{
        border-radius: 50%;
      }
    .rating-wrapper-time{
      margin-bottom: 6px;
      line-height: 12px;
      color: rgb(147, 153, 159);
      font-size: 10px;
    }
    .rating-wrapper-text{
      line-height: 16px;
      font-size: 12px;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper-thumb-up{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgb(0, 160, 220);
      margin-right: 4px;
      line-height: 24px;
      font-size: 12px;
    }
    .rating-wrapper-thumb-down{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 1px solid rgb(147, 153, 159);
      margin-right: 4px;
      line-height: 24px;
      font-size: 12px;
    }
</style>
