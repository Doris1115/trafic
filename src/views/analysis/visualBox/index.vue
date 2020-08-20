<template>
  <div class="visual_box" :class="className">
    <div class="visual_title">
      <span>{{title}}</span>
      <img src="@/assets/ksh_images/ksh33.png" />
    </div>
    <slot name="main" />
  </div>
</template>

<script>
export default {
  components: {},
  props: ['title', 'className'],
  data() {
    return {
      data: ''
    }
  }
};
</script>
<style lang='scss' scoped>
.visual_box {
  height: 33.3%;
  position: relative;
  .visual_title {
    position: relative;
    height: 35px;
    margin: 5px 0;
    span {
      color: #fff;
      font-size: 18px;
      line-height: 35px;
    }

    img {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
&.width-auto{
  img{width: auto!important;}
}
  .visual_chart {
    height: calc(100% - 35px);
  }
}
.visualSfzsfl {
  position: relative;
}
</style>