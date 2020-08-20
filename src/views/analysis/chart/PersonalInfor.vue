<template>
  <visual-box :title="chartData.title" class-name="personal-infor">
    <template v-slot:main>
      <el-container>
        <el-aside width="180px">
          <img :src="'data:image/jpeg;base64,' + chartData.url" />
        </el-aside>
        <el-main>
          <div class="text-box">
            <p v-for="(data,index) in chartData.data" :key="index">
              <span>{{data.name}}：</span>
              <span>{{data.value}}</span>
            </p>
          </div>
        </el-main>
        <el-tooltip content="警员切换" effect="dark" placement="bottom">
          <person-change class="right-menu-item hover-effect" />
        </el-tooltip>
      </el-container>
    </template>
  </visual-box>
</template>
<script>
import VisualBox from '../visualBox'
import PersonChange from '@/views/analysis/components/Personchange'
export default {
  components: {
    VisualBox,
    PersonChange
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
  }
};
</script>

<style lang='scss' scoped>
.personal-infor {
  height: 266px;
  overflow: hidden;
}
.el-container {
  margin-top: 10px;
  position: relative;
}
.el-aside {
  background-color: transparent;
  margin-bottom: 0;
  padding-left: 0;
  height: 224px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
.el-tooltip {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #0091d0;
  border-radius: 50%;
  padding: 4px;
}
.el-main {
  padding: 0;
  .text-box {
    color: #fff;
    p {
      margin: 8px 0;
      line-height: 1.5em;
    }
  }
}
</style>