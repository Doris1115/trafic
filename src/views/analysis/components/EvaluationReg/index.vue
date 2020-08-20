<template>
  <div>
    <i class="el-icon-question" @click="dialogTableVisible = true" />
    <el-dialog
      title="评分规则"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
      width="1000px"
      custom-class="model"
    >
      <div v-for="(item,index) in gridData" :key="index" class="list-box">
        <h1>{{ item.title }}</h1>
        <p v-for="(text,val) in item.data" :key="val">{{ val+1 }}、{{ text }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'PersonChange',
  data() {
    return {
      dialogTableVisible: false,
      gridData: [{
        title: '单项评分规则',
        data: ['执法视频匹配率：标准分值5分，最高分值10分，临界条件为85%，低于临界点时每少1/0%扣0.2分，最高扣10.0分，高于临界点时每多1.0%加0.55分，最高加10分。（按月算）。',
          '平均结警时长：标准分值5分，最高分值10分，临界条件为20分钟，低于临界点时每少1.0分钟加0.9分，最高加5.0分，高于临界点时每多1.0分钟扣1.0分，最高扣5.0分。（按月算）。',
          '平均出警时长：标准分值5分，最高分值10分，临界条件为8分钟，低于临界点时每少0.5分钟加0.5分，最高加5.0分，高于临界点时每多0.5分钟扣0.5分，最高扣5.0分。（按月算）。',
          '警务通主动勤务：标准分值5分，最高分值10分，临界条件为40起，低于临界点时每少1.0起扣0.125分，最高加5.0分，高于临界点时每多1.0起加0.25分，最高扣5.0分。（按月算）。',
          '勤务巡逻里程：标准分值15分，最高分值20分，临界条件为35公里，低于临界点时每少1公里扣0.5分，最高加15.0分，高于临界点时每多1.0公里加0.5分，最高扣5.0分。（按天算）。',
          '执法总量：标准分值10分，最高分值20分，临界条件为330起，低于临界点时每少1.0起扣0.03分，最高扣10.0分，高于临界点时每多1.0起加0.075分，最高加10.0分。（按月算）。',
          '大队评价：由大队火种中队长对民警当月工作进行考核评分，最高分值20分。'],
      }, {
        title: '总体评分规则',
        data: ['各项评分结果相加，按天算的考核指标取考核月期间的平均值，按月算的考核指标取考核月份的最后一天得分值。']
      }],
    }
  },

}
</script>
<style lang="scss" scoped>
i {
  color: #0091d0;
  font-size: 20px;
  margin-left: 10px;
  &:hover {
    color: #fff;
  }
}
</style>

<style lang="scss">
$primary-color: #333;
$blue-bg: linear-gradient(
  to right bottom,
  hsl(236, 50%, 50%),
  hsl(195, 50%, 50%)
);
$blue-light: hsl(236, 50%, 50%);

.el-dialog.model {
  box-shadow: 0.4rem 0.4rem 2.4rem 0.2rem hsla(236, 50%, 50%, 0.3);
  overflow: hidden;
  margin-bottom: 40px;
  padding-bottom: 0;

  .el-dialog__title {
    color: hsl(0, 0%, 100%);
    font-weight: bold;
  }
  .list-box {
    margin-bottom: 40px;
    h1 {
      color: $blue-light;
      font-size: 14px;
      border: 2px solid $blue-light;
      width: 160px;
      text-align: center;
      padding: 12px 0;
      margin-bottom: 20px;
      background: #fff;
      font-weight: normal;
      margin-left: -20px;
      box-shadow: -7px -7px 20px 0 rgba(255, 255, 255, 0.9),
        -4px -4px 5px 0 rgba(255, 255, 255, 0.9),
        7px 7px 20px 0 rgba(0, 0, 0, 0.2), 4px 4px 5px 0 rgba(0, 0, 0, 0.3);
    }
    p {
      color: $primary-color;
      font-size: 16px;
      line-height: 26px;
      margin: 10px 0;
    }
  }
  .el-dialog__close {
    color: #fff;
    border: 1px solid hsla(0, 0%, 100%, 0.4);
    font-size: 18px;
    border-radius: 50%;
    padding: 4px;
    transition: 0.2s;
    cursor: pointer;
    &:hover,
    &:focus {
      border-color: hsla(0, 0%, 100%, 0.6);
      -webkit-transform: translateY(-0.2rem);
      transform: translateY(-0.2rem);
    }
  }
  .el-dialog__header {
    background: hsl(236, 50%, 50%);
    box-shadow: 1.4rem 0.4rem 3.4rem 0.2rem rgba(14, 22, 147, 0.6);
  }
  .el-dialog__body {
    margin: 0 20px;
    max-height: 600px;
    overflow: auto;
    padding-top: 10px;
  }
  .el-button--lt-blue {
    color: #fff;
    background-color: $blue-light;
    border-color: $blue-light;
  }
}
</style>

