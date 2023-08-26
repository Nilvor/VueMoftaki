<template>
  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">

    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> ارتباط با پشتیبانی</div>
      </div>

      <input v-model.lazy.trim="tiketUp" class="input-1 font-7 text-center" type="text" placeholder="موضوع تیکت">

      <textarea v-model.lazy.trim="tiketDown" class="input-2 font-6" type="text"
                placeholder="توضیحات مورد نظر خود را وارد کنید"></textarea>

      <button @click="SendTicket" class="bg-color btn-sub rounded-pill text-white font-6" type="submit">
        <img class="svg-comment" src="../assets/img/comment.svg" alt="">
        ارسال تیکت
      </button>

      <div class="d-flex btn-flex">
        <router-link :to="{name:'UserTickets'}" class="call-support rounded-pill font-6 text-white"
                     style="text-align: center">
          تیکت های من
        </router-link>

        <button class="call-support  rounded-pill  font-6 text-white">
          <a href="tel:03131234567" style="text-decoration: none;color: white">
            <img class="svg-phone" src="../assets/img/phone-call(6).svg" alt="">
            تماس با پشتیبان
          </a>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import swal from "sweetalert2";
import ProgressBar from "@/components/common/ProgressBar";
import validation from "@/assets/js/validation";

export default {
  name: "UserTicket",
  components: {ProgressBar},

  setup() {
    var url_base = localStorage.getItem('urlBase');
    var webapp_url_base = localStorage.getItem('webappUrlBase');
    var apikey = localStorage.getItem('apiKey')
    var loading = ref(false);

    var user_id = localStorage.getItem('userId');
    var tiketUp = ref("")
    var tiketDown = ref("")

    function SendTicket() {

      if (tiketUp.value == '' || tiketDown.value == '') {
        validation('موضوع و توضیحات تیکت را وارد کنید')
        return false
      }

      loading.value = true
      axios.post(url_base + 'insert_ticket', {
        apikey: apikey,
        user_id: user_id,
        title_ticket: tiketUp.value,
        ticket: tiketDown.value

      }).then(function (response) {
            loading.value = false

            var res = response.data
            console.log(res)
            if (res['status'] === 'ok') {
              swal.fire({
                text: 'تیکت ارسال شد',
                width: 300,
                height: 50,
                icon: 'success',
                color: '#EC407A',
                confirmButtonText: 'فهمیدم',
                confirmButtonColor: '#D40061',
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = webapp_url_base+'user_tickets';
                }
              })
            }
          })

    }

    return {loading, tiketUp, tiketDown, SendTicket}
  }


}
</script>

<style>

.text-header {
  margin-right: 25px;
}

.input-1 {
  height: 45px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid rgb(233 233 233);
  outline: 1px solid rgb(233 233 233);
  text-align: center;
  margin-top: 15px;

}

.input-1:focus {
  border: 1px solid #EC407A;
  transition: 0.5s;
}

.input-2 {
  height: 160px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid rgb(233 233 233);
  outline: 1px solid rgb(233 233 233);
  text-align: center;
  margin-top: 10px;
}

.input-2:focus {
  border: 1px solid #EC407A;
  transition: 0.5s;
}

.btn-sub {
  width: 100%;
  border: none;
  line-height: 35px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.svg-comment {
  height: 20px;
  margin-left: 10px;
  margin-top: 3px;
}


.btn-flex {
  width: 100%;
}

.my-tiket {
  width: 50%;
  border: 1px solid #EC407A;
  line-height: 35px;
  background-color: white;
  margin-left: 2px;
}

.call-support {
  width: 50%;
  background-color: #D40061;
  border: none;
  line-height: 35px;
  margin-right: 2px;
}

.svg-phone {
  height: 20px;
  margin-left: 8px;
}

a {
  text-decoration: none;
  color: white;
}

a:visited {
  text-decoration: none;
  color: white;
}

.swal2-text {
  font-size: 0.5rem !important;
  font-weight: normal;
}

input::placeholder {
  font-size: 10px;
}

</style>
