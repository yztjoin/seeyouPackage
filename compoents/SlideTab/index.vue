<template>
  <div class="SlideTab_boxtop" ref="SlideTabTab">
    <span
      :class="{ active: index == indexTab }"
      v-for="(item, index) in titArr"
      :key="index"
      @click="changeTab($event, index)"
      ref="tabItem"
      >{{ item }}<slot :name="'num' + index"></slot
    ></span>
  </div>
</template>

<script>
export default {
  name: "SlideTab",
  props: {
    titArr: {
      type: Array,
      default() {
        return []
      },
    },
    PindexTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      indexTab: 0,
      barOffsetArr: [],
    }
  },
  components: {},
  created() {
    this.indexTab = this.PindexTab
  },
  mounted() {
    this.$refs.tabItem.forEach((value) => {
      this.barOffsetArr.push(value.offsetLeft + value.offsetWidth / 2)
    })
    this.left = this.barOffsetArr[this.indexTab]
    this.$refs.SlideTabTab.style.setProperty("--line-left", this.left + "px")
  },
  methods: {
    changeTab(event, index) {
      let before = this.indexTab
      if (index == this.indexTab) return
      this.left = this.barOffsetArr[index]
      this.$refs.SlideTabTab.style.setProperty("--line-left", this.left + "px")
      this.indexTab = index
      this.$emit("changeTab", [index, before])
    },
  },
  computed: {},
  watch: {
    PindexTab: {
      handler(n, o) {
        this.indexTab = n
        this.left = this.barOffsetArr[this.indexTab]
        this.$refs.SlideTabTab.style.setProperty("--line-left", this.left + "px")
      },
    },
  },
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

.SlideTab_boxtop {
  z-index: 9;
  left: 0;
  right: 0;
  position: relative;
  display: flex;
  font-size: 34px;
  height: 80px;
  align-items: center;
  span {
    height: 100%;
    flex: 1;
    line-height: 80px;
    text-align: center;
    font-size: 32px;
  }
  span.active {
    font-weight: 600;
    color: #000000;
    // background: aqua;
  }
}
.SlideTab_boxtop::after {
  content: "";
  position: absolute;
  display: inline-block;
  bottom: 0px;
  left: var(--line-left);
  transition: left 0.4s;
  transform: translateX(-50%);
  width: 40px;
  height: 8px;
  background: linear-gradient(90deg, #ffbf07 0%, #ff8b03 100%);
  border-radius: 4px;
}
</style>
