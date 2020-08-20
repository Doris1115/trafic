<template>
  <el-container class="dash-board">
    <load />
    <el-header>
      <div class="head_top">
        <span>湘潭市交通大数据研判分析平台</span>
      </div>
      <ul class="head-nav left">
        <router-link :to="{ name: 'Percancy'}" tag="li">
          违法
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
        <router-link :to="{ name: 'Alarm'}" tag="li">
          拥堵流量
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </ul>
      <ul class="head-nav right">
        <router-link :to="{ name: 'Percancy'}" tag="li">
          <i class="el-icon-d-arrow-left"></i>稽查布控
        </router-link>
        <router-link :to="{ name: 'PoliceTrack'}" tag="li">
          <i class="el-icon-d-arrow-left"></i>民警足迹
        </router-link>
      </ul>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import Load from './load'

export default {
  components: {
    Load
  },
  data() {
    return {
      isShow: false
    }
  },


};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  overflow: visible;
}
.el-header {
  padding: 0;
}
.dash-board {
  height: 100%;
  padding: 15px;
  background: #061537;
  overflow: hidden;
  position: relative;
  z-index: 99;
}

.head_top {
  position: relative;
  background: url(/static/images/jcdsj_logo.png) no-repeat center center;
  height: 42px;
  line-height: 42px;
  // background-size: 100% 100%;
  span {
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    background: linear-gradient(0deg, #0095d6, #46daff);
    background-size: cover;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    font-weight: bolder;
    cursor: text;
  }
}
.head-nav {
  position: absolute;
  top: 22px;
  left: 50%;
  padding-left: 0;
  width: 200px;
  margin-left: -550px;
  &.right {
    margin-left: 350px;
    li {
      margin-left: 20px;
      margin-right: 0px;
    }
  }
  li {
    float: right;
    list-style: none;
    margin-right: 20px;
    margin-left: 0px;
    cursor: pointer;
    overflow: hidden;
    color: #fff;
    font-size: 1em;
    &:hover,
    &.router-link-exact-active {
      font-weight: bold;
      background: linear-gradient(0deg, #0095d6, #46daff);
      background-size: cover;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    span {
      font-size: 1em;
    }
  }
  .el-button {
    color: #fff;
    display: block;
    position: absolute;
    top: 10px;
    left: 70px;
    width: 90px;
    height: 30px;
    background-color: transparent;
  }
}
</style>

