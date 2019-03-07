<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'ratingselect-active2':selectType===2}" @click="selectMode(2,$event)">
        {{desc.all}}
        <span class="ratinselect-count">57</span>
        </span>
      <span class="block positive" :class="{'ratingselect-active2':selectType===0}" @click="selectMode(0,$event)">
        {{desc.positive}}
        <span class="ratinselect-count">17</span>
        </span>
      <span class="block negative" :class="{'ratingselect-active3':selectType===1}" @click="selectMode(1,$event)">
        {{desc.negative}}
        <span class="ratinselect-count">40</span>
        </span>
    </div>
    <div class="rating-switch">
      <span class="rating-switch-icon" :class="{'rating-switch-icon-on':onlyContent}"></span>
      <span class="rating-switch-text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  methods: {
    selectMode (type, event) {
      if (!event._constructed) {
        return
      }
      this.selectType = type
    }
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default () {
        return ALL
      }
    },
    onlyContent: {
      type: Boolean,
      default () {
        return false
      }
    },
    desc: {
      type: Object,
      default () {
        return {all: '全部', positive: '满意', negative: '不满意'}
      }
    }
  }
}
</script>

<style>
.rating-type{
  padding: 18px 0;
  margin: 0 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 0px;
}
  .block{
    display: inline-block;/*存在间隙问题须设置字体大小为0解决*/
    font-size: 14px;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    color: rgb(77, 85, 93);
  }
  .positive{
    background: rgba(0, 160, 220, 0.2);
  }
  .ratingselect-active2{
    background: rgb(0, 160, 220);
  }
  .negative{
    background: rgba(209, 213, 218, 0.2);
  }
  .ratingselect-active3{
    color: rgb(209, 213, 218);
    background: rgb(77, 85, 93);
  }
  .ratinselect-count{
    font-size: 12px;
    margin-left: 2px;
  }
  /* 新增 */
  .rating-switch{
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
  }
  .rating-switch-icon{
    display: inline-block;
    width: 14px;
    height: 14px;
    background: rgb(147, 153, 159);
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
  }
  .rating-switch-icon-on{
    background: #00c850;
  }
  .rating-switch-text{
    font-size: 12px;
    vertical-align: middle;
  }
</style>
