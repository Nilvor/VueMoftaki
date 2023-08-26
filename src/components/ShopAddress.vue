<template>

  <ProgressBar v-if="loading"></ProgressBar>

  <div id="main">
    <div class="p-body">

      <div class="d-flex header_addres">
        <router-link :to="{name:'ShopInfo'}">
          <img class="svg_back" src="../assets/img/back.svg" alt="">
        </router-link>
        <div class="font-6 center_navbars"> ثبت آدرس</div>
      </div>

      <label class="font-6 labels" for="username">نام و نام خانوادگی</label>
      <textarea v-model="name" class="input-1" type="text" id="username"></textarea>

      <label class="font-6 labels" for="userphone">شماره تلفن همراه</label>
      <textarea v-model="phone" class="input-1" type="text" id="userphone"></textarea>

      <label class="font-6 labels" for="userpost">آدرس پستی</label>
      <textarea v-model="address" class="input-2" type="text" id="userpost"></textarea>

      <label class="font-6 labels" for="userinfo">توضیحات</label>
      <textarea v-model="info" class="input-2" type="text" id="userinfo"></textarea>

      <label class="font-6 labels" style="display: flex;align-items: center">
        <span style="margin-left: 20px"> موقعیت مکانی</span>
      </label>

      <div id="map">
        <l-map ref="my_map" style="width: 100%;height: 100%" :zoom="map.zoom" :center="map.center" @click="toggleMarker"
               :maxZoom="17">
          <l-tile-layer :url="map.url" :attribution="map.attribution" :icon="map.icon"></l-tile-layer>
          <l-marker :lat-lng="map.markerLatLng" icon="map.icon"></l-marker>
        </l-map>
      </div>

      <button class="bg-color btn-sub rounded-pill text-white font-6" style="width:40px;height:40px;margin-top: 20px"
              type="submit" @click="GetPosition">
        <svg style="z-index: 90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-geo" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
        </svg>
      </button>
      <span style="font-size: 10px;margin-right: 10px">موقیعت فعلی شما</span>

      <button class="bg-color btn-sub rounded-pill text-white font-6" style="position:relative;margin-bottom: 20px"
              type="submit" @click="send_address">ثبت آدرس
      </button>
    </div>
  </div>

</template>

<script>

import {ref} from "vue";
import axios from "axios";
import swal from "sweetalert2";
import {LMap, LTileLayer, LMarker} from 'vue3-leaflet';
import {icon} from "leaflet";
import ProgressBar from "@/components/common/ProgressBar";
import validation from "@/assets/js/validation";

export default {
  name: "ShopAddress",
  components: {ProgressBar, LMap, LTileLayer, LMarker},

  setup: function () {
    var user_id = localStorage.getItem('userId');
    var url_base = localStorage.getItem('urlBase');
    var webapp_url_base = localStorage.getItem('webappUrlBase');
    var loading = ref(false);

    var name = ref('')
    var phone = ref('')
    var address = ref('')
    var info = ref('')
    var my_map = ref(null)

    var map = ref({
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      flyTo: [],
      center: [32.66569, 51.65846],
      markerLatLng: [32.66569, 51.65846],
      icon: icon({
        iconUrl: "https://picsum.photos/200/300",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      })
    })

    function toggleMarker(e) {
      map.value.markerLatLng = [e.latlng.lat,e.latlng.lng]
    }

    function send_address() {

      if (name.value == '' || phone.value == '' || address.value == '') {
        validation('موارد زیر را کامل کنید')
      } else {
        loading.value = true;
        axios.post(url_base + 'address_add', {
          apikey: 'ldghn_fhrv127',
          user_id: user_id,
          name: name.value,
          phone: phone.value,
          address: address.value,
          info: info.value,
          lat: map.value.markerLatLng[0],
          lang: map.value.markerLatLng[1],
        }).then(function (response) {
          loading.value = false;
          var res = response.data

          if (res.status == 'ok') {
            swal.fire({
              text: 'آدرس جدید اضافه شد',
              width: 200,
              height: 50,
              icon: 'success',
              color: '#EC407A',
              showConfirmButton: true,
              confirmButtonColor: '#D40061',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = webapp_url_base + "shop_info";
              }
            })
          } else {
            swal.fire({
              text: 'درخواست با خطا مواجه شد!',
              width: 200,
              height: 50,
              icon: 'error',
              color: '#EC407A',
              confirmButtonColor: '#D40061',
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        })
      }
    }

    function GetPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          map.value.center = [pos.coords.latitude, pos.coords.longitude]
          map.value.markerLatLng = [pos.coords.latitude, pos.coords.longitude]
          map.value.zoom = 15
          my_map.value.flyTo([pos.coords.latitude, pos.coords.longitude])
        });
      } else {
        validation('خطا در پیدا کردن موقعیت فعلی شما پیش آمده')
      }
    }

    GetPosition();


    return {name, phone, address, info, loading, map, send_address, toggleMarker, GetPosition, my_map}
  }
}
</script>

<style>
.header-addres {
  height: 65px;
  width: 100%;
  box-shadow: 0 0 5px #c9c9c9;
  padding: 15px;
  padding-top: 35px;
  justify-content: center;
  position: relative;
}

.svg-back {
  height: 10px;
  right: 15px;
  position: absolute;
}

.p-body {
  padding: 0 15px;
}

.input-1 {
  height: 60px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgb(233 233 233);
  outline: 1px solid rgb(233 233 233);
  text-align: right !important;
  padding: 10px;
  font-size: 13px;

}

.input-1:focus {
  outline: 1px solid #EC407A;
  transition: 0.5s;
}

.input-2 {
  height: 130px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgb(233 233 233);
  outline: 1px solid rgb(233 233 233);
  text-align: right !important;
  padding: 12px;
  font-size: 13px;

}

.input-2:focus {
  border: 1px solid #EC407A;
  transition: 0.5s;
}

.labels {
  margin: 20px 15px 5px 0;
}

.btn-sub {
  width: 100%;
  border: none;
  line-height: 35px;
  margin-top: 20px;
  margin-bottom: 15px;
}

.iframe-rwd {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.iframe-rwd iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 20px;
  margin-top: 10px
}

</style>
