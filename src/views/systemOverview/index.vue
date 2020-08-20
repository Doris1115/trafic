<template>
  <div
    :style="'background-image:url('+ Background +');background-repeat: no-repeat;  background-size: 100% 100%; height:100%; width:100%'">
    <subsystem />
  </div>
</template>
<script>
import Subsystem from '@/components/Subsystem'
import Background from '@/assets/images/login.jpg'

export default {
  name: "system-overview",
  components: {
    Subsystem
  },
  data() {
    return { Background: Background }
  }

}
</script>

