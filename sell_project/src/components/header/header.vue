<template>
  <div class="header">
    <!-- header部分左部图片 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <!-- header部分右边内容区分三个部分-->
      <div class="content">
        <!-- 第一部分文字 -->
        <div class="content-title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!-- 中间文字部分 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 第三部分，最后一排文字部分
        seller对象数据通过异步加载
        刚开始加载时App.vue中可知seller是一个空对象->header.vue中时seller只是一个空对象没有任何属性
        所以seller.supports为undefined，则刚加载页面时不加v-if判断其是否存在会出现错误
        具体解释6-03外部组件（1）-->
        <div class="support" v-if="seller.supports">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
<!-- 公告部分 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
<!-- 设置背景模糊图片 -->
    <div class="background">
      <img :src="seller.avatar" width="380px" height="134px">
    </div>
    <!-- 弹出层 添加动画效果-->
    <transition name="fade">
    <div class="detail" v-show="detailShow">
<!-- 运用sticky footer设计 -->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <!-- 由评分得到star数量组件 -->
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <!-- 优惠信息，线条自适应部分 -->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <!-- 弹出层优惠信息介绍区 -->
          <ul class="supports" v-if="seller.supports">
            <li v-for="item in seller.supports" :key="item.type" class="supports-item">
              <span :class="classMap[item.type]"></span>
              <span class="supports-text">{{item.description}}</span>
            </li>
          </ul>
          <!-- 商家公告，自适应线条区设计通优惠信息，线条自适应部分 -->
          <div class="title title-bg">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="bullentin-content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!-- 弹出层关闭模块 -->
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../start/star'

export default {
  data () {
    return {
      detailShow: false,
      classMap: []
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  props: {
    // 接受父级向子组件传递的参数seller对象
    seller: Object
  },
  components: {
    star
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style rel="stylesheet/stylus">

@import url("../../../static/reset.css");
.header {
  background: rgba(7, 17, 27, 0.5);
  height: 134px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    height: 82px;
    position: relative;
  }
    .avatar{
      float: left; /* display: inline-block;*/
      border-radius: 2px;
    }
    .content{
      float: left; /* display: inline-block;*/
      padding: 2px 0 2px 16px;
      color: rgb(255, 255, 255);
    }
    .support-count{
      width: 38px;
      height: 24px;
      font-size: 10px;
      text-align: center;
      line-height: 24px;
      position: absolute;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.2);
      right: 12px;
      bottom: 36px;
    }
      .count{
        color: rgb(255, 255, 255);
        font-weight: 100px;
      }
      .content-title{
        font-size: 16px;
        /* color: rgb(255, 255, 255); */
        line-height: 18px;
        font-weight: bold;
      }
        .brand{
          display: inline-block;
          width: 30px;
          height: 18px;
          background-image: url('brand@2x.png');
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;/*图片与文字设置对齐方式*/
        }
        .name{
          margin-left: 8px;
        }
      .description{
        font-size: 12px;
        line-height: 12px;
        font-weight: 100px;
        /* color: rgb(255, 255, 255); */
        padding-top: 8px;
      }
      .support{
        font-size: 10px;
        font-weight: 100px;
        line-height: 12px;
        padding-top: 10px;
      }
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          background-image: url('decrease_1@2x.png');
          background-size: 12px 12px;
          background-repeat: no-repeat;
          margin-right: 4px;
          vertical-align: top;
        }
        .text{
          font-size: 10px;
          font-weight: 100px;
          line-height: 12px;
        }
  .bulletin-wrapper{
    position: absolute;
    top: 106px;
    font-size: 10px;
    height: 28px;
    width: 100%;
    line-height: 28px;
    padding: 0 22px 0 8px;
    background: rgba(7, 17, 27, 0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
    .bulletin-title{
      float: left;
      margin: 8px 0px 0px 0px;
      width: 22px;
      height: 12px;
      background-image: url('bulletin@2x.png');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
    }
    .bulletin-text{
      color: rgb(255, 255, 255);
      margin: 0 4px;
    }
  .background{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    filter: blur(10px); /*设置当前标签为模糊状态*/
  }
  /* sticky footer布局 */
  /* 设置进入弹出层的动画效果 延迟0.5s*/
  .fade-enter-active{
    transition: all 0.5s;
    opacity: 1  /*完全不透明*/
  }
  /* 设置退出弹出层的动画效果 延迟2s */
  .fade-leave-active{
    transition: all 1s;
    opacity: 1 /*完全不透明*/
  }
  .fade-leave-to, .fade-enter{
    opacity: 0 /*完全透明*/
  }
  .detail{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    /* -webkit-backdrop-filter:  blur(10px) 设置模糊背景，但仅在iOS系统下有效果 */
  }
    .clearfix{
      display: inline-block;
    }
      .clearfix:after{
        display: block;
        content: '.';
        height: 0px;
        line-height: 0;
        clear: both;
        visibility: hidden;
      }
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
    }
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;/*sticky footer布局必须项*/
      }
    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
    .icon-close{ /*固定模板*/
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px red solid;
    }
     /* sticky footer布局 */
     /* 弹出层内容样式 */
    .name{
      width: 100%;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      font-weight: 355px;
      color: rgb(255, 255, 255);
      text-align: center;
    }
    .star-wrapper{
      text-align: center;
      margin-top: 16px;
      padding: 2px 0;
    }
    .title{
      width: 80%;
      display: flex;
      margin: 12px auto 24px auto;
    }
      .line{
        flex: 1;
        border-bottom: 1px solid red;
        position: relative;
        top: -7px;
      }
      .text{
        font-size: 14px;
        padding: 0 12px;
        font-weight: 700px;
        color: rgb(255, 255, 255);
      }
    /* 'decrease', 'discount', 'special', 'invoice', 'guarantee' */
    /* 弹出层优惠信息介绍区 */
    .supports{
      width: 80%;
      margin: 0 auto;
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
      .supports-item{
        padding: 0 12px;
        margin-bottom: 12px;
      }
      .supports-text{
        font-size: 12px;
        font-weight: 100px;
        color: rgb(255, 255, 255);
        line-height: 16px;
      }
      /* 商家公告，自适应线条内容区 */
    .title-bg{
      margin-top: 16px;
    }
    .bulletin{
      width: 80%;
      margin: 0 auto;
    }
      .bullentin-content{
        font-size: 12px;
        font-weight: 200px;
        line-height: 24px;
        color: rgb(255, 255, 255);
        padding: 0 12px;
      }
</style>
