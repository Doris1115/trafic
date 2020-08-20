<template>
  <el-row class="visual_conTop">
    <el-col v-for="data in chartData" :key="data.index" :span="data.spanCol" class="visual_conTop_box" :class="{visual_conTop2:data.spanCol>6}">
      <div>
        <h3>{{ data.title }}</h3>
        <p>{{ data.account }}</p>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: 'visual_chart'
    },
    chartData: {
      type: Array,
      required: true
    }}
};
</script>

<style lang='scss' scoped>
@font-face{
	font-family: yjsz;
	src:url('/static/fonts/yjsz.TTF'),
		url('/static/fonts/yjsz.eot'); /* IE9+,可以是具体的实际链接 */
	}
.el-row {
  height: 130px !important;
  margin-bottom: 10px;
  .visual_conTop_box {
    height: 100%;
    padding: 0 3px;
    & > div {
      height: 100%;
      overflow: hidden;
      h3 {
        color: #fff;
        font-size: 16px;
        padding: 0px 0 0 20px;
        white-space: nowrap;
      }
      p {
        line-height: 40px;
        color: #20dbfd;
        text-shadow: 0 0 25px #00d8ff;
        font-size: 46px;
        font-family: "yjsz";
        text-align: center;
        margin-top: 0;
      }
      .conTop_smil {
        width: 67%;
        height: 60px;
        float: left;
        padding-top: 23px;
        a {
          display: block;
          line-height: 20px;
          text-align: left;
          color: #fff;
          padding-left: 9px;
          &.sz {
            color: #fe3e12;
          }
          &.xd {
            color: #12fe81;
          }
          &.null {
            visibility: hidden;
          }
        }
        span {
          width: 32px;
          display: inline-block;
          margin-left: 3px;
        }
      }
    }
  }
  .el-col {
    height: 100%;
    & > div {
      background: url(/static/images/ksh40.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .visual_conTop2 {
    & > div {
      background: url(/static/images/ksh39.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>