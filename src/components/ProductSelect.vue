<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">

    <div class="d-flex header_addres">
      <div onclick=" history.back()" style="cursor: pointer">
        <img class="svg_back" src="../assets/img/back.svg" alt="">
      </div>
      <div style="display: flex;align-items: center;justify-content: space-around">

        <div class="navbar-button" type="button">
          <div class="icon-navbar" @click="CopyText">
            <img class="svg-share" src="../assets/img/share(2).svg" alt="">
          </div>
        </div>

        <div @click="UserValidateLike" class="navbar-button">
          <div class="icon-navbar">
            <img v-if="liked" class="svg-heart" src="../assets/img/liked.svg" alt="">
            <img v-else class="svg-heart" src="../assets/img/heart.svg" alt="">
          </div>
        </div>

        <div @click="UserValidate('ShopBasket')" class="navbar-button">
          <div class="icon-navbar">
            <img class="svg-heart" src="../assets/img/shopping-cart.svg" alt="" style="position: relative">
            <div class="number bg-color text-white font-6 shadow-sm rounded d-flex-center"
                 style="position: absolute;top:0;left:0;width: 17px;height: 17px;">
              {{ orders_count }}
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="p-body" v-if="loading == false">

      <carousel>
        <slide v-for="item in product.pics" :key="item.id">
          <img class="img-product-top" :src="item">
        </slide>
        <template #addons>
          <navigation/>
          <pagination/>
        </template>
      </carousel>

      <div class="d-flex title-product">
        <p>{{ product.name }}</p>
        <div v-if="product.discount > 0" class="discount-product bg-color font-5 text-white">%{{ product.discount }}
        </div>
      </div>

      <div class="d-flex add-price mb-5">

        <img v-if="product.order_count_select >= product.count"
             class="svg-add add_min_btn" src="../assets/img/plus_off.png">
        <img v-else-if="product.order_count_select >= product.max_num"
             class="svg-add add_min_btn" src="../assets/img/pluss_off_order.png">
        <img v-else-if="product.order_count_select > 0" @click="PlusProduct(product)" class="svg-add add_min_btn"
             src="../assets/img/pluss_right.png" alt="">
        <img v-else @click="PlusProduct(product)" class="svg-add add_min_btn" src="../assets/img/plus.svg" alt="">

        <div id="product_count" class="font-5 number-pro"
           :style="product.order_count_select > 0 ? 'visibility :visible' : 'visibility :hidden'">
          {{ product.order_count_select }}
        </div>

        <img class="svg-plus" src="../assets/img/minus_left.png" @click="MinusProduct(product)"
             :style="product.order_count_select > 0 ? 'visibility :visible' : 'visibility :hidden'">

        <div v-if="product.count < 1">
          <p class="font-5 div-price m-0 font-color"> موجودی به اتمام رسیده </p>
        </div>

        <div v-else style="display: flex;align-items: center">
          <p class="font-5 div-price m-0 font-color">
            {{ String(product.this_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
          </p>
          <p v-if="product.discount > 0" class="m-0 text-decoration-line-through text-muted font-5 before-price">
            {{ String(product.price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }}
          </p>
        </div>
      </div>

      <div class="accordion accordion-flush mb-5" id="accordionFlushExample">
        <div v-for="item in product.information" :key="item.id" class="accordion-item">
          <button v-if="item.content != '' && item.content != null" class="accordion-button collapsed" data-bs-toggle="collapse"
                  :data-bs-target="'#flush-collapse'+item.id"
                  style="border-top: 1px solid pink;border-top-left-radius: 10px;border-top-right-radius:10px;color: #D40061">
            <div style="font-size: 13px;">{{ item.title }}</div>
          </button>
          <div :id="'flush-collapse'+item.id" class="accordion-collapse collapse">
            <div class="accordion-body font-6"
                 style="border:1px solid #ffc0d5;border-bottom-right-radius:10px;border-bottom-left-radius: 10px">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>

      <p>محصولات مرتبط</p>

      <div class="grid-container product_rell" style="position: relative">
        <ProgressBar v-if="loading"></ProgressBar>
        <EmptyPage v-else-if="product_rell.length < 1" style="position: absolute;top: 20%"></EmptyPage>

        <div v-else v-for="item in product_rell" :key="item.id" class="item-product bg-gray" style="min-width: 130px">

          <div @click="ChangeProduct(item.id)">
            <div v-if="item.discount >0" class="div-discount bg-color font-6 text-white">%{{ item.discount }}</div>
            <img class="img-product" :src="item.pic" alt="" style="height: 150px">
          </div>

          <div class="d-flex align-items-center justify-content-around mt-2" style="width: 70px">

            <img v-if="item.order_count_select >= item.count"
                 class="svg-add add_min_btn" src="../assets/img/plus_off.png">
            <img v-else-if="item.order_count_select >= item.max_num"
                 class="svg-add add_min_btn" src="../assets/img/pluss_off_order.png">
            <img v-else-if="item.order_count_select > 0" @click="PlusProduct(item)" class="svg-add add_min_btn"
                 src="../assets/img/pluss_right.png" alt="">
            <img v-else @click="PlusProduct(item)" class="svg-add add_min_btn" src="../assets/img/plus.svg" alt="">

            <span :style="item.order_count_select > 0 ? 'visibility :visible' : 'visibility :hidden'"
                  class="svg-add font-6 d-flex-center bg-color color-white add_min_btn">{{ item.order_count_select }}
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

          <p class="text-underlin font-color font-5 m-0 mx-1" style="width: 100%;direction: rtl">
            {{ String(item.this_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
          </p>

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
  </div>

</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import {useStore} from 'vuex'

import swal from "sweetalert2";
import router from "@/router";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";

import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import UserValidate from "@/assets/js/UserValidation";


export default {
  name: "ProductSelect",
  components: {ProgressBar, EmptyPage, Carousel, Slide, Pagination, Navigation},

  setup() {

    var loading = ref(true);
    var url_base = localStorage.getItem('urlBase');
    var main_domain = localStorage.getItem('mainDomain');
    var url_pic = localStorage.getItem('urlPic');
    var user_id = ref(localStorage.getItem('userId'))

    if (user_id.value == null) {
      user_id.value = -1
    }

    var productid = ref(useRoute().params.proid);

    var store = useStore();
    var order_products = store.state.order.products;
    var orders_count = ref(store.state.order.orders_count)
    var orders_price = ref(store.state.order.orders_price)

    var liked = ref()
    var product = ref()
    var product_rell = ref([])

    axios.get(url_base + 'product', {
      params: {
        product_id: productid.value,
        user_id: user_id.value
      }
    }).then(function (response) {
      loading.value = false
      var res = response.data
      console.log(res)

      liked.value = res.liked
      product.value = res.product
      product_rell.value = res.product_rell

      product.value.order_count_select = 0
      if (order_products.length > 0) {
        order_products.forEach((items) => {
          if (items.id == product.value.id) {
            product.value.order_count_select = items.order_count_select
          }
        })
      }

      product_rell.value.forEach((item) => {
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

    function UserValidateLike() {
      if (user_id.value == -1) {

        swal.fire({
          width: 300,
          height: 100,
          text: "برای دسترسی به این قسمت ابتدا باید ثبت نام کنید",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#D40061',
          cancelButtonColor: '#8b002e',
          confirmButtonText: 'ثبت نام',
          cancelButtonText: 'لغو'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push({name: "LoginPhone"})
          }
        })
      } else {
        axios.get(url_base+'liked', {
          params: {
            product_id: productid.value,
            user_id: user_id.value
          }
        }).then(function (response) {
          var res = response.data
          console.log(res)

          if (res.event == 'unlike product') {
            liked.value = false
          } else if (res.event == 'like product') {
            liked.value = true
          }

        })
      }
    }

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

    function CopyText() {

      navigator.clipboard.writeText(
          ' اپلیکیشن خرید آنلاین مفتکی ' + '\n' + '\n'

          + ' نام محصول : ' + product.value.name + '\n'
          + ' قیمت محصول : ' + product.value.price + ' تومان ' + '\n'
          + ' درصد تخفیف : ' + product.value.discount + ' % ' + '\n'
          + 'قیمت با احساب تخفیف : ' + product.value.this_price + ' تومان ' + '\n' + '\n'

          + ' برای مشاهده محصول به آدرس زیر 👇 مراجعه فرمایید. ' + '\n'
          + 'https://webapp.moftakiapp.ir/product_select/' + product.value.id + '\n'
      );
      swal.fire({
        text: 'مشخصات محصول کپی شد',
        width: 200,
        height: 50,
        icon: 'success',
        color: '#EC407A',
        confirmButtonColor: '#D40061',
        showConfirmButton: false,
        timer: 1500
      });
    }

    function ChangeProduct(id) {

      router.replace({name: 'ProductSelect', params: {proid: id}})
      productid.value = id

      loading.value = true
      axios.get(url_base + 'product', {
        params: {
          product_id: productid.value,
          user_id: user_id.value
        }
      }).then(function (response) {
        loading.value = false
        var res = response.data
        console.log(res)

        liked.value = res.liked
        product.value = res.product
        product_rell.value = res.product_rell

        product.value.order_count_select = 0
        if (order_products.length > 0) {
          order_products.forEach((items) => {
            if (items.id == product.value.id) {
              product.value.order_count_select = items.order_count_select
            }
          })
        }
      })
    }


    return {
      loading,
      liked,
      product,
      product_rell,
      user_id,
      productid,
      main_domain,
      url_pic,
      orders_count,
      orders_price,
      PlusProduct,
      MinusProduct,
      UserValidate,
      UserValidateLike,
      CopyText,
      ChangeProduct
    }
  },
}
</script>

<style>
.div-svg {
  left: 0;
  position: absolute;
  padding-left: 15px;
}

.svg-share {
  height: 13.5px;
  margin-left: 15px;
}

.svg-heart {
  height: 15px;
  width: 15px;
  margin-left: 15px;
}

.div-number {
  position: relative;
}

.number-product {
  text-align: center;
  border-radius: 25px;
  height: 13px;
  width: 13px;
  position: absolute;
  right: -5px;
  top: -2px;
  padding: 2px;
  padding-right: 0;
}

.svg-shopping-cart {
  height: 13.5px;

}

/* ==================================== */
.img-product-top {
  width: 100%;
  border-radius: 10px;
  /*margin-top: 15px;*/
}

.title-product {
  text-align: center;
  position: relative;
  margin-top: 15px;
}

.discount-product {
  height: 23px;
  border-radius: 0 20px 20px 20px;
  padding: 5px 12px;
  position: absolute;
  left: 0;
}

.add-price {
  align-items: center;
  position: relative;
}

.div-price {
  left: 0;
  position: absolute;

}

.before-price {
  position: absolute;
  left: 70px;
}

.text-header {
  margin-right: 25px;
  align-items: center;
}

.div-discount {
  padding: 5px;
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 25px;
  direction: ltr;
  left: 5px;
}

.add-card {
  height: 23px;
  width: 23px;
  border-radius: 0 25px 25px 25px;
  background-color: white;
  border: 0.5px solid rgb(233 233 233);
  padding: 6px;
  margin-right: 45px;
}

.svg-plus {
  height: 20px;
  cursor: pointer;
}

/* ======================footer=========== */
.div-footer {
  height: 65px;
  width: 100%;
  /*box-shadow: 0 0 5px #c9c9c9;*/
  padding: 15px;
  border-top: 1px solid #d40061;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* padding-top: 5px; */
  position: relative;
  margin-top: 40px;
}

.btn-cart {
  padding: 10px;
  border: none;
}

.text-footer {
  position: absolute;
  left: 15px;
}

.accordion {
  --bs-accordion-color: #212529;
  --bs-accordion-bg: #fff;
  --bs-accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
  --bs-accordion-border-color: var(--bs-border-color);
  --bs-accordion-border-width: none !important;
  --bs-accordion-border-radius: 0.375rem;
  --bs-accordion-inner-border-radius: calc(0.375rem - 1px);
  --bs-accordion-btn-padding-x: 1.25rem;
  --bs-accordion-btn-padding-y: 1rem;
  --bs-accordion-btn-color: #212529;
  --bs-accordion-btn-bg: var(--bs-accordion-bg);
  --bs-accordion-btn-icon: '' !important;
  --bs-accordion-btn-icon-width: 1.25rem;
  --bs-accordion-btn-icon-transform: rotate(-180deg);
  --bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;
  --bs-accordion-btn-active-icon: '' !important;
  --bs-accordion-btn-focus-border-color: red !important;
  /*--bs-accordion-btn-focus-box-shadow: 0 0 0 0.25remrgba(13, 110, 253, 0.25);*/
  --bs-accordion-body-padding-x: 1.25rem;
  --bs-accordion-body-padding-y: 1rem;
  --bs-accordion-active-color: red !important;
  --bs-accordion-active-bg: #e7f1ff;
}

.accordion-button:focus {
  z-index: 3;
  border-color: red !important;
  outline: 0;
  box-shadow: var(--bs-accordion-btn-focus-box-shadow);
}

#accordionFlushExample {
  width: 90%;
  margin: auto;
}

.accordion-button:not(.collapsed) {
  color: white !important;
  background-color: #fc709f !important;
  box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color);
}

.product_rell {
  display: flex !important;
  direction: rtl !important;
  max-height: 250px !important;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 330px
}

</style>
