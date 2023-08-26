<template>

  <div id="main">
    <img src="../assets/img/Moftaki_Logo.gif" class="splash_logo">
  </div>

</template>

<script>

import router from "@/router.js";

export default {
  name: "SplashPage",

  setup() {
    let interval = setInterval(() => {
      clearInterval(interval)
      router.push({name: 'HomePage'})
    }, 3000)
  }

}
</script>

<style scoped>

.splash_logo{
  width: 500px;
  height: 300px;
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#main {
  background-color: #e8408e;
  background-size: cover;
  /*background-image: url(../assets/img/back_splash.png);*/
}


</style>

