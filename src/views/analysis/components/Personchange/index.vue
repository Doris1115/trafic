<template>
  <div>
    <!-- <svg-icon icon-class="switch" @click="click" /> -->
    <i class="el-icon-sort" @click="click" />
    <el-dialog
      title="警员切换"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="550px"
      custom-class="model"
    >
      <div style="height: 300px">
        <!-- <subsystem @onSelectSubsystem="dialogVisible = false" /> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'PersonChange',
  components: {
    // Subsystem
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
    }
  }
}
</script>

<style scoped>
i {
  font-size: 20px;
  transform: rotate(90deg);
  color: #061537;
}
</style>

