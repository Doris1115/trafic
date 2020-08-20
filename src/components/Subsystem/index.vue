<template>
  <div class="backgroud">
    <el-row>
      <el-col :span="8" v-for="(item,index) in subsystems" :key="item.subsystemId" :offset="0">
        <el-card style="padding: 0px; margin: 5px;" :body-style="{ padding: '0px', margin: '0px' }" shadow="always"
          @click.native="selectSubsystem(item)">
          <div :class="'carstyle' + index % 5">
            <!-- <i class="el-icon-trophy" style="font-size: 400%;color: #FFFFFF;font-style: normal;border-radius:15px;"></i> -->
            <svg-icon :icon-class="item.icon"
              style="font-size: 400%; color: #FFFFFF; font-style:normal;border-radius:15px; width:150px;" />
            <span style="color: #FFFFFF;">{{ item.subsystemName }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import crudSystemInfo from '@/api/system/subsystem'

export default {
  name: "subsystem",
  data() {
    return {
      currentDate: new Date(),
      subsystems: []
    }
  },
  created() {
    crudSystemInfo.getEnabled().then(res => {
      console.log(res)
      this.subsystems = res;
    })
  },
  methods: {
    selectSubsystem(subsystem) {
      if (subsystem.subsystemId === 'map') {
        // this.$router.push({ path: '/map' })
        window.open('/map', "_blank");
      } else if (subsystem.subsystemId === 'analysis') {
        // this.$router.push({ path: '/analysis' })
        window.open('/analysis/percancy', "_blank");
      } else {
        // this.$store.dispatch('updateLoadMenus', true).then(res => { })
        this.$emit('onSelectSubsystem')
        sessionStorage.setItem('subsystem', subsystem.subsystemId)
        this.$store.dispatch('ChangeSubsystem', subsystem).then(() => {
          console.log('ChangeSubsystem button')
          console.log(subsystem.defaultPath)
          this.$router.push({ path: subsystem.defaultPath })
          // this.$router.push({ path: this.redirect || subsystem.defaultPath })
          // this.$router.push('/user/center')
          // this.$router.push('/system/user')
        }).catch((err) => {
          console.log(err)
        })
      }


      //   this.$store.state.permission.routers
      //   this.$nextTick(() => {
      //       debugger
      //     this.$router.push({ path: '/system/user' })
      //   })
    }
  }

}
</script>

<style>
.carstyle0 {
  background-color: #409EFF;
  /* width: 300px; */
  height: 160px;
  text-align: center;
  display: grid;
}
.carstyle1 {
  background-color: #67C23A;
  /* width: 300px; */
  height: 160px;
  text-align: center;
  display: grid;
}
.carstyle2 {
  background-color: #E6A23C;
  /* width: 300px; */
  height: 160px;
  text-align: center;
  display: grid;
}
.carstyle3 {
  background-color: #F56C6C;
  /* width: 300px; */
  height: 160px;
  text-align: center;
  display: grid;
}
.carstyle4 {
  background-color: #909399;
  /* width: 300px; */
  height: 160px;
  text-align: center;
  display: grid;
}
.backgroud {
  width: 500px;
  height: 333px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0);
}
</style>
