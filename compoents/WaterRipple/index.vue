<template>
  <button
    class="WaterRipple_topbox"
    ref="WaterRipple"
    @click="click"
    @mousedown="mousedown"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "WaterRipple",
  props: {
    color: {
      type: String,
      default() {
        return "#98F5FF"
      },
    },
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {
    this.$refs.WaterRipple.style.setProperty("--color", this.color)
  },
  methods: {
    click() {
      this.$emit("click")
    },
    mousedown(e) {
      e.target.style.setProperty("--after--left", e.offsetX + "px")
      e.target.style.setProperty("--after--top", e.offsetY + "px")
      e.target.style.setProperty("--after--radius", e.target.offsetWidth + "px")
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scpoed>
button {
  border: none;
  outline-style: none;
}
.WaterRipple_topbox {
  font-size: 30px;
  padding: 10px 20px;
}
.WaterRipple_topbox {
  --after--left: 0px;
  --after--top: 0px;
  --ater--radius: 0px;
  --transition--time: 0.5s;
}
.WaterRipple_topbox {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.5s;
  background: var(--color);
}
@keyframes water {
  0% {
    box-shadow: 0 0 0 0 var(--color);
  }
  100% {
    box-shadow: 0 0 5px 10px #fff;
  }
}
.WaterRipple_topbox::after {
  position: absolute;
  display: inline-block;
  content: "";
  width: 0px;
  height: 0px;
  left: var(--after--left);
  top: var(--after--top);
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
/* .WaterRipple_topbox--active {
  opacity: 0.7;
  animation: water 0.5s;
  animation-delay: 0.2s;
}
.WaterRipple_topbox--active::after {
  z-index: 99;
  width: var(--ater--radius);
  height: var(--ater--radius);
  background: #fff;
  opacity: 0.3;
  transition: width var(--transition--time), height var(--transition--time);
} */
.WaterRipple_topbox:hover {
  opacity: 0.5;
  animation: water 0.5s;
  animation-delay: 0.1s;
}
.WaterRipple_topbox:hover::after {
  z-index: 99;
  /* width: var(--ater--radius); */
  /* height: var(--ater--radius); */
  animation: shoadow 0.5s;
  background: #fff;
  opacity: 0.3;
  /* transition: width var(--transition--time), height var(--transition--time); */
}
@keyframes shoadow {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  }
  100% {
    box-shadow: 0 0 0px var(--after--radius) rgba(0, 0, 0, 0);
  }
}
</style>
