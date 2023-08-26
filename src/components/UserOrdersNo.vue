<template>

  <div id="main">
    <div class="p-body">
      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> سفارشات من</div>
      </div>
      <div class="rounded-pill  holder-btn d-flex">
        <router-link :to="{name:'UserOrdersOk'}" class="font-color font-6 rounded-pill btn1" style="text-align: center">
          سفارشات جاری
        </router-link>
        <button class="font-color bg-light-pink font-6 rounded-pill btn1">سفارشات تکمیل شده</button>
      </div>

      <ProgressBar v-if="loading"></ProgressBar>
      <EmptyPage v-else-if="orders.length < 1"></EmptyPage>

      <div class="div-element" v-for="order in orders" :key="order.id">
        <div class="d-flex font-6">
          <img class="svg-all" src="../assets/img/box.svg" alt="">
          <p class="m-0">سفارش {{ order.ord_num }}</p>
          <p class="text-muted m-0 mx-3">{{ order.time }}</p>
          <p class="text-muted m-0">{{ order.date }}</p>
        </div>
        <hr class="hr-orders">
        <div class="d-flex font-6 d-flex category-minor font-6"
             style="width:auto;display:flex;overflow-x: scroll;overflow-y: hidden">
          <img class="svg-all" src="../assets/img/shop(1).svg" alt="">
          <div style="display: flex">
            <p class="per_product" v-for="ord in order.products" :key="ord.name"> {{ ord.name }} ( {{ ord.count }} عدد
              ) </p>
          </div>
        </div>
        <hr class="hr-orders">
        <div class="d-flex font-6">
          <img class="svg-all size-credit" src="../assets/img/credit-card.svg" alt="">
          <p class="m-0"> مبلغ سفارش : </p>
          <p style="padding: 0 5px"> {{ String(order.all_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان </p>
        </div>
        <div class="d-flex font-6 div-info">
          <p class="m-0">تسویه با</p>
          <p v-if="order.pay_type == 'wallet'" class="red-light m-0 mx-2"> کیف پول </p>
          <p v-if="order.pay_type == 'online'" class="red-light m-0 mx-2"> درگاه بانکی </p>
        </div>
        <hr class="hr-orders">
        <div class="d-flex font-6">
          <img class="svg-all" src="../assets/img/information(2).svg" alt="">
          <p v-if="order.status == 3" class="m-0">تحویل داده شده</p>
          <p v-if="order.status == 4" class="m-0">لغو شده توسط کاربر</p>
          <p v-if="order.status == 5" class="m-0">لغو شده توسط مدیریت</p>
        </div>
        <hr class="hr-orders">
        <div class="d-flex font-6" style="padding: 10px 0 ">
          <img class="svg-all size-credit" src="../assets/img/bicycle.svg" alt="">
          <p class="m-0">مبلغ پیک :</p>
          <p class="m-0 mx-2">{{ String(order.payk_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان</p>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";
import {useStore} from "vuex";
import {ref} from "vue";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";

export default {
  name: "UserOrdersOk",
  components: {ProgressBar, EmptyPage},

  setup() {

    var loading = ref(true)
    var nothing = ref(false);
    var store = useStore()
    var orders = ref([])

    axios.post('https://moftakiapp.ir/moftaki/api/user_order', {
      apikey: 'ldghn_fhrv127',
      status: 2,
      user_id: store.state.order.user_id,
      page: 1

    }).then(function (response) {
      loading.value = false
      let res = response.data
      orders.value = res.orders
    })

    return {loading, nothing, orders}
  }
}
</script>

<style>
.holder-btn {
  width: 100%;
  padding: 5px;
  background-color: rgb(248, 248, 248);
  margin-top: 15px;
}

.btn1 {
  width: 50%;
  border: none;
  padding: 12px;
  margin: 0 0 0 2px;
}

.btn2 {
  width: 50%;
  border: none;
  padding: 12px;
  margin: 0 2px 0 0;
}

/* ================================= */
.div-element {
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
  position: relative;
  margin-top: 20px;
  padding: 17px 19px;
}

.svg-all {
  height: 15px;
  margin-left: 10px;
}

.hr-orders {
  padding: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  color: rgb(207 207 207);
}

.size-credit {
  height: 11px;
}

.div-info {
  margin: 0 25px;
}

.btn-out {
  padding: 12px 90px;
  border: none;
  margin: 20px;
}

.div-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

.per_product {
  border: 1px #D40061 solid;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  white-space: nowrap
}

#nothing {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
