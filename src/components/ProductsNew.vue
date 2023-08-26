<template>

  <div id="main">
    <div class="p-body">
      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars">جدیدترین محصولات</div>
      </div>

      <ProgressBar v-if="loading"></ProgressBar>

      <div v-else class="row my-row m-0">
        <div class="grid-container high_seller" style="margin-bottom: 100px">
          <div v-for="item in products" :key="item.id" class="item-product bg-gray">

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
    <div class="holder-nav d-flex rounded-pill bg-color" id="basket" style="width: 95%; padding: 5px;">
      <div class="d-flex align-items-center justify-content-around">
        <div @click="UserValidate('ShopBasket')" style="width:150px;cursor: pointer"
             class="bg-color font-5 text-white rounded-pill btn-cart d-flex justify-content-around">
          <img src="../assets/img/add-to-basket.png" style="width: 20px;height: 20px">
          <span style="padding-right: 5px"> سبد خرید </span>
        </div>
        <div class="text-footer" style="text-align: left">
          <div class="d-flex align-items-center justify-content-end">
            <p class="font-5 color-white m-0 mx-2">{{ String(orders_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}</p>
            <p class="font-6 color-white m-0">تومان</p>
          </div>
          <p class="font-5 m-0 my-1 color-white">{{ orders_count }} قلم سفارش داده اید</p>
        </div>
      </div>
    </div>

  </div>


<!--  <BasketBuy :orders_price="orders_price" :orders_count="orders_count"></BasketBuy>-->

</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import ProgressBar from "@/components/common/ProgressBar";
import UserValidate from "@/assets/js/UserValidation";

export default {
  name: "ProductsNew",
  components: {ProgressBar},

  setup() {

    var url_base = localStorage.getItem('urlBase');
    var loading = ref(true)

    var store = useStore();
    var order_products = store.state.order.products;
    var orders_count = ref(store.state.order.orders_count)
    var orders_price = ref(store.state.order.orders_price)

    var products = ref([])

    axios.get(url_base + 'sort_products', {params: {action: 1, page: 1}})
        .then(function (response) {
          loading.value = false;
          var res = response.data
          console.log(res.products)
          products.value = res.products

          products.value.forEach((item) => {
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


    return {loading, products,orders_count,orders_price,PlusProduct,MinusProduct,UserValidate}
  }
}
</script>

<style scoped>

</style>
