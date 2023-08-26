<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">
    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'ShopBasket'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> اطلاعات ارسال</div>
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

        <div class="bg-gray-2 element-top position-element div-credit">
          <img class="svg-cart position-svg" src="../assets/img/credit-card-payment_black.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1">اطلاعات پرداخت</p>
        </div>
      </div>

      <div class="font-6 ltr w-75 pt-3">نحوه ارسال :</div>
      <div class="div-element">
        <div class="font-6 my-3">
          <div class="d-flex align-items-center my-3" style="position: relative">
            <input class="input_radio" type="radio" id="type_payk" v-model="send_type" value="payk">
            <label class="font-6 mx-2" for="type_payk">ارسال با پیک</label>
            <span v-if="select_address_id != ''" class="font-color" style="position: absolute;left: 10px">
             مبلغ پیک {{ String(payk_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
            </span>
            <span v-else class="font-color" style="position: absolute;left: 10px">
              آدرس خود را انتخاب کنید
            </span>
          </div>

          <div class="d-flex align-items-center my-3">
            <input class="input_radio" type="radio" id="type_store" v-model="send_type" value="store">
            <label class="font-6 mx-2" for="type_store">تحویل از فروشگاه</label>
          </div>
        </div>
      </div>

      <div v-if="send_type == 'payk'">
        <div class="font-6 ltr w-75 mt-3">انتخاب آدرس :</div>
        <div class="div-element p-costom">
          <div class="d-flex title-text">
            <p class="text-muted font-6 m-0">آدرس</p>
            <router-link class="d-flex add-addres" :to="{name:'ShopAddress'}">
              <p class="font-color font-6 mx-2">افزودن آدرس</p>
              <img class="svg-plus" src="../assets/img/plus.svg" alt="">
            </router-link>
          </div>

          <div v-for="item in addresses" :key="item.id" class="d-flex bg-gray-2 div-addres my-3 "
               style="justify-content: space-between;align-items: center"
               :class="{ active_address: select_address_id == item.id }"
               @click="address_pay(item.id)">
            <div style="width: 90%;display: flex">
              <img class="svg-place" src="../assets/img/address.svg" alt="">
              <p class="font-6 m-0 mx-2">{{ item.address }}</p>
            </div>
            <div style="width: 5%;cursor: pointer" @click="address_delete(item.id)">
              <img class="svg-place" style="text-align: left;width: 10px;height: 10px" src="../assets/img/close.svg">
            </div>
          </div>
        </div>

        <div class="font-6 ltr w-75 pt-3">زمان ارسال :</div>
        <div class="div-element">
          <div class="div-element d-flex-center justify-content-between font-5 mt-0">

            <label for="Saturday" :class="{select_day : post_day == 'Saturday'}">شنبه</label>
            <input id="Saturday" type="radio" value="Saturday" style="display: none" v-model="post_day">

            <label for="Sunday" :class="{select_day : post_day == 'Sunday'}">یکشنبه</label>
            <input id="Sunday" type="radio" value="Sunday" style="display: none" v-model="post_day">

            <label for="Monday" :class="{select_day : post_day == 'Monday'}">دوشنبه</label>
            <input id="Monday" type="radio" value="Monday" style="display: none" v-model="post_day">

            <label for="Tuesday" :class="{select_day : post_day == 'Tuesday'}">سه شنبه</label>
            <input id="Tuesday" type="radio" value="Tuesday" style="display: none" v-model="post_day">

            <label for="Wednesday" :class="{select_day : post_day == 'Wednesday'}">چهارشنبه</label>
            <input id="Wednesday" type="radio" value="Wednesday" style="display: none" v-model="post_day">

            <label for="Thursday" :class="{select_day : post_day == 'Thursday'}">پنجشنبه</label>
            <input id="Thursday" type="radio" value="Thursday" style="display: none" v-model="post_day">

            <label for="Friday" :class="{select_day : post_day == 'Friday'}">جمعه</label>
            <input id="Friday" type="radio" value="Friday" style="display: none" v-model="post_day">

          </div>

          <div class="div-element d-flex">

            <div class="d-flex-center flex-column justify-content-between font-5 mb-4 w-50">
              <div class="w-50 d-flex-center justify-content-between mb-3">
                <input id="7" type="radio" class="input_radio" value="7-10" name="time" v-model="post_date">
                <label for="7">10 - 7</label>
              </div>

              <div class="w-50 d-flex-center justify-content-between mb-3">
                <input id="10" type="radio" class="input_radio" value="10-13" name="time" v-model="post_date">
                <label for="10">13 - 10</label>
              </div>

              <div class="w-50 d-flex-center justify-content-between mb-3">
                <input id="13" type="radio" class="input_radio" value="13-16" name="time" v-model="post_date">
                <label for="13">16 - 13</label>
              </div>
            </div>

            <div class="d-flex-center flex-column justify-content-between font-5 mb-4 w-50">
              <div class="w-50 d-flex-center justify-content-between mb-3">
                <input id="16" type="radio" class="input_radio" value="16-19" name="time" v-model="post_date">
                <label for="16">19 - 16</label>
              </div>

              <div class="w-50 d-flex-center justify-content-between mb-3">
                <input id="19" type="radio" class="input_radio" value="19-21" name="time" v-model="post_date">
                <label for="19">21 - 19</label>
              </div>

              <div class="w-50 d-flex-center justify-content-between mb-3">
                <input id="21" type="radio" class="input_radio" value="24-21" name="time" v-model="post_date">
                <label for="21">21 - 24</label>
              </div>
            </div>

          </div>
        </div>
      </div>

      <button @click="SendInfo" class="bg-color rounded-pill font-6 text-light btn-payment">
        تایید و ادامه سبد خرید
      </button>


    </div>
  </div>

</template>

<script>
import axios from "axios";
import {ref} from "vue";
import swal from 'sweetalert2'
import router from "@/router";
import ProgressBar from "@/components/common/ProgressBar";
import validation from "@/assets/js/validation";

export default {
  name: "ShopInfo",
  components: {ProgressBar},

  setup() {

    var today = new Date().toLocaleDateString(undefined, {weekday: 'long'})
    var hour = new Date().getHours()
    console.log(hour)

    var url_base = localStorage.getItem('urlBase');
    var user_id = localStorage.getItem('userId')
    let loading = ref(true);

    let addresses = ref([]);
    let payk_price = ref('');
    let select_address_id = ref('')

    var send_type = ref('payk')
    var post_day = ref(today)
    var post_date = ref('')

    axios.get(url_base + 'address_user', {params: {user_id: user_id}})
        .then(function (response) {
          loading.value = false
          var res = response.data
          console.log(res)
          addresses.value = res
        })

    function address_pay(address_id) {

      loading.value = true
      axios.get(url_base + 'address_pay', {params: {user_id: user_id, address_id: address_id}})
          .then(function (response) {
            loading.value = false
            var res = response.data
            console.log(res)
            payk_price.value = res.payk_price

            select_address_id.value = address_id
          })
    }

    function SendInfo() {

      if (send_type.value == "") {
        validation('نحوه ارسال را مشخص کنید')
        return false
      }

      if (send_type.value == 'payk') {
        if (select_address_id.value == '' || post_day.value == '' || post_date.value == '') {
          validation('لطفا آدرس و زمان ارسال را مشخص کنید')
          return false
        }
      } else if (send_type.value == 'store') {
        select_address_id.value = 0
        payk_price.value = 0
        post_day.value = 0
        post_date.value = 0
      }

      localStorage.setItem('send_type',send_type.value)
      localStorage.setItem('address_id', select_address_id.value)
      localStorage.setItem('payk_price', payk_price.value)
      localStorage.setItem('post_day', post_day.value)
      localStorage.setItem('post_date', post_date.value)
      router.push({name:'ShopPayment'})
    }

    function address_delete(address_id) {

      swal.fire({
        text: "میخواهید این آدرس را حدف کنید؟!",
        icon: 'warning',
        width: 300,
        height: 50,
        showCancelButton: true,
        confirmButtonColor: '#D40061',
        cancelButtonColor: '#8b002e',
        confirmButtonText: 'بله!',
        cancelButtonText: 'خیر',

      }).then((result) => {
        if (result.isConfirmed) {

          loading.value = true
          axios.post('https://moftakiapp.ir/moftaki/api/address_delete', {
            user_id: user_id,
            address_id: address_id,
            apikey: 'ldghn_fhrv127'
          })
              .then(function (response) {
                loading.value = false
                var res = response.data

                if (res['status'] === 'ok') {
                  swal.fire({
                    text: 'آدرس حذف شد..',
                    color: '#EC407A',
                    confirmButtonColor: '#D40061',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    width: 250,
                    height: 20,
                    confirmButtonText: "فهمیدم",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
                }
              })
        }
      })
    }


    return {
      loading,
      addresses,
      payk_price,
      select_address_id,
      send_type,
      post_day,
      post_date,
      address_pay,
      address_delete,
      SendInfo
    }
  }
}

</script>

<style scoped>

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

/* ========================================== */
.div-element {
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
  position: relative;
  margin-top: 20px;

}

.add-addres {
  position: absolute;
  left: 30px;
}

.svg-plus {
  height: 15px;
}

.title-text {
  margin: 20px 15px;
}

.div-addres {
  border: none;
  border-radius: 5px;
  /*margin: 0 10px;*/
  padding: 15px;
  height: 40px;
}

.svg-place {
  height: 17px;
}

.Price-car {
  position: absolute;
  left: 15px;
}

.p-costom {
  padding-bottom: 10px;
}

.text-Price {
  margin: 0 10px;
}

.btn-payment {
  width: 100%;
  border: none;
  padding: 15px;
  margin-top: 30px;
}

.swal2-title {
  font-size: 0.5rem !important;
  font-weight: normal;
}

.active_address {
  background-color: #ffc0e0;
}

.select_day {
  color: #D40061;
  font-size: 15px;
  background-color: #ffc0e0;
  padding: 5px;
  border-radius: 20px;
}
</style>
