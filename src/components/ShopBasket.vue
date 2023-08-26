<template>

  <div id="main">

    <div class="p-body">
      <div class="d-flex header_addres">
        <router-link :to="{name:'HomePage'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars">سبد خرید</div>
      </div>
      <div class="d-flex justify-content-center margin-div">
        <hr class="hr-header">

        <div class="bg-light-pink element-top position-element div-add">
          <img class="svg-cart position-svg" src="../assets/img/add-to-basket_red.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1">سبد خرید</p>
        </div>

        <div class="bg-gray-2 element-top position-element">
          <img class="svg-cart size-package" src="../assets/img/package_black.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1 over-text">اطلاعات ارسال</p>
        </div>

        <div class="bg-gray-2 element-top position-element div-credit">
          <img class="svg-cart position-svg" src="../assets/img/credit-card-payment_black.svg" alt="">
          <p class="font-7 text-muted text-center m-0 mt-1">اطلاعات پرداخت</p>
        </div>
      </div>

      <div class="div-element h-element" v-for="item in orders" :key="item.id">
        <div class="d-flex">
          <router-link :to="{ name:'ProductSelect' , params:{proid:item.id} }">
            <img @click="product(item.id)" style="cursor: pointer" class="img-cart2" :src="item.pic" alt=""
                 width="100%" height="100%">
          </router-link>
          <div class="group-text">
            <div class="div-svg-add">
              <img class="svg-add2" src="../assets/img/add(2)1.svg" alt="" @click="DeleteProduct(item)">
            </div>
            <p class="font-6 name-product" @click="product(item.id)" style="cursor: pointer">{{ item.name }}</p>
            <div class="d-flex text-css" style="width: 230px;justify-content: space-between;align-items: center">
              <div class="d-flex" style="width: 30px">
                <img v-if="item.order_count_select >= item.count"
                     class="svg-add add_min_btn" src="../assets/img/plus_off.png">
                <img v-else-if="item.order_count_select >= item.max_num"
                     class="svg-add add_min_btn" src="../assets/img/pluss_off_order.png">
                <img v-else-if="item.order_count_select > 0" @click="PlusProduct(item)" class="svg-add add_min_btn"
                     src="../assets/img/pluss_right.png" alt="">
                <img v-else @click="PlusProduct(item)" class="svg-add add_min_btn" src="../assets/img/plus.svg" alt="">
                <p class="font-6 number-pro">{{ item.order_count_select }}</p>
                <img class="svg-plus" src="../assets/img/minus_left.png" alt="" @click="MinusProduct(item)">
              </div>
              <div style="display: flex">
                <p v-if="item.price != item.this_price"
                   class="text-decoration-line-through font-5  text-muted text-discount">
                  {{ String(item.price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
                </p>
                <p class="font-color m-0 font-5">
                  {{ String(item.this_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="div-element">
        <p class="text-aling font-7">جزئیات پرداخت</p>
        <hr class="hr-cart1">
        <div class="d-flex margin-col">
          <p class="font-6 m-0">تعداد اقلام</p>
          <p class="font-6 position-number m-0">{{ orders_count }}</p>
        </div>
        <hr class="hr-cart1">
        <div class="d-flex margin-col">
          <p class="font-6 m-0">جمع کل قبل از تخفیف</p>
          <p class="font-6 position-number m-0">{{ String(orders_all_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            تومان</p>
        </div>
        <hr class="hr-cart1">
        <div class="d-flex margin-col">
          <p class="font-6 m-0">سود شما از این خرید</p>
          <p class="font-6 position-number m-0">{{ String(orders_profit).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
            تومان</p>
        </div>

        <div class=" bg-light-pink main-Price align-items-center my-3 ">
          <div class="margin-col d-flex">
            <p class="font-6 m-0">مبلغ قابل پرداخت</p>
            <div class="d-flex position-number">
              <p class="font-5 font-color m-0 mx-1">{{ String(orders_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}</p>
              <p class="font-6 m-0">تومان</p>
            </div>
          </div>
        </div>
      </div>

      <button @click="NextPage" class="bg-color rounded-pill font-6 text-light btn-payment">
        تایید و ادامه سبد خرید
      </button>


    </div>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import router from "@/router";
import validation from "@/assets/js/validation";

export default {
  name: "ShopBasket",

  setup() {

    var user_id = ref(localStorage.getItem('userId'))
    if (user_id.value == null) {
      user_id.value = -1
    }

    var store = useStore();
    var order_products = store.state.order.products;
    var orders_count = ref(store.state.order.orders_count);
    var orders_price = ref(store.state.order.orders_price);
    var orders_all_price = ref(store.state.order.orders_all_price);
    var orders_profit = ref(store.state.order.orders_profit);

    var orders = order_products

    function MinusProduct(productSelect) {
      parseInt(productSelect.order_count_select--)
      parseInt(orders_count.value--)
      orders_price.value = parseInt(orders_price.value) - parseInt(productSelect.this_price)
      orders_all_price.value = parseInt(orders_all_price.value) - parseInt(productSelect.price)
      orders_profit.value = orders_all_price.value - orders_price.value
      store.commit('ProductUpdate', productSelect)
    }

    function PlusProduct(productSelect) {
      parseInt(productSelect.order_count_select++)
      parseInt(orders_count.value++)
      orders_price.value = parseInt(orders_price.value) + parseInt(productSelect.this_price)
      orders_all_price.value = parseInt(orders_all_price.value) + parseInt(productSelect.price)
      orders_profit.value = orders_all_price.value - orders_price.value
      store.commit('ProductUpdate', productSelect)
    }

    function DeleteProduct(productSelect) {
      orders_count.value = orders_count.value - productSelect.order_count_select
      orders_price.value = parseInt(orders_price.value) - parseInt(productSelect.this_price) * parseInt(productSelect.order_count_select)
      orders_all_price.value = parseInt(orders_all_price.value) - parseInt(productSelect.price) * parseInt(productSelect.order_count_select)
      orders_profit.value = orders_all_price.value - orders_price.value
      productSelect.order_count_select = 0
      store.commit('ProductUpdate', productSelect)
    }

    function product(id) {
      router.push({name: 'ProductSelect', params: {proid: id}})
    }

    function NextPage() {

      if (orders_count.value < 1) {
        validation('سبد خرید خالی است..!')
      } else {
        router.push({name: 'ShopInfo'})
      }

    }

    return {
      orders,
      orders_count,
      orders_price,
      orders_all_price,
      orders_profit,
      PlusProduct,
      MinusProduct,
      DeleteProduct,
      product,
      NextPage
    }
  }
}
</script>

<style scope>

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

/* ============================================= */
.div-element {
  border: 1px solid rgb(233 233 233);
  border-radius: 10px;
  position: relative;
  margin-top: 20px;
  padding: 5px;
}

.h-element {
  height: 100px;
}

.img-cart2 {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}

.div-svg-add {
  border-radius: 20px;
  background-color: #b1b1b1;
  height: 20px;
  width: 20px;
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 0px 2.5px;
}

.svg-add2 {
  height: 15px;
  cursor: pointer;
}

.name-product {
  position: absolute;
  top: 25px;
}

.group-text {
  margin-right: 30px;

}

.svg-plus {
  height: 25px;
}

.text-css {
  position: absolute;
  top: 60px;
}

.text-discount {
  margin: 0 10px 0 20px;
}

/*.number-pro {*/
/*  margin: 0 20px 0 20px;*/
/*}*/

.hr-cart1 {
  padding: 0;
  margin: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: rgb(207 207 207);

}

.margin-col {
  margin: 0 20px;
  position: relative;
}

.position-number {
  position: absolute;
  left: 0px;
}

.main-Price {
  border-radius: 5px;
  padding: 10px 0;
}

.btn-payment {
  width: 100%;
  border: none;
  padding: 15px;
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>
