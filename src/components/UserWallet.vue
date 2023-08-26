<template>

  <div class="dialog_custom" id="custom_dialog">
    <div class="main-dialog">
      <img class="svg-close-dialog " @click="toggle_dialog" src="../assets/img/close.svg" alt="">
      <p style="font-size: 10px;margin: 0;text-align: center">مبلغ مورد نظر را وارد کنید</p>
      <input v-model="wallet_inc" class="input-dialog rounded-pill font-7" type="text" style="font-size: 10px"
             placeholder="مبلغ را به تومان وارد کنید">
      <p v-if="wallet_inc_ok" style="font-size: 10px;margin: 20px;text-align: center;color: #D40061">لطفا مبلغ را وارد
        کنید!</p>
      <p id="wallet_inc_text" style="text-align: center;margin: 5px;font-size: 9px">
        {{ String(wallet_inc).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}</p>
      <p v-if="wallet_inc != ''" style="text-align: center;margin: 5px;font-size: 8px">تومان</p>
      <div class="div-btn-dialog">
        <button @click="sendInc" class="btn-dialog bg-color text-white font-6 rounded-pill">ثبت</button>
      </div>
    </div>
  </div>

  <div id="main">

    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> مدیریت کیف پول</div>
      </div>

      <div class=" mt-3 p-3 div-element" v-if="loading == false">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <img class="svg-wallet" src="../assets/img/XMLID_1441_.svg" alt="">
            <p class="font-5 m-0 mx-2">کیف پول من</p>
          </div>
          <div @click="toggle_dialog" class="d-flex align-items-center rounded-pill bg-light-pink add-validity">
            <img class="svg-add " src="../assets/img/add(3).svg">
            <p class="font-color font-7 m-0">افزایش اعتبار</p>
          </div>

        </div>
        <div class="d-flex my-4">
          <p class="font-6 text-muted m-0">موجودی حساب شما</p>
          <div class="d-flex div-inventory">
            <p class="font-6 font-color m-0">{{ String(user_wallet).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}</p>
            <p class="font-6 text-muted m-0 mx-1">تومان</p>
          </div>
        </div>
      </div>


      <ProgressBar v-if="loading"></ProgressBar>
      <EmptyPage v-else-if="wallets.length < 1"></EmptyPage>

      <div v-else style="padding-bottom: 50px">
        <div class="div-element mt-3 p-3" v-for="item in wallets" :key="item.id">
          <div class="d-flex align-items-center">
            <img class="svg-minus" v-if="item.type == 'افزایشی'" src="../assets/img/plus(3).svg" alt="">
            <img class="svg-minus" v-else src="../assets/img/minus(1).svg" alt="">
            <p class="font-5 Price color-green">{{ String(item.amount).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}</p>
            <p class="font-6 my-0 color-green">تومان</p>
          </div>
          <p class="my-0 my-3 font-5" v-if="item.type == 'افزایشی'"> افزایش کیف پول </p>
          <p class="my-0 my-3 font-5" v-else> کاهش کیف پول </p>
          <div class="d-flex align-items-center">
            <p class="font-6 text-muted">{{ item.day }} {{ item.date }}</p>
            <p class="font-6 mx-3 text-muted">ساعت {{ item.time }}</p>
          </div>
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
import validation from "@/assets/js/validation";

export default {
  name: "UserWallet",
  components: {ProgressBar, EmptyPage},

  setup() {

    var loading = ref(true);
    var user_id = localStorage.getItem('userId');

    var user_wallet = ref("");
    var wallets = ref([]);
    var wallet_inc = ref('')


    axios.get('https://moftakiapp.ir/moftaki/api/user_wallet', {params: {user_id: user_id, page: 1}})
        .then(function (response) {
          loading.value = false

          var res = response.data
          console.log(res)
          user_wallet.value = res.user_wallet
          wallets.value = res.items
        })


    function toggle_dialog() {
      var dialog = document.getElementById("custom_dialog");
      if (dialog.style.height == "250px") {
        dialog.style.height = "0px"
      } else {
        dialog.style.height = "250px"
      }
    }

    function sendInc() {

      if (wallet_inc.value == '') {
        validation("مبلغ مورد نظر راوارد کنید")
      } else {
        window.location.href = "https://moftakiapp.ir/moftaki/api/inc_wallet?user_id=" + user_id + "&amount=" + wallet_inc.value+'0'
      }
    }

    return {loading, user_wallet, wallets, wallet_inc, toggle_dialog, sendInc}
  }
}


</script>

<style scoped>
.div-element {
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
  position: relative;
  padding-bottom: 0 !important;
}

.svg-minus {
  width: 30px;
  height: 30px;
}

.Price {
  margin: 0 15px 0 7px;
}

.svg-wallet {
  height: 30px;
}

.add-validity {
  height: 30px;
  padding: 6px 18px;
  position: absolute;
  left: 10px;
  cursor: pointer;
}

.svg-add {
  /*height: 15px;*/
  margin: 0 0 0 12px;
}

.div-inventory {
  position: absolute;
  left: 10px;
}

/* ========================================== */
.dialog_custom {
  width: 200px;
  height: 0;
  background-color: #ffd8e5;
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  overflow: hidden;
  transition: 0.5s;
  display: grid;
}

.main-dialog {
  padding: 10px;
  border: #EC407A 2px solid;

}

.svg-close-dialog {
  height: 10px;
  right: 15px;
  margin-bottom: 25px;
  margin-top: 5px;
}

.div-btn-dialog {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-dialog {
  padding: 10px 65px;
  border: none;

}

.input-dialog {
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgb(233 233 233);
  margin-top: 20px;
  outline: 1px solid #D40061;
  text-align: center;
}

.input-dialog:focus {
  border: 1px solid #D40061;
  transition: 0.5s;
}

</style>
