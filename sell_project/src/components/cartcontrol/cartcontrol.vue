<template>
  <div class="cartcontrol">
    <!-- 尚未添加动画效果 -->
    <transition class="move">
      <!-- click.stop.prevent表示阻止事件冒泡,即在点击此处时只能触发此处的事件,防止触发同时设置在此处的其他事件
      如food组件显示处事件与此事件作用范围有部分重叠(即防止同时展示food组件页) -->
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">-</div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">+</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'

export default{
  props: {
    food: Object
  },
  methods: {
    addCart () {
      // console.log('123')
      if (!this.food.count) {
        // food对象开始并无count属性，所以在vue中需用Vue.set方法为该对象添加一个属性并赋初值为1
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  },
  created () { // 判断父组件传值是否成功
    // console.log(this.food)
  }
}
</script>

<style>
.cartcontrol{
  font-size: 0px;
}
  .cart-decrease, .cart-add{
    display: inline-block;
    box-sizing: border-box;
    font-size: 20px;
    text-align: center;
    margin: 6px;
    border-radius: 50%;
  }
  .cart-decrease{
    line-height: 14px;
    width: 18px;
    height: 20px;
    background: #fff;
    color: rgb(0, 160, 220);
    border: 2px solid rgb(0, 160, 220);
  }
  .cart-count{
    display: inline-block;
    color: rgb(147, 153, 159);
    font-size: 10px;
    padding-top: 5px;
    vertical-align: top;
    width: 12px;
    line-height: 24px;
    text-align: center;
  }
  .cart-add{
    line-height: 17px;
    width: 20px;
    height: 20px;
    background: rgb(0, 160, 220);
    color: #fff;
  }
  /* 动画效果 */
</style>
