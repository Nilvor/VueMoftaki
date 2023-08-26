<template>
  <ProgressBar v-if="loading"></ProgressBar>

  <div class="bg-body" dir="rtl">
    <div id="main" style="display:flex;justify-content: center;align-items: center;">
      <div class="main-head">
        <div class="main-element shadow">
          <img class="img-login" src="../assets/img/Untitled-2.png">
          <div class="element-number">
            <p class="font-6"> جهت ورود لطفا شماره همراه خود را وارد کنید</p>
            <div class="d-flex div-input-number">
              <input v-model="info.phone" class="input-number rounded-pill shadow-sm font-7" placeholder="شماره همراه">
              <div class="icon-phone bg-color">
                <img class="svg-phone" src="../assets/img/telephone.svg">
              </div>
            </div>

            <div class="d-flex align-items-center my-3" style="display: flex;justify-content: center">
              <input v-model="info.accept" class="font-color input_check" type="checkbox" id="check_accept">
              <div class="mx-1" style="padding-right: 5px;width: 80%;font-size: 9px">تمام
                <span @click="Rules('show_rules')" class="font-color" style="cursor: pointer"> شرایط و قوانین </span>
                برنامه و
                <span @click="Rules('show_privacy')" class="font-color" style="cursor: pointer"> حریم خصوصی </span> را
                می پذیریم
              </div>
            </div>

            <button class="bg-color btn-number rounded-pill text-white font-6" type="submit" :disabled="loading" @click="SendData">

              <div style="display: flex;align-items: center;justify-content: center;margin: 5px">
                <span style="margin-left:10px "> ارسال کد </span>
              </div>

            </button>
            <br><br>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import axios from 'axios'
import router from "@/router";
import {reactive, ref} from "vue";
import ProgressBar from "@/components/common/ProgressBar";
import validation from "@/assets/js/validation";

export default {

  name: "LoginPhone",
  components: {ProgressBar},

  setup() {
    var url_base = localStorage.getItem('urlBase');
    var apikey = localStorage.getItem('apiKey')
    var loading = ref(false);

    var info = reactive({
      phone: "",
      accept: "",
    });

    function SendData() {

      if (info.phone == "") {
        validation('لطفا شماره موبایل خود را وارد کنید')
        return false
      }


      if (info.phone.length < 11 || info.phone.length > 11 || info.phone.charAt(0) != 0 || info.phone.charAt(1) != 9) {
        validation('لطفا شماره موبایل خود را بصورت صحیح وارد کنید')
        return false
      }

      if (info.accept == false) {
        validation('لطفا شرایط ورود به اپلیکیشن را تایید کنید')
        return false
      }

      loading.value = true

      axios.post(url_base+'phone', {
        phone: info.phone, accept: '1', apikey: apikey
      }).then(function (response) {

        loading.value = false
        var res = response.data

        if (res.status === 'ok') {
          router.push({name: 'LoginOtp', params: {phone: info.phone, otp: res.otp}})
        } else {
          console.log('error')
        }
      })
    }

    function Rules(action) {
      window.location.href = "https://moftakiapp.ir/moftaki/panel/" + action
    }

    return {info, loading, SendData, Rules}

  },
}
</script>

<style scoped>

.bg-body {
  background-image: url(../assets/img/Path1379.svg);
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: bottom;
}

.img-login {
  margin-bottom: 25px;
  width: 100% !important;
}

.main-head {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90% !important;
  height: 90% !important;
}

.main-element {
  height: 90%;
  width: 90%;
  background-color: #ffffff;
  border-radius: 30px;
  text-align: center;
  overflow: scroll;
  scrollbar-width: none;
}

.element-number {
  text-align: center;

}

.input-number {
  margin: auto;
  width: 90%;
  line-height: 40px;
  border: none;
  border: 1px solid rgb(201, 201, 201);
  text-align: center;
  outline: none;
  position: relative;
}

.input-number:focus {
  outline: none;
}

.input-number:hover {
  outline: none;
}

.div-input-number {
  position: relative;
  text-align: center;
}

.btn-number {
  width: 80%;
  border: none;
  line-height: 35px;
}

.input_check {
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid #EC407A;
  border-radius: 3px;
}

.input_check:checked {
  background-color: #EC407A;
}

.icon-phone {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  position: absolute;
  right: 5%;
  text-align: center;
  margin: 4px;
  padding: 5px;
}

.svg-phone {
  height: 20px;
}


</style>
