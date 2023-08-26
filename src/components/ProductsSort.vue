<template>

  <div v-if="loading" class="spinner-grow text-danger loading" role="status"></div>

  <div id="main">
    <div class="p-body">
      <div class="d-flex header_addres"><a href="/homepage" class=""><img class="svg_back" src="/img/back.ce11dc07.svg"
                                                                          alt=""></a>
        <div class="font-6 center_navbars">جدیدترین محصولات</div>
      </div>
      <div class="row my-row m-0">

        <div class="col-4 p-0">
          <div class="item-product bg-gray">
            <div>
              <div class="div-discount bg-color font-7 text-white">10%</div>
              <img class="img-product" src="https://moftakiapp.ir/moftaki/storage/files/1663149087zd6xslu027w31.jpg" alt="">
            </div>
            <div><p class="font-6 title-card mt-2">عالیس</p>
              <p class="font-7 size-card" style="text-align: center;">انگوری بدون الکل :/</p></div>
            <div class="d-flex align-items-center">
              <div><p class="text-decoration-line-through font-7 m-0 text-muted mr-4">10000</p>
                <p class="text-underlin font-color font-7 m-0 mx-1">9000 تومان</p></div>
              <a href="/product_select/208" class="add-card float-start"><img class="svg-add"
                                                                              src="/img/add(2).bf082589.svg" alt=""></a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";

export default {
  name: "ProductsSort",

  setup() {

    let loading = ref(true)
    let action = useRoute().params.action
    let catid = useRoute().params.catid

    axios.get('https://moftakiapp.ir/moftaki/api/sort_products', {params:{category_id: catid, action: action,page:1}})
    .then(function (response) {
        loading.value = false;
        var res = response.data
        console.log(res)

    })

    return {}
  }
}
</script>

<style scoped>

</style>