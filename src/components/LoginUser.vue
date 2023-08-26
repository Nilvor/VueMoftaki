<template>
  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">
    <div class="main-head">
      <div class="main-element shadow">
        <img class="img-login" src="../assets/img/Untitled-2.png" alt="">
        <div class="element-number">
          <p class="font-6">لطفا برای استفاده از امکانات اپلیکیشن فرم زیر را کامل کنید</p>
          <div class="d-flex div-input-number">
            <input v-model.lazy.trim="info.name" class="input-number rounded-pill font-5 shadow-sm" type="text"
                   placeholder="نام و نام خانوادگی">
            <div class="icon-phone bg-color">
              <img class="svg-phone" src="../assets/img/user(4).svg" alt="">
            </div>
          </div>

          <div class="d-flex div-input-number mt-2">
            <select v-model="info.city_id" class="input-number size-input d-flex rounded-pill font-6 shadow-sm"
                    style="background-color: white">
              <option id="city_id" v-for="item in city" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
            <div class="icon-phone bg-color center">
              <img class="svg-phone svg-loc" style="margin-left: 0" src="../assets/img/place.svg" alt="">
            </div>
          </div>

          <button class="bg-color btn-number rounded-pill text-white font-6" type="submit" @click="SendData">ثبت نام
          </button>
          <br><br>
        </div>
      </div>
    </div>


  </div>

</template>

<script>

import axios from "axios";
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import ProgressBar from "@/components/common/ProgressBar";
import validation from "@/assets/js/validation";


export default {
  name: "LoginUser",
  components: {ProgressBar},

  setup() {
    var url_base = localStorage.getItem('urlBase');
    var apikey = localStorage.getItem('apiKey')
    var loading = ref(true);

    var phone = useRoute().params.phone;
    var city = ref([])
    var info = reactive({
      name: "",
      city_id: 100,
    });

    axios.get('https://moftakiapp.ir/moftaki/api/city')
        .then(function (response) {
          loading.value = false
          city.value = response.data
        })


    function SendData() {

      if (info.name == '' || info.city_id == ''){
        validation('نام و شهر خود را وارد کنید')
        return false
      }

      loading.value = true
      axios.post(url_base+'register', {phone: phone, name: info.name, city_id: info.city_id, apikey:apikey})
          .then(function (response) {
            loading.value = false
            var res = response.data

            if (res.event.includes('exist')){
              validation('شما قبلا ثبت نام کرده اید')
            }else {
              localStorage.setItem('userId', res.user_id)
              window.location.href = '/homepage'
            }
          })
    }


    return {loading, info, phone, city, SendData}


  }

}
</script>

<style scoped>
#main {
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 1000px;

}

.bg-body {
  background-image: url(../assets/img/Path1379.svg);
  background-size: 140vw;
  background-repeat: no-repeat;
  background-position: bottom;
}

.img-login {
  margin-bottom: 25px;
  width: 100% !important;
  /*height: 100% !important;*/
}

.main-head {
  padding: 60px 20px;
}

.main-element {
  height: 80vh;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 50px 30px 50px 30px;
  text-align: center;
  overflow: scroll;
  scrollbar-width: none;
}

.element-number {
  text-align: center;

}

.input-number {
  width: 100%;
  line-height: 40px;
  border: none;
  border: 1px solid rgb(201, 201, 201);
  outline: 1px solid rgb(201, 201, 201);
  text-align: center;
}

.input-number:focus {
  outline: 1px solid #EC407A;
  transition: 0.5s;
}

.div-input-number {
  position: relative;
  text-align: center;
}

.svg-loc {
  margin-bottom: 16px;
}

.size-input {
  height: 45px;
}

.btn-number {
  width: 80%;
  border: none;
  line-height: 35px;
  margin-top: 20px;
}

.icon-phone {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  position: absolute;
  text-align: center;
  margin: 4px;
  padding: 7px;
}

.svg-phone {
  height: 20px;
}

input::placeholder {
  font-size: 10px;
}

.dialog_custom {
  width: 200px;
  height: 0;
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  overflow: hidden;
  transition: 0.5s;
  display: grid;
}

.button-close {
  border: none;

}

.svg-close-dialog {
  height: 10px;
  right: 15px;
  margin-bottom: 25px;
  margin-top: 5px;
}

.icon-bottom {
  width: 15px;
  height: 15px;
}

.hr-menu {
  padding: 0;
  color: #EC407A;
  margin: 10px;
}

.main-dialog {
  padding: 10px;
  border: #EC407A 1px solid;

}

</style>
