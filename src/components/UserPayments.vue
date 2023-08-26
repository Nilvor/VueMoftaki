<template>

  <div id="main">
    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> پرداخت های من </div>
      </div>

      <ProgressBar v-if="loading"></ProgressBar>
      <EmptyPage v-else-if="items.length < 1"></EmptyPage>

      <div v-else class="div-element mt-3 p-3" v-for="item in items" :key="item.id">
        <div class="d-flex align-items-center">
          <img class="svg-minus" v-if="item.type = 'کاهشی'" src="../assets/img/minus(1).svg" alt="">
          <img class="svg-minus" v-else src="../assets/img/plus(3).svg" alt="">
          <p class="font-5 Price font-red">{{ String(item.amount).replace(/(.)(?=(\d{3})+$)/g,'$1,') }}</p>
          <p class="font-6 my-0 red-light">تومان</p>
        </div>
        <p class="my-0 my-3 font-5">خرید آنلاین</p>
        <div class="d-flex align-items-center">
          <p class="font-6">{{ item.day }} {{ item.date }}</p>
          <p class="font-6 mx-3">ساعت {{ item.time }}</p>
        </div>
        <div class="d-flex align-items-center">
          <p class="font-5 my-0">وضعیت</p>
          <p class="font-6 my-0 mx-2 color-successful"> {{item.reason}} </p>

        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {ref} from "vue";
import axios from "axios";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";

export default {
  name: "UserPayments",
  components: {ProgressBar, EmptyPage},

  setup(){
    var loading = ref(true);
    var user_id = localStorage.getItem('userId');

    var items = ref([]);

    axios.get( 'https://moftakiapp.ir/moftaki/api/user_paid', {params: {user_id: user_id,page:1}})
        .then(function (response) {
          loading.value = false
          var res = response.data
          console.log(res)
          items.value = res.items
        })


    return {loading,items}
  }

}
</script>

<style>
.div-element{
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
}
.svg-minus{
  width: 30px;
  height: 30px;
}
.Price{
  margin: 0 15px 0 7px;
}

.color-successful{
  color: #D40061;
}
</style>
