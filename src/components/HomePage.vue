<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">

    <div class="main-nav">
      <nav class="w-100 d-flex navbar-light align-items-center justify-content-between" style="height: 40px">

        <div id="whiteback1" @click="FilterMenu" class="whiteback"></div>
        <div @click="FilterMenu" class="navbar-button bg-gray">
          <img class="svg-open-menu" src="../assets/img/open-menu(2).svg" alt="">
        </div>

        <!--          search action-->
        <div id="whiteback" @click="CloseSearch()" class="whiteback"></div>
        <div v-if="open_search" @click="sea" id="search" class="d-flex align-items-center div-search-nav">
          <img @click="Search" src="../assets/img/search-pink.png" style="width: 20px;height: 20px;">
          <input id="search_input" v-model="searchword" class="search-nav bg-gray font-6" placeholder="جستجو">
        </div>

        <div v-else @click="OpenSearch" class="d-flex align-items-center div-search-nav">
          <img src="../assets/img/search(1).svg" style="width: 20px;height: 20px;">
          <img src="../assets/img/Moftaki_Logo_Final_Present-02.png" class="menu-logo">
        </div>
        <!--         end search action-->

        <div class="d-flex align-items-center justify-content-end" style="width: 150px">
          <img src="../assets/img/time(3).png" style="height: 20px;width: 20px">
          <div style="font-size: 10px" class="d-flex align-items-center mx-2"> {{ open }} الی {{ close }}</div>
          <img v-if="opentime" src="../assets/img/is_open.png" style="height: 15px;width: 15px">
          <img v-else src="../assets/img/is_close.png" style="height: 15px;width: 15px">
        </div>

      </nav>
    </div>

    <div>
      <div id="load" style="display: flex;align-items: center;justify-content: space-between;height: 50px">
        <p class="font-5 m-0 mt-4 mb-2">ویژه</p>
      </div>
      <div class="row my-row m-0">
        <div class="p-0" style="width: 100%;display: flex;justify-content: space-around">

          <router-link :to="{name:'ProductsNew'}" class="item-product-home-top bg-light-pink router_link">
            <img class="img-product" src='https://moftakiapp.ir/moftaki/storage/files/newest.png' alt="">
            <p class="font-6 title-card fw-bold"> جدیدترین محصولات </p>
          </router-link>

          <router-link :to="{name:'ProductsDiscount'}" class="item-product-home-top bg-light-pink router_link">
            <img class="img-product" src='https://moftakiapp.ir/moftaki/storage/files/discounts.png' alt="">
            <p class="font-6 title-card fw-bold"> تخفیف ها </p>
          </router-link>

          <router-link :to="{name:'ProductsView'}" class="item-product-home-top bg-light-pink router_link">
            <img class="img-product" src='https://moftakiapp.ir/moftaki/storage/files/most_visited.png' alt="">
            <p class="font-6 title-card fw-bold"> پربازدید ترین </p>
          </router-link>

        </div>
      </div>

      <p class="font-5 m-0 mt-4 mb-2">دسته بندی ها</p>
      <div class="row my-row m-0">

        <router-link v-for="item in category" :key="item.id" class="col-4 p-0 router_link"
                     :to="{ name:'CategorySelect',params:{catid:item.id}}">
          <div class="item-product-home bg-cygn">
            <img class="img-product" :src="item.pic" style="width: 100%;height: 100%">
            <p class="font-6 fw-bold title-card">{{ item.name }}</p>
          </div>
        </router-link>

      </div>

      <p class="font-5 m-0 mt-4 mb-2">پرفروش ترین ها</p>
      <div class="grid-container high_seller">
        <div v-for="item in highseller" :key="item.id" class="item-product bg-gray" style="min-width: 130px">

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

          <p class="text-underlin font-color font-5 m-0 mx-1" style="width: 100%;direction: rtl">
            {{ String(item.this_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
          </p>

        </div>
      </div>
    </div>

    <div>
      <div id="filter_menu" class="bg-navbar" style="">
        <div class="top-navbar" @click="closeMenu">
        </div>

        <div class="text-decoration-none" @click="UserValidate('UserOrdersOk')">
          <div class="d-flex div-botton">
            <img class="icon-bottom" src="../assets/img/shopping-cart.svg" alt="">
            <p class="menu_select font-6 text-dark m-0 mx-2">سفارشات من</p>
          </div>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="UserValidate('UserWallet')">
          <div class="d-flex div-botton">
            <img class="icon-bottom" src="../assets/img/wallet(4).svg" alt="">
            <p class="menu_select font-6 text-dark m-0 mx-2">مدریت کیف پول</p>
          </div>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="UserValidate('UserFavorites')">
          <div class="d-flex div-botton">
            <img class="icon-bottom" src="../assets/img/heart.svg" alt="">
            <p class="menu_select font-6 text-dark m-0 mx-2">علاقه مندی ها</p>
          </div>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="UserValidate('UserPayments')">
          <div class="d-flex div-botton">
            <img class="icon-bottom" src="../assets/img/credit-card-payment.svg" alt="">
            <p class="menu_select font-6 text-dark m-0 mx-2">پرداخت های من</p>
          </div>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="UserValidate('UserTicket')">
          <div class="d-flex div-botton">
            <img class="icon-bottom" src="../assets/img/support.svg" alt="">
            <p class="menu_select font-6 text-dark m-0 mx-2">ارتباط با پشتیبانی</p>
          </div>
        </div>

        <hr class="hr-menu">
        <a class="text-decoration-none" href="">
          <div class="d-flex div-botton">
            <img class="icon-bottom" src="../assets/img/logout.svg" alt="">
            <p @click="LogOut" class="menu_select font-6 text-dark  m-0 mx-2">خروج از اپلیکیشن</p>
          </div>
        </a>
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

</template>

<script>
import {ref} from "vue";
import axios from "axios";
import UserValidate from "@/assets/js/UserValidation";
import {useStore} from "vuex";
import router from "@/router";
import validation from "@/assets/js/validation";
import ProgressBar from "@/components/common/ProgressBar";

export default {
  name: "HomePage",
  components: {ProgressBar},

  setup() {

    var url_base = localStorage.getItem('urlBase');
    var loading = ref(true);

    var store = useStore();
    var order_products = store.state.order.products;
    var orders_count = ref(store.state.order.orders_count)
    var orders_price = ref(store.state.order.orders_price)

    console.log(store)

    var open = ref('')
    var close = ref('')
    var opentime = ref()
    var open_search = ref(false)
    var pics = ref([])
    var category = ref([])
    var highseller = ref([])
    var searchword = ref('')

    axios.get(url_base + 'homepage')
        .then(function (response) {
          loading.value = false
          var res = response.data

          console.log(res)

          opentime.value = res.opentime
          open.value = res.open
          close.value = res.close
          pics.value = res.pics
          category.value = res.category
          highseller.value = res.highseller

          highseller.value.forEach((item) => {
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


    function FilterMenu() {
      var filter_menu = document.getElementById("filter_menu");
      var whiteback1 = document.getElementById("whiteback1");

      if (filter_menu.style.height === "300px") {
        filter_menu.style.height = "0px";
        whiteback1.style.display = "none";
      } else {
        filter_menu.style.height = "300px";
        whiteback1.style.display = "block";
      }
    }

    function OpenSearch() {
      var whiteback = document.getElementById("whiteback");
      whiteback.style.display = 'block'
      open_search.value = true
    }

    function CloseSearch() {
      var whiteback = document.getElementById("whiteback");
      whiteback.style.display = 'none'
      open_search.value = false
    }

    function Search() {
      if (searchword.value == "") {
        validation('نام محصول مورد نظر را وارد کنید')
        return false
      }
      router.push({name: 'SearchPage', params: {search: searchword.value}})
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

    function LogOut() {
      localStorage.clear()
      router.push({name: '/'})
    }

    return {
      loading,
      opentime,
      open,
      close,
      open_search,
      searchword,
      pics,
      category,
      highseller,
      orders_count,
      orders_price,
      PlusProduct,
      MinusProduct,
      FilterMenu,
      OpenSearch,
      CloseSearch,
      Search,
      UserValidate,
      LogOut
    }
  },
}
</script>

<style scoped>

.p-body {
  padding: 10px;
}

.bg-navbar {
  background-color: white;
  border-radius: 30px 30px 0 0;
  height: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 15px #c5c3c3;
  transition: 0.5s;
  z-index: 9;
}

.navbar-button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  padding: 10px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-open-menu {
  height: 10px;
  margin-top: 2px;
}


.icon-navbar {
  display: inline-block;
  width: 20px !important;
  height: 20px !important;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.svg-shopping {
  height: 15px;
  margin-top: 2px;
}

.div-search-nav {
  width: 240px !important;
  height: 30px;
  position: relative;
  right: 20px;
}

.svg-search {
  width: 30px !important;
  height: 30px !important;
  position: absolute;
  margin: 9px;
  right: 5px;
}

.search-nav {
  width: 180px!important;
  height: 30px !important;
  border: none;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
  background-color: #F3F3F3;
  outline: 1px solid #F3F3F3;
}

.menu-logo {
  height: 80px !important;
  width: 200px !important;
  border: none;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
}

/* ==navabr== */

/* ==menu==  */
.bg-navbar {
  background-color: white;
  border-radius: 30px 30px 0 0;
  height: 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 15px #c5c3c3;
  transition: 0.5s;
}

.top-navbar {
  height: 5px;
  width: 50%;
  background-color: #f1f1f1;
  margin: 3px 97px;
  cursor: pointer;
  /* text-align: center; */
}

.div-botton {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 40px;
  align-items: center;

}

.icon-bottom {
  width: 15px;
  height: 15px;
}

.hr-menu {
  padding: 0;
  margin: 40px;
  margin-top: 0px;
  margin-bottom: 0;
  color: rgb(207 207 207);
}

#userid_error {
  width: 250px;
  height: 150px;
  /*border: 2px solid white;*/
  background-color: rgba(212, 0, 97, 0.7);
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 5;
  margin: 0;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ==menu==  */
.my-row {
  width: 100%;
  display: flex;
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

.div-discount {
  padding: 4px;
  position: absolute;
  height: 17px;
  width: 17px;
  border-radius: 25px;
  direction: ltr;
  left: 5px;
}

/* ======================================================== */
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

.menu_select:hover, .menu_select:active, .menu_select:visited {
  color: #D40061 !important;
  font-size: 11px !important;
  cursor: pointer;
}

.swal2-popup {
  font-size: 0.6rem ! important;
}

.categories {
  height: 140px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between
}

.high_seller {
  display: flex !important;
  direction: rtl !important;
  height: 250px !important;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 330px
}

.high_seller_box {
  height: 210px !important;
  min-width: 100px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
}

#search {
  width: 60vw;
  height: 100%;
  z-index: 10
}

#search_btn {
  width: 200px;
  display: flex;
  justify-content: left;
  align-items: center;
}

</style>
