<template>
  <BetterScorll
    class="box"
    @pullingDown="pullingDown"
    @pullingUp="pullingUp"
    @scroll="scroll"
    @getBs="getBs"
    :isPullingUp="isPullingUp"
    :isPullingDown="isPullingDown"
    :option="{
      scrollY: true,
      pullDownRefresh: true,
      pullUpLoad: true,
      click: true,
      probeType: 3,
      preventDefaultException: {
        className: /(^|\s)(btn)(\s|$)/,
        tagName: /p/
      },
    }"
    ><div slot="content" class="content_body" >
      <div class="ccc" v-for="i in 10" :key="i">
        {{ i }}
      </div>
      <p @mousedown="hand">asd</p>
      <demo class="sdad sad" ></demo>
    </div>
  </BetterScorll>
</template>

<script>
import BetterScorll from "@/components/BetterScorll/BetterScorll.vue"
import demo from "./demo"
export default {
  name: "bsdemo",
  data() {
    return {
      bs: null,
      isPullingDown: 1,
      isPullingUp: 1,
      num: 20,
    }
  },
  components: { BetterScorll, demo },
  created() {},
  mounted() {},
  methods: {
    hand() {
      console.log('asdsad');
    },
    mousedown() {
      console.log('鼠标点击');
      this.$router.push({
        path: 'CareerLine'
      })
    },
    getBs(bs) {
      this.bs = bs
    },
    scroll(p) {
      console.log(this.bs.pending)
    },
    pullingUp() {
      if (this.num >= 60) {
        this.isPullingUp = 3
        return
      }
      this.isPullingUp = 1
      setTimeout(() => {
        this.num += 20
        this.$nextTick(() => {
          this.isPullingUp = 2
        })
      }, 1000)
    },
    pullingDown() {
      console.log("刷新中")
      this.isPullingDown = 2
      setTimeout(() => {
        console.log("结束")
        this.num = 20
        this.isPullingDown = 3
        setTimeout(() => {
          this.isPullingDown = 1
          this.isPullingUp = 1
        }, 300)
      }, 1000)
    },
  },
  computed: {},
  watch: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>
<style lang="less" scpoed>
@import url("~@/components/BetterScorll/loderstyle.css");
.content_body {
  padding-bottom: 500px;
}
.loader {
  border-top: 10px solid currentcolor;
  border-right: 10px solid transparent;
  -webkit-animation: loader-19 1s linear infinite;
  animation: loader-19 1s linear infinite;
  border-radius: 100%;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}

.loader_up:before,
.loader_up:after,
.loader_up {
  display: inline-block;
  width: 50px;
  height: 50px;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
  border-radius: 50%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: loader_up 1.8s infinite ease-in-out;
  animation: loader_up 1.8s infinite ease-in-out;
}
.loader_up {
  color: currentcolor;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  top: -1em;
}
.loader_up:before {
  right: 100%;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader_up:after {
  left: 100%;
}
.loader_up:before,
.loader_up:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: inherit;
  height: inherit;
}
@-webkit-keyframes loader_up {
  0%,
  80%,
  100% {
    box-shadow: 0 50px 0 -50px;
  }
  40% {
    box-shadow: 0 50px 0 -10px;
  }
}
@keyframes loader_up {
  0%,
  80%,
  100% {
    box-shadow: 0 50px 0 -50px;
  }
  40% {
    box-shadow: 0 50px 0 -10px;
  }
}
</style>
