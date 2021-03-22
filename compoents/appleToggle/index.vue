<template>
  <label class="appleToggle-boxtop" :style="{'--bg-color':color,...styleSize}">
    <input type="checkbox" @click="hand" ref='checkInput'/>
    <span></span>
  </label>
</template>

<script>
export default {
  name: "appleToggle",
  props: {
    size: {
      type: Number,
      default: 1,
    },
    isRem: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#30d158'
    },
    isSelect:{
      type: Boolean,
      default: true
    },
    mykey:{
      type : String,
      default: ''
    }
  },
  data() {
    return {
      buttonWidth: 500,
      buttonHeight: 295,
      toggleDiameter: 255,
      toggleShadowOffset: 10,
      toggleWider: 333,
      buttonShadow: 40,
    }
  },
  components: {},
  created() {},
  mounted() {
    this.$refs.checkInput.checked = this.isSelect
  },
  methods: {
    hand(e) {
      this.$emit("hand", e.target.checked,this.mykey)
    },
    rem(px) {
      let rem =
        px /
        (750 / document.documentElement.clientWidth) /
        parseInt(document.documentElement.style.fontSize)
      return rem
    },
  },
  computed: {
    styleSize() {
      if (this.isRem) {
        return {
          "--button-width": this.rem(this.buttonWidth) * this.size + "rem",
          "--button-height": this.rem(this.buttonHeight) * this.size + "rem",
          "--toggle-diameter": this.rem(this.toggleDiameter) * this.size + "rem",
          " --toggle-shadow-offset":
            this.rem(this.toggleShadowOffset) * this.size + "rem",
          "--toggle-wider": this.rem(this.toggleWider) * this.size + "rem",
          "--button-shadow": this.rem(this.buttonShadow) * this.size + "rem",
        }
      }
      return {
        "--button-width": this.buttonWidth * this.size + "px",
        "--button-height": this.buttonHeight * this.size + "px",
        "--toggle-diameter": this.toggleDiameter * this.size + "px",
        " --toggle-shadow-offset": this.toggleShadowOffset * this.size + "px",
        "--toggle-wider": this.toggleWider * this.size + "px",
        "--button-shadow": this.buttonShadow * this.size + "px",
      }
    },
  },

  watch: {},
}
</script>

<style lang="less" scpoed>
.boxtop {
  padding: 0;
  margin: 0;
}
.appleToggle-boxtop {
  // --button-width: 500px;
  // --button-height: 295px;
  // --toggle-diameter: 255px;
  // --toggle-shadow-offset: 10px;
  // --toggle-wider: 333px;
  --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
  --color-grey: #e9e9ea;
  --color-dark-grey: #39393d;
  // justify-content: center;
  // align-items: center;
  // min-height: 100vh;
  // height: var(--button-height);
  margin: var(--button-shadow);
  padding: 0;
  height: auto;
  width: auto;
  display: inline-block;
  line-height: 0;
  
  input {
    display: none;
  }
}
span {
  display: inline-block;
  width: var(--button-width);
  height: var(--button-height);
  background-color: var(--color-grey);
  border-radius: calc(var(--button-height) / 2);
  position: relative;
  transition: 0.3s all ease-in-out;
}
span::after {
  content: "";
  display: inline-block;
  width: var(--toggle-diameter);
  height: var(--toggle-diameter);
  background-color: #fff;
  border-radius: calc(var(--toggle-diameter) / 2);
  position: absolute;
  top: var(--button-toggle-offset);
  transform: translateX(var(--button-toggle-offset));
  box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4)
    rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease-in-out;
}
input[type="checkbox"]:checked + span {
  background-color: var(--bg-color);
  animation: 0.5s spread ease-in-out;
}
input[type="checkbox"]:checked + span::after {
  transform: translateX(
    calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset))
  );
  box-shadow: calc(var(--toggle-shadow-offset) * -1) 0
    calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
}
input[type="checkbox"]:active + span::after {
  width: var(--toggle-wider);
}
input[type="checkbox"]:checked:active + span::after {
  transform: translateX(
    calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset))
  );
}
@keyframes spread {
  0% {
    box-shadow: 0 0 0 0 var(--bg-color);
  }
  100% {
    box-shadow: 0 0 0 var(--button-shadow) #fff;
  }
}
</style>
