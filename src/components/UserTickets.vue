<template>

  <div id="main">
    <div class="p-body">
      <div class="d-flex header_addres">
        <router-link :to="{name:'UserTicket'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> تیکت های من</div>
      </div>

      <ProgressBar v-if="loading"></ProgressBar>
      <EmptyPage v-else-if="tickets.length < 1"></EmptyPage>

      <div v-else class="div-element mt-3 p-3" v-for="ticket in tickets" :key="ticket.id">
        <div class="d-flex align-items-center">
          <p class="font-5 Price font-red"> {{ ticket.title_ticket }} </p>
        </div>
        <p class="my-0 my-3 font-5" style="text-align: justify"> {{ ticket.ticket }} </p>
      </div>

    </div>
  </div>

</template>

<script>


import {ref} from "vue";
import axios from "axios";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";

export default {
  name: "UserTickets",
  components: {ProgressBar, EmptyPage},

  setup() {

    let loading = ref(true)
    let nothing = ref(false);
    var user_id = localStorage.getItem('userId');
    let tickets = ref([])

    axios.get('https://moftakiapp.ir/moftaki/api/user_tickets', {params: {user_id: user_id, page: 1}})
        .then(function (response) {
          loading.value = false;
          var res = response.data
          if (res.items == "") {
            nothing.value = true
          } else {
            nothing.value = false
          }
          tickets.value = res.items

          console.log(res)
          console.log(user_id)

        })


    return {loading, nothing, tickets}
  }
}
</script>

<style>
.div-element {
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
}

.svg-minus {
  width: 30px;
  height: 30px;
}

.Price {
  margin: 0 15px 0 7px;
}

.color-successful {
  color: #D40061;
}
</style>
