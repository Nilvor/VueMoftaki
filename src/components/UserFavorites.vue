<template>

  <div id="main">
    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> علاقه مندی ها</div>
      </div>

      <ProgressBar v-if="loading"></ProgressBar>
      <EmptyPage v-else-if="favorite.length < 1"></EmptyPage>

      <div class="row my-row m-0 mt-3">
        <div class="grid-container">
          <div v-for="item in favorite" :key="item.id" class="item-product bg-gray">

            <router-link :to="{ name:'ProductSelect' , params:{proid:item.id} }">
              <div v-if="item.discount >0" class="div-discount bg-color font-7 text-white">%{{ item.discount }}</div>
              <img class="img-product" :src="item.pic" alt="" style="height: 150px">
            </router-link>

            <div class="d-flex align-items-center justify-content-around mt-1" style="width: 70px">
              <img v-if="item.order_count_select >= item.count"
                   class="svg-add add_min_btn" src="../assets/img/plus_off.png">
              <img v-else-if="item.order_count_select >= item.max_num"
                   class="svg-add add_min_btn" src="../assets/img/pluss_off_order.png">
              <img v-else-if="item.order_count_select > 0" @click="PlusProduct(item)" class="svg-add add_min_btn"
                   src="../assets/img/pluss_right.png" alt="">
              <img v-else @click="PlusProduct(item)" class="svg-add add_min_btn" src="../assets/img/plus.svg" alt="">
              <span :style="item.order_count_select > 0 ? 'visibility :visible' : 'visibility :hidden'"
                    class="svg-add font-7 d-flex-center bg-color color-white add_min_btn">{{ item.order_count_select }}
              </span>
              <img :style="item.order_count_select > 0 ? 'visibility :visible' : 'visibility :hidden'"
                   @click="MinusProduct(item)" class="svg-add add_min_btn" src="../assets/img/minus_left.png" alt="">
            </div>

            <div style="height: 60%;direction: rtl;text-align: center">
              <div class="font-5 mt-2 product_info">{{ item.name }}</div>
              <div class="font-6 size-card product_info">{{ item.info }}</div>
            </div>

            <p v-if="item.discount >0" class="text-decoration-line-through font-6 m-0 text-muted mr-4"
               style="direction: rtl"> {{ String(item.price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
            </p>

            <p class="text-underlin font-color font-6 m-0 mx-1" style="width: 100%;direction: rtl">
              {{ String(item.this_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
            </p>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>


import axios from "axios";
import {ref} from "vue";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";
import {useStore} from "vuex";

export default {
  name: "UserFavorites",
  components: {ProgressBar, EmptyPage},

  setup() {
    var main_domain = localStorage.getItem('mainDomain');
    var url_base = localStorage.getItem('urlBase');
    var loading = ref(true);

    var user_id = localStorage.getItem('userId');
    var favorite = ref([]);

    var store = useStore();
    var order_products = store.state.order.products;
    var orders_count = ref(localStorage.getItem('ordersCount'));
    var orders_price = ref(localStorage.getItem('ordersPrice'));

    axios.get(url_base + 'user_favorite', {params: {user_id: user_id}})
        .then(function (response) {
          loading.value = false
          var res = response.data
          favorite.value = res.items

          favorite.value.forEach((item) => {
            item.order_count_select = 0

            if (order_products.length > 0) {
              order_products.forEach((items) => {
                if (items.id == item.id) {
                  item.order_count_select = items.order_count_select
                }
              })
            }
          })
        })

    function MinusProduct(productSelect) {
      parseInt(productSelect.order_count_select--)
      parseInt(orders_count.value--)
      orders_price.value = parseInt(orders_price.value) - parseInt(productSelect.this_price)
      store.commit('ProductUpdate', productSelect)
    }

    function PlusProduct(productSelect) {
      parseInt(productSelect.order_count_select++)
      parseInt(orders_count.value++)
      orders_price.value = parseInt(orders_price.value) + parseInt(productSelect.this_price)
      store.commit('ProductUpdate', productSelect)
    }

    return {loading, main_domain, favorite,PlusProduct,MinusProduct}
  }
}


</script>

<style scoped>

/*.text-header {*/
/*  margin-right: 25px;*/
/*  align-items: center;*/
/*}*/

/*.item-product {*/
/*  !* height: 165px; *!*/
/*  padding: 5px;*/
/*  border-radius: 8px;*/
/*  position: relative;*/
/*  margin: 4px;*/
/*  padding-bottom: 10px;*/

/*}*/
</style>
