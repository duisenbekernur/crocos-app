<script>
import L from "leaflet";
import { basicPoints } from "@/mock/points.js";
import { markerIcon } from "@/mock/mapIcons.js";

import "leaflet-routing-machine";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      routingControl: null,
      route: null,

      featureGroups: [],
      selectedMarker: null,

      lng: null,
      ltd: null,
    };
  },
  mounted() {
    this.initLocation();
  },
  computed: {
    currentPoint() {
      return this.selectedMarker ? basicPoints.find(p => p.id === this.selectedMarker.id) : null;
    },
    currentPointDistance() {
      console.log(this.routingControl, Object.keys(this.routingControl));
      return this.routingControl && this.routingControl._routes
        ? this.routingControl._routes[0].summary
        : null;
    },
  },
  methods: {
    initMap() {
      // config map
      let config = {
        minZoom: 7,
        maxZoom: 18,
      };
      // magnification with which the map will start
      const zoom = 13;
      // co-ordinates
      const lat = this.ltd;
      const lng = this.lng;

      // calling map
      const map = L.map("map", config).setView([lat, lng], zoom);
      this.map = map;
      new L.Marker([lat, lng], { icon: markerIcon }).bindPopup("Вы здесь :)").addTo(map);

      const latlngs = [];
      basicPoints.forEach(point => {
        const marker = new L.Marker(point.coords, { icon: point.icon })
          .bindPopup(
            `<div>
            <p>${point.title}<br /></p>
          </div>`
          )
          .addTo(map);
        marker.id = point.id;

        this.featureGroups.push(marker);

        marker.on("click", () => {
          console.log(`Popup opened for marker at ${point.title}`);

          this.showSidebarWithText(point.id);
          this.makeRouting(point);
        });
      });
      L.polyline(latlngs, {
        color: "#ff3939",
        weight: 2,
      }).addTo(this.map);

      const groupBounds = L.featureGroup(this.featureGroups);
      this.map.fitBounds(groupBounds.getBounds(), {
        padding: [50, 50],
      });
      // groupBounds.on("click", e => {
      //   if (e.layer instanceof L.Marker) {
      //     console.log(e);
      //     this.showSidebarWithText(e.sourceTarget._leaflet_id);
      //
      //     // console.log(`Popup opened for marker at ${e.title}`);
      //     this.makeRouting(marker);
      //   }
      // });

      // Used to load and display tile layers on the map
      // Most tile servers require attribution, which you can set under `Layer`
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // add legend
      // ------------------------------
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = function () {
        let div = L.DomUtil.create("div", "description");
        L.DomEvent.disableClickPropagation(div);
        return div;
      };

      legend.addTo(map);
    },

    showSidebarWithText(id) {
      const marker = this.findMarkerById(id);
      if (marker) {
        this.selectedMarker = marker;
        document.body.classList.add("active-sidebar");
      }
    },
    findMarkerById(id) {
      return this.featureGroups.find(marker => marker.id === id);
    },

    makeRouting(point) {
      if (this.routingControl) {
        this.routingControl.remove();
        this.routingControl = null;
      }
      this.routingControl = L.Routing.control({
        waypoints: [L.latLng(this.ltd, this.lng), L.latLng(point.coords[0], point.coords[1])],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: point.color, opacity: 0.7, weight: 8 }],
        },
      }).addTo(this.map);

      this.routingControl.on("routesfound", event => {
        const route = event.routes[0];
        if (route) {
          this.route = {
            distance: route.summary.totalDistance,
            duration: route.summary.totalTime,
          };
        }
      });
    },

    async initLocation() {
      if ("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.lng = longitude;
            this.ltd = latitude;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            this.initMap();
          },
          error => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
    closeSidebar() {
      document.body.classList.remove("active-sidebar");
      this.selectedMarker = null;
      this.map.fitBounds(L.featureGroup(this.featureGroups).getBounds(), {
        paddingTopLeft: [0, 10],
      });

      this.routingControl.remove();
      this.routingControl = null;
    },
  },
};
</script>

<template>
  <div class="container">
    <div id="map"></div>
    <div class="sidebar" v-if="selectedMarker && currentPoint">
      <div style="position: relative">
        <div class="close-button">
          <img src="/close.png" @click="closeSidebar" />
        </div>
      </div>

      <p style="font-weight: 600; font-size: 30px; margin: 0">
        <span>CITY</span><span style="color: #535bf2">PASS</span>
      </p>
      <p style="font-weight: 500">ГОРОДСКОЙ ПУТЕВОДИТЕЛЬ</p>
      <p style="font-weight: 500; color: #535bf2; margin-bottom: 10px">ПО ГОРОДУ АСТАНА</p>
      <!--      <button class="close-button" @click="closeSidebar">Close Sidebar</button>-->
      <div>
        <img class="img-zoom" :src="currentPoint.imgs[0]" />
        <div class="info-content">
          <p style="font-size: 20px">{{ currentPoint.title }}</p>
          <p style="font-size: 18px; color: #9ca3af; margin-bottom: 10px">
            {{ currentPoint.subtitle }}
          </p>

          <div>
            <template v-if="route">
              <p style="font-size: 15px; color: #9ca3af">Дистанция</p>
              <p style="font-size: 14px; margin-bottom: 10px">
                {{ `В ${(Math.floor(+route.distance) / 1000).toFixed(1)} км от вас` }}
              </p>
            </template>

            <template v-if="route">
              <p style="font-size: 15px; color: #9ca3af">Время поездки</p>
              <p style="font-size: 14px; margin-bottom: 10px">
                {{ `${Math.ceil(route.duration / 60) * 2} минут` }}
              </p>
            </template>

            <p style="font-size: 15px; color: #9ca3af">Время работы</p>
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                margin-bottom: 10px;
              "
            >
              <p>Вт - Вс</p>
              <p>
                с {{ currentPoint.workTimes.startTime }} по {{ currentPoint.workTimes.stopTime }}
              </p>
            </div>

            <p style="font-size: 15px; color: #9ca3af">Кратко о достопримечательности</p>
            <p style="font-size: 14px">{{ currentPoint.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  text-align: left;

  p {
    margin: 0;
  }

  img {
    border-radius: 15px;
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }
}
.info-content {
  padding: 8px;
}

.active-sidebar .sidebar {
  transform: translateX(0);
}

.close-button {
  position: absolute;
  margin-bottom: 20px;
  top: 5px;
  right: 0px;
  z-index: 10000;
  //background-color: #535bf2;

  img {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
}
</style>