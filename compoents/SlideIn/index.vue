<template>
  <div class="SlideIn_boxtop">
    <div class="SlideIn_boxtop-content" :class="slideContentClass">
      <slot name="content"></slot>
    </div>
    <transition name="fade">
      <div class="seeyou-shade" @click="isShowFn" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SlideIn",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    slidePosition: {
      type: String,
      default: "bottom",
    },
  },
  data() {
    return {

    }
  },
  components: {},
  created() {},
  mounted() {
  },
  methods: {
    isShowFn() {
      this.$emit("update:isShow", !this.isShow)
    },
  },
  computed: {
    slideContentClass() {
      return {
        "SlideIn_boxtop-content--left_hidden": this.slidePosition == "left" && !this.isShow,
        "SlideIn_boxtop-content--left": this.slidePosition == "left",
        "SlideIn_boxtop-content--bottom_hidden": this.slidePosition == "bottom" && !this.isShow,
        "SlideIn_boxtop-content--bottom": this.slidePosition == "bottom",
        "SlideIn_boxtop-content--top_hidden": this.slidePosition == "top" && !this.isShow,
        "SlideIn_boxtop-content--top": this.slidePosition == "top",
        "SlideIn_boxtop-content--right_hidden": this.slidePosition == "right" && !this.isShow,
        "SlideIn_boxtop-content--right": this.slidePosition == "right"
      }
    },
  },
  watch: {},
}
</script>

<style lang='less' scpoed>
@import url('../effectsEtyle.less');
.SlideIn_boxtop-content {
  position: fixed;
  z-index: 99;
  transition: 0.5s transform;
}
.SlideIn_boxtop-content--bottom {
  bottom: 0px;
  left: 0;
  right: 0;
}
.SlideIn_boxtop-content--left {
  top: 0px;
  bottom: 0px;
  left: 0px;
}
.SlideIn_boxtop-content--top {
  top: 0px;
  left: 0px;
  right: 0px;
}
.SlideIn_boxtop-content--right {
  top: 0px;
  right: 0px;
  bottom: 0px;
}
.SlideIn_boxtop-content--left_hidden {
  transform: translateX(-100%);
}
.SlideIn_boxtop-content--bottom_hidden {
  transform: translateY(100%);
}
.SlideIn_boxtop-content--right_hidden {
  transform: translateX(100%);
}
.SlideIn_boxtop-content--top_hidden {
  transform: translateY(-100%);
}
</style>
