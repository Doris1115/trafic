<template>
  <transition name="fade">
    <div id="load" v-show="show">
      <div class="load_img">
        <!-- 加载动画 -->
        <img class="jzxz1" src="@/assets/ksh_images/jzxz1.png" />
        <img class="jzxz2" src="@/assets/ksh_images/jzxz2.png" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {

  data() {
    return {
      show: true

    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init() {
      var _self = this
      setTimeout(function () {
        _self.show = false
      }, 100)
    }
  }
};
</script>

<style lang="scss" scoped>
/* 加载旋转动画 */
#load {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(/static/images/data08.png) no-repeat #061537;
  background-size: cover;
  top: 0;
  left: 0;
  z-index: 999;
  .load_img {
    position: absolute;
    left: calc(50% - 182px);
    top: calc(50% - 182px);
    img {
      position: absolute;
      left: 0;
      top: 0;
    }
    .jzxz1 {
      animation: xz1 8s infinite linear;
    }
    .jzxz2 {
      animation: xz2 7s infinite linear;
    }
  }
}
@keyframes xz1 {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes xz2 {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>