<template>
  <div class="pos-icon-chat">
    <img class="icon-chat" src="../../assets/img/empty.png" alt="">
    <p class="font-6 my-3 text-nowrap">موردی یافت نشد ..!</p>
  </div>
</template>

<script>
export default {
  name: "EmptyPage"
}
</script>

<style scoped>

.pos-icon-chat {
  position: fixed;
  left: 50%;
  /*padding-top: 30%;*/
  /*padding-bottom: 30%;*/
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*flex-direction: column;*/
}

.icon-chat {
  height: 70px;
  margin: 0 auto;
}

</style>
