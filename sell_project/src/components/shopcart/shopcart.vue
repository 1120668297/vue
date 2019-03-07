<template>
  <div class="shopcart">
    <div class="shopcart-content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart" :class="{hightLight: totalPrice>0}"></span>
          </div>
          <div class="foods-num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="shopcart-price" :class="{lightHeight: totalPrice>0}">￥{{totalPrice}}</div>
        <div class="shopcart-desc">另须配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <!--  （1）v-if实现三种状态的变化非函数法
        <div class="shopcart-pay" v-if="totalPrice === 0">￥{{minPrice}}起送</div>
        <div class="shopcart-pay" v-if="totalPrice>0&&totalPrice<minPrice">还差￥{{minPrice-totalPrice}}起送</div>
        <div class="shopcart-pay light" v-if="totalPrice>=minPrice">去结算</div>
        -->
        <!-- （2）函数法实现三种状态的变化payDesc,函数法payClass实现三种状态下不同样式 -->
        <div class="shopcart-pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <!-- 购物车弹出层 -->
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="shopcart-title">购物车</h1>
        <span class="shopcart-empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="shopcart-food" v-for="food in selectFoods" :key="food.id">
            <span class="food-name">{{food.name}}</span>
            <div class="food-price">￥{{food.price*food.count}}</div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '../cartcontrol/cartcontrol'

export default{
  data () {
    return {
      fold: true,
      listShow: false
    }
  },
  props: {
    deliveryPrice: Number,
    minPrice: Number,
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10, count: 0
          }
        ]
      }
    }
  },
  computed: {
    // 计算目前所购物品总价
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 计算目前所购物品的数量
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 计算三种结算状态 反单引号(实现动态字符串)中${diff}实现的即是{{diff}}效果
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 函数法payClass实现三种状态下不同样式
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        this.listShow = false
        return
      }
      this.listShow = true
    }
  }
}
</script>

<style>
@import url('../../common/stylus/icon.styl');
@import url('../../../static/reset.css');
.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50; /*购物车图片有突出部分需显示出来*/
  width: 100%;
  height: 48px;
}
  .shopcart-content{
    display: flex;
    width: 100%;
    height: 48px;
    background: #141d27;
    font-size: 0;/*解除inline-block元素之间的间距*/
  }
    .content-left{
      flex: 1;
    }
      .logo-wrapper{
        display: inline-block;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        position: relative;/*设置购物车区域向上偏移10px*/
        top: -10px;
        border-radius: 50%;
        background: #141d27;
        vertical-align: top;
      }
        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
        }
        .foods-num{
          font-size: 9px;
          line-height: 16px;
          width: 24px;
          height: 16px;
          background: rgb(240, 20, 20);
          color: rgb(255, 255, 255);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          font-weight: 700;
          border-radius: 16px;
          text-align: center;
          position: relative;
          top: -50px;
          left: 20px;
        }
          .icon-shopping_cart{
            display: inline-block;/*span须转换为块级元素才可设置宽高*/
            width: 30px;
            height: 30px;
            background: #80858a;
            border-radius: 50%;
            position: relative;
            left: 8px;
            top: 7px;
          }
          .hightLight{
            background: rgb(0, 160, 220);
          }
      .shopcart-price{
        display: inline-block;
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.2);
        margin: 12px 0px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        vertical-align: top;
      }
      .lightHeight{
        color: #fff;
      }
      .shopcart-desc{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        margin: 12px 0 0 12px;
        font-size: 10px;
      }
    .content-right{
      flex: 0 0 105px;
      width: 105px; /*手机端需写width*/
      background: #2b333b;
    }
      .shopcart-pay{
        font-size: 12px;
        font-weight: 700;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
      }
      .not-enough{
        background: #2b333b;
      }
      .enough{
        background: #00b43c;
        color: #fff;
      }
/* 购物车弹出层 */
.shopcart-list{
  width: 100%;
  /* max-height: 305px; */
  /* background: red; */
  position: absolute;  /*相对于父级shopcart定位*/
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
