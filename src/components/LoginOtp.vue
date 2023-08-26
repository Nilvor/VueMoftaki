<template>
  <link rel="apple-touch-icon" sizes="128x128" href="../storage/logo/logo.png">
  <ProgressBar v-if="loading"></ProgressBar>

  <div class="bg-body" dir="rtl">
    <div id="main" style="display:flex;justify-content: center;align-items: center;">
      <div class="main-head">
        <div class="main-element shadow">
          <img class="img-login" src="../assets/img/Untitled-2.png" alt="">
          <div class="element-otp">
            <p class="font-6">کد ارسال را وارد کنید</p>
            <form class="digits_holder">
              <input v-model="otps.otp1" class="input-otp rounded-pill font-6 shadow-sm" maxlength="1" type="number"
                     @keyup="focusNextFirst">
              <input v-model="otps.otp2" class="input-otp rounded-pill font-6 shadow-sm" maxlength="1" type="number"
                     @keyup="focusNext">
              <input v-model="otps.otp3" class="input-otp rounded-pill font-6 shadow-sm" maxlength="1" type="number"
                     @keyup="focusNext">
              <input v-model="otps.otp4" class="input-otp rounded-pill font-6 shadow-sm" maxlength="1" type="number"
                     @keyup="focusNextLast">
            </form>

            <p class="font-6 mt-2"><span id="timer_holder">60</span> : 00 </p>
            <button id="sendbtn" class="bg-color btn-otp rounded-pill text-white font-6" type="submit" style="margin: 10px"
                    :disabled="loading" @click="SendData">

              <div style="display: flex;align-items: center;justify-content: center;margin: 5px">
                <span style="margin-left:10px "> ثبت </span>
              </div>

            </button>

            <div class="div-a">
              <router-link class="p-1 a-otp text-dark font-7 " :to="{name:'LoginPhone'}">کد ارسال نشد
              </router-link>
              <router-link class="p-1 a-otp text-dark font-7 " :to="{name:'LoginPhone'}">تصحیح شماره همراه
              </router-link>
            </div>
            <br><br>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

import {useRoute} from "vue-router";
import {reactive, ref} from 'vue';
import {useStore} from "vuex";
import axios from "axios";
import router from "@/router";
import validation from "@/assets/js/validation";
import ProgressBar from "@/components/common/ProgressBar";

export default {
  name: "LoginOtp",
  components: {ProgressBar},

  setup() {
    var url_base = localStorage.getItem('urlBase');
    var apikey = localStorage.getItem('apiKey')
    var loading = ref(false);

    var store = useStore()
    var phone = useRoute().params.phone;
    var otps = reactive({
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    });

    async function SendData() {

      if (otps.otp1 === "" && otps.otp2 === "" && otps.otp3 === "" && otps.otp4 === "") {
        validation('کد ارسال شده را وارد کنید')
        return false
      }
      if (otps.otp1 === "" || otps.otp2 === "" || otps.otp3 === "" || otps.otp4 === "") {
        validation('کد ارسال شده را بصورت صحیح کامل کنید')
        return false
      }
      loading.value = true
      var otp = otps.otp1.toString() + otps.otp2.toString() + otps.otp3.toString() + otps.otp4.toString();

      axios.post(url_base+'otp', {phone: phone, otp: otp, apikey: apikey})
          .then(function (response) {
            loading.value = false;
            var res = response.data

            if (res.status === 'ok') {

              if (res.event.includes('new')) {
                router.push({name: 'LoginUser', params: {phone: phone}})
                localStorage.clear()
              } else {
                localStorage.setItem('userId', res.user_id)
                window.location.href = '/homepage'
              }

            } else if (res.status === 'error') {
              validation('کد وارد شده صحیح نمیباشد!')
            } else {
              validation('خطای ارتباط با سرور')
            }
          })
    }

    var time_interval = setInterval(function () {
      var timer_holder = document.getElementById("timer_holder");
      if (timer_holder != null) {
        var timer = parseInt(timer_holder.textContent) - 1;
        if (timer >= 10) {
          timer_holder.textContent = timer;
        } else {
          timer_holder.textContent = "0" + timer;
        }
      }
      if (timer === 0) {
        clearInterval(time_interval);
        router.push({name: 'LoginPhone'})
      }

    }, 1000);


    function focusNext(e) {
      if (e.key === "Backspace" || e.key === "Delete") {
        const inputs = Array.from(e.target.form.querySelectorAll('input[type="number"]'));
        const index = inputs.indexOf(e.target);

        if (index < inputs.length) {
          inputs[index - 1].focus();
        }
        e.target.value = ''
        return;
      }
      const inputs = Array.from(e.target.form.querySelectorAll('input[type="number"]'));
      const index = inputs.indexOf(e.target);

      if (index < inputs.length) {
        inputs[index + 1].focus();
      }
    }

    function focusNextFirst(e) {
      if (e.key != "Backspace" && e.key != "Delete") {
        const inputs = Array.from(e.target.form.querySelectorAll('input[type="number"]'));
        const index = inputs.indexOf(e.target);

        if (index < inputs.length) {
          inputs[index + 1].focus();
        }
      }
    }

    function focusNextLast(e) {
      if (e.key === "Backspace" || e.key === "Delete") {
        const inputs = Array.from(e.target.form.querySelectorAll('input[type="number"]'));
        const index = inputs.indexOf(e.target);

        if (index < inputs.length) {
          inputs[index - 1].focus();
        }
        e.target.value = ''
        return;
      }
    }

    return {phone, otps, loading, store,SendData, focusNext, focusNextLast, focusNextFirst}
  },
}


</script>


<style scoped>

.bg-body {
  background-image: url(../assets/img/Path1379.svg);
  background-size: 140vw;
  background-repeat: no-repeat;
  background-position: bottom;
}

.main-head {
  width: 80%;
  height: 80%;
  /*padding: 60px 60px 60px 60px;*/
}

.img-login {
  margin-bottom: 25px;
  width: 100% !important;
  max-width: 500px;
  /*height: 100% !important;*/
}

.main-element {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 30px;
  /*padding: 50px 30px 50px 30px;*/
  text-align: center;
  overflow: scroll;
  scrollbar-width: none;
}

.element-otp {
  text-align: center;

}

.input-otp {
  width: 50px;
  height: 50px;
  margin: 2px;
  line-height: 40px;
  border: none;
  border: 1px solid rgb(201, 201, 201);
  /*outline: 1px solid rgb(201, 201, 201);*/
  text-align: center;
  outline: none;
}

.input-otp:focus {
  outline: 1px solid #EC407A;
  border-radius: 50%;
  transition: 0.5s;
  margin: 3px;

}

.btn-otp {
  width: 80%;
  border: none;
  line-height: 35px;
}

.a-otp {
  text-decoration: none;
  text-decoration: underline rgb(201, 201, 201);
  margin-top: 20px;
}

.div-a {
  padding: 0 30px 0 30px;
}

.digits_holder {
  direction: ltr;
}

</style>
