<template>
  <div class="goods">
    <!-- 左侧分类菜单区域 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul><!--ref用于绑定dom,但ref中dom对象不能使用-写法即menu-wrapper须改为驼峰或无-写法即menuWrappe,可用$refs获取元素-->
        <li class="menu-item" v-for="(item,id) in goods" :key="item.index" @click="selectMenu(id,$event)"
        :class="{'menu-current':currentIndex===id}">
          <span class="goods-text">
            <span class="menu-icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧相关类别商品区 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" :key="item.index" class="food-list food-list-hook">
          <h1 class="food-title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food.flag" class="food-item" @click="selectFood(food)">
              <div class="food-icon">
                <img :src="food.icon" width="100%" height="100%" class="food-icon-img">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-desc">{{food.description}}</p>
                <div class="food-extra">
                  <span style="padding-right:12px">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <!-- :class="{className:判断条件}" -->
                  <!-- <span v-if="food.oldPrice" class="priceColor">${{food.price}}</span> -->
                  <!-- <span v-else>${{food.price}}</span> -->
                  <span class="priceColor">￥{{food.price}}</span>
                  <!-- 如果存在oldPrice则划掉原来的价格 -->
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <span class="food-line" v-show="food.oldPrice"></span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- 父组件向子组件传值，第一个food须与子组件carcontrol中props一致，第二个food需传入的值 -->
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 将购物车状态与选择商品数量联动，指令须写select-foods与selectFoods对应 -->
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
    <!-- 单个商品页面 -->
    <!-- ref:food表示绑定子组件（类似绑定dom），便于调用子组件的show方法 -->
    <food :foodItem="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'

const ERR_OK = 0
export default{
  props: {
    seller: Object
  },
  data () {
    return {
      goods: [], // 用于存储每个商品对象
      classMap: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {} // food组件传递已选商品
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        // console.log(this.goods)
        // vue中修改数据时，dom也会随着数据做映射
        // 但vue更新dom是异步的即vue中dom更新不会自动执行，须在nextTick方法中更新dom

        // better-scroll初始化时机很重要，因为它在初始化的时候，会计算父和子元素高度和宽度，来决定是否可以纵向和横向滚动。
        // 因此，我们在初始化它的时候，必须确保父元素和子元素的内容已经正确渲染了。
        // 如果子元素或者父元素DOM结构发生改变的时候，必须重新计算高度和宽度来确保滚动效果的正常。
        // 所以同学们反馈的 better-scroll 不能滚动的原因多半是初始化better-scroll的时机不对，
        // 或者是当 DOM 结构发送变化的时候并没有重新计算better-scroll。
        this.$nextTick(() => {
          // $nextTick(()=>{对dom的操作})对dom操作最好放入其中,dom会随数据做映射但系统中dom更新需要使用此方法
          this._initScroll() // 重新获取已更新的dom
          // 设置商品滚动效果与左侧类别商品的对应，在更新dom后执行该方法
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    // food组件：将须查看详情的商品加入selectFood对象中，然后将该对象传给food组件，在组件中渲染
    selectFood (food) {
      this.selectedFood = food
      this.$refs.food.show() // 调用子组件food的show方法。this.$refs.food->找到子组件对象
    },
    // 点击左侧商品类别名称跳转右侧商品，better-scroll实现
    selectMenu (index, event) {
      // console.log(index) // 输出点击了左侧哪一个商品名下标
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let ref = foodsList[index]
      this.foodsScroll.scrollToElement(ref, 300)
    },
    // 初始化BScroll,$refs.menuWrapper获取dom元素
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 1.记录右侧每一个类别的商品所占y轴的区间并与左侧商品类别一一映射 2.计算当前顶部商品所在的y值y1
    // 3.计算出y1值所在哪一类别商品中，通过class数组设置左侧选中样式 4.点击左侧类别商品名时同时将右侧所对应的第一件商品置顶y
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        // class=“food-list-hook”标签总长度,clientHeight:该dom可视区域的高度不记滚动条和border
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () { // 遍历商品列表，挑选出选择数量>0的商品
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) { // 不同组件中对象的属性的值的改变是同步的新增属性count的值在cartcontrol组件中改变了
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  components: {
    shopcart, cartcontrol, food
  }
}
</script>

<style>
.goods{
  position: absolute;
  top: 175px;
  bottom: 46px;
  width: 100%;
  display: flex;
  overflow: hidden;
}
  .menu-wrapper{
    width: 80px;
    flex: 0 0 80px; /*0表示存在剩余空间也不放大，0表示剩余空间不足时也不缩小，80px表示占据固定的主轴空间（水平方向）*/
    background: #f3f5f7;
  }
    .menu-item{
      display: table;
      width: 80px;
      height: 54px;
    }
    .menu-current{
      position: relative;
      z-index: 10;
      margin-top: -1px;
      background: #fff;
      font-weight: 700px;
    }
      .goods-text{
        display: table-cell;
        width: 48px;
        font-size: 12px;
        font-weight: 100px;
        line-height: 14px;
        padding:24px 0 0 14px;
      }
        .decrease{
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('decrease_1@2x.png');
          background-repeat: no-repeat;
          background-size: 16px 16px;
          /* margin-right: 6px; */
          vertical-align: top
        }
        .discount{
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('discount_1@2x.png');
          background-repeat: no-repeat;
          background-size: 16px 16px;
          /* margin-right: 6px; */
          vertical-align: top
      }
        .special{
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('special_1@2x.png');
          background-repeat: no-repeat;
          background-size: 16px 16px;
          /* margin-right: 6px; */
          vertical-align: top
        }
        .invoice{
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('invoice_1@2x.png');
          background-repeat: no-repeat;
          background-size: 16px 16px;
          /* margin-right: 6px; */
          vertical-align: top
        }
        .guarantee{
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('guarantee_1@2x.png');
          background-repeat: no-repeat;
          background-size: 16px 16px;
          /* margin-right: 6px; */
          vertical-align: top
        }
/* 右侧相关类别商品区 */
  .foods-wrapper{
    flex: 1;/*0表示存在剩余空间也不放大，1表示等分剩余空间*/
  }
    .food-list{
      width: 100%;
    }
      .food-title{
        line-height: 48px;
        padding-left: 12px;
        color: rgb(147, 153, 159);
        font-size: 17px;
        background: #f3f5f7;
        border-left: 2px solid rgba(7, 17, 27, 0.1);
      }
      /* 左侧图片区域大小固定，右侧商品信息自适应flex布局 */
        .food-item{
          padding: 18px;
          display: flex;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
          .food-icon{
            width: 57px;
            height: 57px;
            flex: 0 0 57px;
          }
            .food-icon-img{
              width: 100%;
              height: 100%;
            }
        .food-content{
          padding-left: 14px;
          flex: 1;
        }
          .food-name{
            padding: 2px 0 8px 0;
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            height: 14px;
          }
          .food-desc{
            padding-bottom: 8px;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }
          .food-extra{
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }
          .food-price{
            padding-top: 6px;
            font-size: 10px;
          }
            .priceColor{
              font-size: 14px;
              color: rgb(240, 20, 20);
              line-height: 24px;
              font-weight: bold;
              margin-right: 8px;
            }
            .food-line{
              border-bottom: 1px rgb(147, 153, 159) solid;
              display: inline-block;/*span设置width和height无效*/
              width: 25px;
              position: relative;
              left: -22px;
              top: -5px;
            }
  /* cartcontrol组件设置 */
  .cartcontrol-wrapper{
    position: relative;
    right: 18px;
    top: 50px;
  }
</style>
