<template>
 <div>
   <SlideIn :isShow.sync='show' :slidePosition='pst'>
     <div slot="content" class="test">
       <ul>
         <li>这是一个元素</li>
         <li>这是一个元素</li>
         <li>这是一个元素</li>
         <li>这是一个元素</li>
         <li>这是一个元素</li>
       </ul>
     </div>
   </SlideIn>
   <button @click="slide">bottomslide</button>
   <button @click="() => {show=!show;pst='right'}">rightslide</button>
   <button @click="() => {show=!show;pst='left'}">leftslide</button>
   <button @click="() => {show=!show;pst='top'}">topslide</button>
 </div>
</template>

<script>
 export default {
   name:'',
   data () {
     return {
       show: false,
       pst: 'bottom'
     }
   },
   components: {

   },
   created() {

   },
   mounted() {

   },
   methods: {
     slide() {
      this.pst='bottom'
       this.$nextTick(() => {
        this.show=!this.show
       })
     }
   },
   computed: {

   },
   watch: {

   },
 }
</script>

<style scpoed>
 .test{
   background: #fff;
 }
 ul {
   margin: 0px;
 }
</style>

