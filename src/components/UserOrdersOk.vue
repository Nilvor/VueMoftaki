<template>

  <div id="main">
    <div class="p-body" style="position: relative">
      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> سفارشات من</div>
      </div>
      <div class="rounded-pill  holder-btn d-flex">
        <button @click="GetOrders(1);status = 1" :class="{'bg-light-pink':status == 1}"
                class="font-color font-6 rounded-pill btn1">سفارشات جاری
        </button>
        <button @click="GetOrders(2);status = 2" :class="{'bg-light-pink':status == 2}"
                class="font-color font-6 rounded-pill btn1">سفارشات درحال ارسال
        </button>
        <button @click="GetOrders(3);status = 3" :class="{'bg-light-pink':status == 3}"
                class="font-color font-6 rounded-pill btn1">سفارشات تکمیل شده
        </button>


      </div>

      <ProgressBar v-if="loading"></ProgressBar>
      <EmptyPage v-else-if="orders.length < 1"></EmptyPage>

      <div v-else class="div-element" v-for="order in orders" :key="order.id">
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
          <p class="red-light m-0 mx-2"> {{order.pay_type}} </p>
        </div>
        <hr class="hr-orders">
        <div class="d-flex font-6">
          <img class="svg-all" src="../assets/img/information(2).svg" alt="">
          <p v-if="order.status == 1" class="m-0"> جاری </p>
          <p v-if="order.status == 2" class="m-0"> درحال ارسال </p>
          <p v-if="order.status == 3" class="m-0"> تکمیل شده </p>
          <p v-if="order.status == 4" class="m-0"> لغو از سمت کاربر </p>
          <p v-if="order.status == 5" class="m-0"> لغو از سمت مدیریت </p>
        </div>
        <hr class="hr-orders">
        <div class="d-flex font-6" style="padding: 10px 0 ">
          <img class="svg-all size-credit" src="../assets/img/bicycle.svg" alt="">
          <p class="m-0">مبلغ پیک :</p>
          <p class="m-0 mx-2">{{ String(order.payk_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان</p>
        </div>
        <div class="div-btn" v-if="order.status == 1">
          <button class="font-6 text-light bg-color rounded-pill btn-out" @click="DeleteOrder(order.ord_num)">
            لغو سفارش
          </button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";
import {ref} from "vue";
import swal from "sweetalert2";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";
import validation from "@/assets/js/validation";

export default {
  name: "UserOrdersOk",
  components: {ProgressBar, EmptyPage},

  setup() {
    var url_base = localStorage.getItem('urlBase');
    var apikey = localStorage.getItem('apiKey')
    var user_id = localStorage.getItem('userId');
    var loading = ref(true);

    var orders = ref([])
    var status = ref(1)

    function GetOrders(status) {
      loading.value = true
      axios.post(url_base + 'user_order', {
        apikey: apikey,
        status: status,
        user_id: user_id,
        page: 1

      }).then(function (response) {
        loading.value = false
        var res = response.data
        orders.value = res.orders
        console.log(res)
      })
    }

    GetOrders(1);


    function DeleteOrder(order_id) {

      swal.fire({
        width: 300,
        height: 100,
        text: "سفارش شما لغو شود ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D40061',
        cancelButtonColor: '#8b002e',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر'
      }).then((result) => {
        if (result.isConfirmed) {
          loading.value = true
          axios.post(url_base+'dauser_order', {
            apikey: apikey,
            user_id: user_id,
            ord_num: order_id
          }).then(function (response) {
            loading.value = false
            if (response.data.status == 'ok order has been deactive') {
              swal.fire({
                text: "سفارش شما لغو شد",
                icon: 'success',
                width: 300,
                height: 50,
                confirmButtonColor: '#D40061',
                confirmButtonText: 'تایید',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              })
            } else {
              validation('لغو سفارش با خطا مواجه شد')
            }
          })
        }
      })
    }


    return {loading, orders, status, GetOrders, DeleteOrder}
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
