<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">
    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'ShopInfo'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> اطلاعات پرداخت</div>
      </div>

      <div class="d-flex justify-content-center margin-div">
        <hr class="hr-header">

        <div class="bg-light-pink element-top position-element div-add">
          <img class="svg-cart position-svg" src="../assets/img/add-to-basket_red.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1">سبد خرید</p>
        </div>

        <div class="bg-light-pink element-top position-element">
          <img class="svg-cart size-package" src="../assets/img/package_red.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1 over-text">اطلاعات ارسال</p>
        </div>

        <div class="bg-light-pink element-top position-element div-credit">
          <img class="svg-cart position-svg" src="../assets/img/credit-card-payment_red.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1">اطلاعات پرداخت</p>
        </div>
      </div>


      <div class="div-element">

        <div class="d-flex align-items-center">
          <input class="input_radio" type="radio" id="pay_bank" v-model="pay_type" value="online">
          <label class="font-6 mx-2" for="pay_bank">پرداخت از درگاه بانکی</label>
        </div>

        <div class="d-flex align-items-center my-3">
          <input class="input_radio" type="radio" id="pay_receive" v-model="pay_type" value="delivery">
          <label class="font-6 mx-2" for="pay_receive">پرداخت زمان تحویل</label>
        </div>

        <div class="d-flex align-items-center my-3">
          <input class="input_radio" type="radio" id="pay_wallet" v-model="pay_type" value="wallet">
          <label class="font-6 mx-2" for="pay_wallet">پرداخت از کیف پول</label>
        </div>

        <button @click.prevent="PayFilnal" class="bg-color rounded-pill font-6 text-light btn-payment">پرداخت</button>

      </div>

      <div class="d-flex align-items-center"
           style="margin-top: 20px;display: flex;justify-content: space-between;align-items: center">
        <img class="svg-wallet" src="../assets/img/wallet.svg" alt="">
        <div class="font-6 m-0  mx-2" style="margin: 10px;width: 180px">موجودی کیف پول شما :
          {{ String(user_wallet).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
        </div>
        <div>
          <router-link :to="{name:'UserWallet'}" class="bg-color text-light btn-wallet font-7">مدیریت کیف پول
          </router-link>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
import {ref} from "vue";
import axios from "axios";
import swal from "sweetalert2";
import {useStore} from "vuex";
import validation from "@/assets/js/validation";
import ProgressBar from "@/components/common/ProgressBar";
import router from "@/router";

export default {
  name: "ShopPayment",
  components: {ProgressBar},

  setup() {

    var url_base = localStorage.getItem('urlBase');
    var user_id = localStorage.getItem('userId')
    var apikey = localStorage.getItem('apiKey')
    var loading = ref(true);

    var store = useStore();
    var order_products = store.state.order.products;
    order_products.forEach((item) => {
      item.count = item.order_count_select
    })

    var pay_type = ref('')
    var user_wallet = ref('')

    var address_id = localStorage.getItem('address_id')
    var payk_price = localStorage.getItem('payk_price')
    var post_day = localStorage.getItem('post_day')
    var post_date = localStorage.getItem('post_date')
    var send_type = localStorage.getItem('send_type')

    axios.get(url_base + 'user_wallet', {params: {user_id: user_id, page: 1}})
        .then(function (response) {
          loading.value = false
          var res = response.data
          console.log(res)
          user_wallet.value = res.user_wallet
        })

    function PayFilnal() {

      if (pay_type.value == '') {
        validation('نحوه پرداخت را مشخص کنید')
        return false
      }

      if (send_type == 'payk') {
        if (pay_type.value == 'online') {
          pay_type.value = 'online'
        } else if (pay_type.value == 'delivery') {
          pay_type.value = 'location_delivery'
        } else if (pay_type.value == 'wallet') {
          pay_type.value = 'wallet'
        }
      }

      if (send_type == 'store') {
        if (pay_type.value == 'online') {
          pay_type.value = 'store_online'
        } else if (pay_type.value == 'delivery') {
          pay_type.value = 'store_delivery'
        } else if (pay_type.value == 'wallet') {
          pay_type.value = 'store_wallet'
        }
      }

      var information = {
        "apikey": apikey,
        "user_id": user_id,
        "pay_type": pay_type.value,
        "address_id": address_id,
        "type": 'webapp',
        "payk_price": payk_price,
        "post_day": post_day,
        "post_date": post_date,
        "products": order_products
      }

      if (order_products.length < 1) {
        validation('سبد خرید شما خالی است')
        return false
      }

      swal.fire({
        width: 300,
        height: 100,
        text: "خرید شما ثبت نهایی شود ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D40061',
        cancelButtonColor: '#8b002e',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر'
      }).then((result) => {
        if (result.isConfirmed) {
          loading.value = true


          if (pay_type.value == "online" || pay_type.value == "store_online") {


            axios.post(url_base + "sell_pay", information).then(function (response) {
              var res = response.data
              var order_id = res.order_id

              if (order_id != null) {
                loading.value = false

                store.replaceState({
                  order: {
                    products: [],
                    orders_count: 0,
                    orders_price: 0,
                    orders_all_price: 0,
                    orders_profit: 0,
                  }
                })

                window.location.href = url_base + "send_zarinpal?order_id=" + order_id + "&action=order&type=webapp"

              } else {
                loading.value = false
                validation('خطای اتصال به درگاه بانک')
                return false
              }
            })
          } else if (pay_type.value == "wallet" || pay_type.value == "store_wallet" || pay_type.value == "location_delivery" || pay_type.value == "store_delivery") {

            axios.post("https://moftakiapp.ir/moftaki/api/sell_pay", information).then(function (response) {
              loading.value = false
              var res = response.data
              console.log(res)

              if (res.message == 'not enough money') {
                validation('موجودی حساب شما کافی نمیباشد')
                return false
              } else if (res.message == 'it seems to some products has been deleted') {
                validation('موجودی محصولات سبد خرید خود را بررسی کنید')
                return false
              } else if (res.message == 'there is not enough product') {
                validation('موجودی محصولات سبد خرید خود را بررسی کنید')
                return false
              } else if (res.message == 'order has been instered successfully!') {
                swal.fire({
                  text: "خرید شما با موفقیت ثبت شد",
                  icon: 'success',
                  width: 300,
                  height: 50,
                  confirmButtonColor: '#D40061',
                })

                store.replaceState({
                  order: {
                    products: [],
                    orders_count: 0,
                    orders_price: 0,
                    orders_all_price: 0,
                    orders_profit: 0,
                  }
                })
                // window.location.href = '/user_orders_ok'
                router.push({name: 'UserOrdersOk'})

              }
            })
          }
        }
      })
    }

    return {loading, user_wallet, pay_type, PayFilnal}
  }
}
</script>

<style>
.hr-header {
  border: 0;
  border-bottom: 2px dashed #ffffff;
  background-color: #000000;
  position: relative;
  margin: 45px 20px;
  width: 100%;
}

.element-top {
  position: absolute;
  border-radius: 7px;
  height: 45px;
  width: 45px;
  top: 25px;
}

.svg-cart {
  height: 20px;
}

.position-svg {
  margin: 12px 13px;
}


.div-credit {
  left: 25px;
}

.div-add {
  right: 25px;
}

.size-package {
  height: 25px;
  margin: 10px 12px;
}

.over-text {
  overflow: visible;
}

.margin-div {
  margin: 0 10px;
  position: relative;
}

/* ======================================================== */
.div-element {
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
  position: relative;
  margin-top: 20px;
  padding: 15px 10px
}

.input_radio {
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #EC407A;
  border-radius: 50%;
  background-color: #ffffff;

}

.input_radio:checked {

  background-color: #EC407A;
}

.svg-wallet {
  height: 25px;
}

.btn-wallet {
  padding: 8px;
  border: none;
  border-radius: 4px;

}

.btn-payment {
  width: 100%;
  border: none;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
