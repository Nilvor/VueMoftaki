<template>

  <div class="holder-nav d-flex rounded-pill" id="basket">
    <div class="d-flex align-items-center justify-content-around">
      <div @click="UserValidate('ShopBasket')" style="width:150px;cursor: pointer"
           class="bg-color font-5 text-white rounded-pill btn-cart d-flex justify-content-around">
        <img src="../../assets/img/add-to-basket.png" style="width: 20px;height: 20px">
        <span style="padding-right: 10px"> سبد خرید </span>
      </div>
      <div class="text-footer">
        <div class="d-flex align-items-center">
          <p class="font-5 font-color m-0 mx-2">{{ String(orders_price_all).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}</p>
          <p class="font-6 font-color m-0">تومان</p>
        </div>
        <p class="font-6 text-muted m-0 my-1">{{ orders_count_all }} قلم سفارش داده اید</p>
      </div>
    </div>

  </div>

</template>

<script>

import UserValidate from "@/assets/js/UserValidation";
import {ref} from "vue";

export default {
  name: "BasketBuy",
  props:['orders_price','orders_count'],

  setup(props) {

    var orders_count_all = ref(props.orders_count);
    var orders_price_all = ref(props.orders_price);

    return {orders_count_all, orders_price_all,UserValidate}
  }

}
</script>

<style scoped>

#basket{
  width: 95%!important;
  padding: 5px;
}

</style>

