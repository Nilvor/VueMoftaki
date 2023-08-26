<template>

  <div id="main">
    <div class="p-body" style="min-height: 160px">
      <div class="main-nav">
        <nav class="d-flex nav-home navbar-light">
          <div id="whiteback1" @click="toggleSheet" class="whiteback"></div>
          <button @click="toggleSheet" class="navbar-button" type="button">
            <div class="icon-navbar">
              <img class="svg-filter" src="../assets/img/filter(1).svg" alt="">
            </div>
          </button>

          <div class="d-flex div-search-nav">
            <input v-model="searchword" class="search-nav bg-gray font-6" type="search" placeholder="جستجو">
            <div style="cursor:pointer;" @click="Search()">
              <img class="svg-search" src="../assets/img/search(1).svg" alt="">
            </div>
          </div>

          <button class="navbar-button bg-gray" type="button" @click="UserValidate('ShopBasket')">
            <div class="icon-navbar">
              <img class="svg-shopping" src="../assets/img/shopping-cart.svg" alt="">
              <div class="number bg-color text-white font-5 shadow-sm d-flex-center">{{ orders_count }}</div>
            </div>
          </button>

        </nav>
      </div>

      <ProgressBar v-if="loading"></ProgressBar>

      <div id="cats">
        <div ref="mainDiv" id="maincat" class="d-flex category-main font-6" style="overflow-x: scroll">
          <div v-for="item in category" :key="item.id" :class="{'router-link-active' : catid == item.id }"
               class="rotert_link" style="cursor: pointer" :id="'main'+item.id">
            <div id="select_category" @click="ChangeCategory(item.id)" class="category-element d-flex nav-link"
                 style="padding: 5px;justify-content: space-between;">
              <span style="margin-left: 5px;white-space: nowrap">{{ item.name }}</span>
              <img :src="item.icon" style="height: 20px;width: 20px">
            </div>
          </div>
        </div>
        <div class="d-flex category-minor font-6" id="altcat">
          <a @click="Scrolling(item.id)" :class="{'router-link-active' : subid == item.id }"
             v-for="item in alt_category" :key="item.id" :id="'alt'+item.id"
             class="rotert_link" style="cursor: pointer">
            <div class="category-element d-flex nav-link"
                 style="padding: 5px;justify-content: space-between;height: 30px">
              <span id="subname" style="margin-left: 5px;white-space: nowrap">{{ item.name }}</span>
            </div>
          </a>
        </div>
      </div>

      <EmptyPage v-if="products.length < 1 && loading == false" class="products_group"></EmptyPage>
      <div v-else class="products_group" v-for="items in products" :key="items.subid">
        <br>
        <span v-if="items.products.length > 0" :id="'sub'+items.subid" class="subname">{{ items.subname }}</span>
        <hr v-if="items.products.length > 0" style="margin: 10px">
        <div class="grid-container high_seller">
          <EmptyPage v-if="products.length < 1"></EmptyPage>
          <div v-else v-for="item in items.products" :key="item.id" class="item-product bg-gray products_group">

            <router-link :to="{ name:'ProductSelect' , params:{proid:item.id} }">
              <div v-if="item.discount >0" class="div-discount bg-color font-6 text-white">%{{ item.discount }}</div>
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
                    class="svg-add font-6 d-flex-center bg-color color-white add_min_btn">{{ item.order_count_select }}
              </span>
              <img :style="item.order_count_select > 0 ? 'visibility :visible' : 'visibility :hidden'"
                   @click="MinusProduct(item)" class="svg-add add_min_btn" src="../assets/img/minus_left.png" alt="">
            </div>

            <div style="height: 60%;direction: rtl;text-align: center">
              <div class="font-5 mt-2 product_info">{{ item.name }}</div>
              <div class="font-6 size-card product_info">{{ item.info }}</div>
            </div>

            <p v-if="item.discount >0" class="text-decoration-line-through font-5 m-0 text-muted mr-4"
               style="direction: rtl"> {{ String(item.price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
            </p>

            <p :id="items.subid" class="text-underlin font-color font-5 m-0 mx-1" style="width: 100%;direction: rtl">
              {{ String(item.this_price).replace(/(.)(?=(\d{3})+$)/g, '$1,') }} تومان
            </p>

          </div>
        </div>
      </div>
      <br>
      <br>
      <br>
      <br>

      <div id="sheet" class="bg-navbar" style="z-index: 11">
        <div class="top-navbar" @click="toggleSheet"></div>

        <p class=" text-menu font-6" style="cursor: none">انتخاب فیلتر نمایش</p>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="ChangeAction('all')">
          <p class="text-menu font-6" :class="{'font-color' : action == 'all' }">نمایش همه</p>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="ChangeAction('sold')">
          <p class="text-menu font-6" :class="{'font-color' : action == 'sold' }">پرفروش ترین</p>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="ChangeAction('liked')">
          <p class="text-menu font-6" :class="{'font-color' : action == 'liked' }">محبوب ترین</p>
        </div>

        <hr class="hr-menu">
        <div class="text-decoration-none" @click="ChangeAction('discount')">
          <p class="text-menu font-6" :class="{'font-color' : action == 'discount' }">دارای تخفیف</p>
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


</template>

<script>
import {onUpdated, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";
import ProgressBar from "@/components/common/ProgressBar";
import EmptyPage from "@/components/common/EmptyPage";
import UserValidate from "@/assets/js/UserValidation";
import validation from "@/assets/js/validation";
import router from "@/router";

export default {
  name: "CategorySelect",

  components: {ProgressBar, EmptyPage},

  setup() {

    var url_base = localStorage.getItem('urlBase')
    var user_id = localStorage.getItem('userId')
    var loading = ref(true)

    if (user_id == null) {
      user_id = -1
    }

    var store = useStore();
    var order_products = store.state.order.products
    var orders_count = ref(store.state.order.orders_count)
    var orders_price = ref(store.state.order.orders_price)

    var action = ref('all')
    var catid = ref(useRoute().params.catid)
    var subid = ref()
    var mainDiv = ref(null);

    var category = ref([])
    var alt_category = ref([])
    var products = ref([])
    var searchword = ref('')

    var height_points = ref([])


    function Category() {

      height_points.value = []
      products.value = []

      loading.value = true
      axios.get(url_base + 'category', {
        params: {
          category_id: catid.value,
          action: action.value,
          page: 0
        }
      }).then(function (response) {
        loading.value = false;
        var res = response.data
        console.log(res)

        category.value = res.category
        alt_category.value = res.alt_category
        subid.value = res.alt_category[0].id

        if (alt_category.value.length > 0) {
          alt_category.value.forEach((item) => {
            products.value.push({subid: item.id, subname: item.name, products: item.products})

            item.products.forEach((items) => {
              items.order_count_select = 0
              if (order_products.length > 0) {
                order_products.forEach((itemss) => {
                  if (itemss.id == items.id) {
                    items.order_count_select = itemss.order_count_select
                  }
                })
              }
            })
          })
        }
      })
    }

    Category();

    onUpdated(() => {
      var scrollableDiv = document.getElementById('maincat');
      var targetElement = document.getElementById('main' + catid.value);
      scrollableDiv.scrollLeft = targetElement.offsetLeft - 100;
    })

    function ChangeCategory(id) {

      products.value = []
      catid.value = id
      action.value = "all"
      Category();
    }

    function ChangeAction(sortAction) {
      action.value = sortAction
      Category()
    }

    function toggleSheet() {
      var sheet = document.getElementById("sheet");
      var whiteback1 = document.getElementById("whiteback1");
      if (sheet.style.height == "300px") {
        sheet.style.height = "0px";
        whiteback1.style.display = "none";
      } else {
        sheet.style.height = "300px";
        whiteback1.style.display = "block";
      }
    }


    function Search() {
      if (searchword.value == "") {
        validation('نام محصول مورد نظر را وارد کنید')
        return false
      }
      router.push({name: 'SearchPage', params: {search: searchword.value}})
    }


    function Scrolling(id) {
      subid.value = id
      if (document.getElementById('sub' + id) != null){
        document.getElementById(id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      }
    }

    document.addEventListener('scroll', scrollEvent, {passive: true}, true)

    function scrollEvent() {

      alt_category.value.forEach((item) => {

          var heighTop = document.getElementById('sub' + item.id).getBoundingClientRect().top
          var heighBott = document.getElementById('sub' + item.id).getBoundingClientRect().bottom
          if (heighTop < 250 || heighBott < 500) {
            subid.value = item.id

            var scrollableDiv = document.getElementById('altcat');
            var targetElement = document.getElementById('alt' + item.id);
            scrollableDiv.scrollLeft = targetElement.offsetLeft - 100;
          }

      })
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

    return {
      loading,
      user_id,
      catid,
      subid,
      category,
      alt_category,
      products,
      action,
      searchword,
      orders_count,
      orders_price,
      mainDiv,
      ChangeCategory,
      ChangeAction,
      PlusProduct,
      MinusProduct,
      toggleSheet,
      Search,
      UserValidate,
      Scrolling,
    }

  }


}
</script>

<style scoped>

html {
  scroll-behavior: smooth;
}

.p-body {
  height: auto;
  padding: 10px;
  scroll-behavior: smooth;
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
}


.number {
  position: absolute;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  padding: 4px;
  top: 2px;
  right: -2px;

}

.svg-filter {
  height: 15px;
  margin-top: 2px;
}


.div-search-nav {
  position: relative;
}

.svg-search {
  height: 17px;
  position: absolute;
  margin: 9px;
  left: 5px;
  margin-left: 13px;

}

.search-nav {
  width: 100%;
  border: none;
  border-radius: 5px;
  text-align: center;
  align-items: center;
  padding: 10.5px;
  margin: 0 7px;
  padding: 0 78px;
  background-color: #F3F3F3;
  outline: 1px solid #F3F3F3;
}

#cats {
  width: auto;
  position: sticky;
  top: 48px;
  z-index: 7;
  background-color: white;
}

#altcat {
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 12px;
  margin-bottom: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 2px solid #ffadc7;
}


.category-main {
  width: auto;
  height: 60px;
  align-items: center;
}

.category-element {
  /*border: 1px solid #f3f3f3;*/
  border-radius: 5px;
  height: 40px;
  align-items: center;
  padding: 15px 20px;
  margin: 0 3px;
  overflow: hidden;
}

.element-right {
  margin-right: 0;
}

.category-minor {
  margin: 10px 0;
  align-items: center;
}

.category-minor-element {
  height: 30px;
  margin: 0 7px;
  padding: 5px;
  /* border-bottom: 1px solid black; */
}

.title-card {
  text-align: center;
  margin: 0;
  margin-top: 7px;

}

.size-card {
  margin: 0;
  margin-bottom: 10px;
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


.navbar-button {
  width: 10%;
}

/* ==menu== */
.top-navbar {
  height: 5px;
  width: 50%;
  background-color: #f1f1f1;
  margin: 3px 97px;
  cursor: pointer;
}

.hr-menu {
  padding: 0;
  margin: 60px;
  margin-top: 0px;
  margin-bottom: 0;
  color: rgb(207 207 207);
}

.text-menu {
  padding: 18px 0;
  margin-bottom: 0;
  text-align: center;
  cursor: pointer;
  color: black;
  cursor: pointer;
}

.rotert_link {
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  margin: 0 3px;
  color: black;
  text-decoration: none;
}

.router-link-active {
  background-color: #ffd2e1;
  color: #D40061 !important;
  text-decoration: none;
  border-radius: 5px;
  /*position: relative;*/
  /*right: 0;*/
}

.swal2-popup {
  font-size: 0.6rem ! important;
}

.subname {
  width: 100%;
  margin: 10px;
  font-size: 11px;
  color: #D40061;
  background-color: #fdcbe2;
  padding: 5px 10px;
  border-radius: 5px;
}

.products_group:last-child {
  padding-bottom: 100px;
}

</style>
