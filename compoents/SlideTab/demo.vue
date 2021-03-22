<template>
  <div>
    
    <SlideTab :titArr='["首页","美食","首页","美食","首页","美食"]' @changeTab='hand'></SlideTab>
    
  </div>
</template>

<script>
import SlideTab from './index'
export default {
  name: "demo",
  data() {
    return {
      indexTab: 0,
      content: "Content1",
      transitionName: "slide-fade",
      left: 0,
    }
  },
  components: {  },
  created() {},
  mounted() {
   
  },
  methods: {
    hand(index) {
      console.log(index)
    }
  },
  computed: {},
  watch: {},
}
</script>

<style lang="less" scpoed>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter {
  transform: translateX(-100%);
}
.slide-fade-enter-to {
  transform: translateX(0%);
}
.slide-fade-leave {
  transform: translateX(0%);
}
.slide-fade-leave-to {
  transform: translateX(100%);
}

.reSlide-fade-enter-active,
.reSlide-fade-leave-active {
  transition: all 0.5s;
}
.reSlide-fade-enter {
  transform: translateX(100%);
}
.reSlide-fade-enter-to {
  transform: translateX(0%);
}
.reSlide-fade-leave {
  transform: translateX(0%);
}
.reSlide-fade-leave-to {
  transform: translateX(-100%);
}

.header {
  z-index: 99;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  font-size: 34px;
  height: 80px;
  align-items: center;
  span {
    height: 100%;
    flex: 1;
    line-height: 80px;
    text-align: center;
    background: #c6c6c6;
  }
  span.active {
    // background: aqua;
  }
}
.header::after {
  content: "";
  position: absolute;
  display: inline-block;
  height: 8px;
  width: 80px;
  background: red;
  bottom: 5px;
  border-radius: 10px;
  left: var(--line-left);
  transition: left 0.4s;
  transform: translateX(-50%);
}
.content {
  position: relative;
  padding-top: 80px;
}
</style>
