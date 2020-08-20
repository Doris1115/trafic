<template>
  <div>
    <!-- <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" /> -->
    <svg-icon icon-class="switch" @click="click" />
    <el-dialog title="系统选择" :visible.sync="dialogVisible" :center="true" :modal-append-to-body="false" width="550px"
      :before-close="handleClose">
      <div style="height: 300px">
        <subsystem @onSelectSubsystem="dialogVisible = false" />
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

  </div>
</template>

<script>
import Subsystem from '@/components/Subsystem'

export default {
  name: 'SubsystemChange',
  components: {
    Subsystem
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      this.dialogVisible = true
    },
    init() {

    },
    destroy() {

    },
    handleClose(done) {
      //   this.$confirm('确认关闭？')
      // .then(_ => {
      done();
      // })
      // .catch(_ => { });
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
