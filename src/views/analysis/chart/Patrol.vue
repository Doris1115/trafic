<template>
  <visual-box :title="chartData.title" class="patrol-box">
    <template v-slot:main>
      <div class="block">
        <el-carousel  height="100%" indicator-position="none" :autoplay="false">
          <el-carousel-item v-for="(item,index) in chartData.data" :key="index">
            <img :src="'data:image/jpeg;base64,' + item.url" />
            <h3 class="small">{{ item.text }}</h3>
            <p>{{index+1}}/{{chartData.data.length}}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </template>
  </visual-box>
</template>
<script>
import VisualBox from '../visualBox'
export default {
  components: {
    VisualBox
  },
  props: {
    className: {
      type: String,
      default: 'visual_chart'
    },
    chartData: {
      type: Object,
      required: true
    }
  },

};
</script>

<style lang='scss' scoped>
.patrol-box {
    height: calc(50% - 140px);
}

.block {
  height: calc(100% - 45px);
  position: relative;
}
.el-carousel {
  position: absolute;
  bottom: 0;
  width: 100%;
  top: 5px;
  height: 100%;
}
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    color: #fff;
    right: 10px;
    bottom: -6px;
  }
  h3 {
    position: absolute;
    bottom: -16px;
    color: #fff;
    text-align: center;
    width: 100%;
    font-weight: normal;
    font-size: 14px;
    background: #000;
    opacity: 0.5;
    line-height: 40px;
  }
}
</style>