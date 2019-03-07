<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" :key="itemClass.index"></span>
    <!-- {{size}}/{{score}} -->
  </div>
</template>

<script type="text/ecmascript-6">
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
const LENGTH = 5

export default{
  props: {
    size: Number,
    score: Number
  },
  computed: {
    itemClasses: function () { // 依据评分计算star数量和类型
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = this.score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 1; i <= integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      for (let i = (result.length - 1); i < LENGTH; i++) {
        result.push(CLS_OFF)
      }
      result.length = result.length - 1
      return result
    }
  }
}
</script>

<style>
.star-item{
  display: inline-block;
  width: 20px;
  height: 20px;
}
.on{
  /* color: aqua; */
  background-image: url('star36_on@2x.png');
  background-repeat: no-repeat;
  background-size: 15px 15px
}
.half{
  /* color: red */
  background-image: url('star36_half@2x.png');
  background-repeat: no-repeat;
  background-size: 15px 15px
}
.off{
  /* color: blue */
  background-image: url('star36_off@2x.png');
  background-repeat: no-repeat;
  background-size: 15px 15px
}
</style>
