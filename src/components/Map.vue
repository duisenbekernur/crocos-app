<script>
import DG from "2gis-maps";
import { basicPoints } from "@/mock/points.js";

export default {
  name: "Map",
  data() {
    return {
      lng: null,
      ltd: null,
    };
  },
  async mounted() {
    await this.initLocation();
  },
  methods: {
    initMap() {
      console.log(this.lng);
      const coordsArr = this.ltd ? [this.ltd, this.lng] : [51.08935, 71.416];

      let map = DG.map("map", {
        center: coordsArr,
        zoom: 13,
      });

      DG.marker(coordsArr).addTo(map);

      basicPoints.forEach(point => {
        const marker = DG.marker(point.coords, { icon: point.icon }).addTo(map);
        marker.bindPopup(`<p>${point.title}<br /></p>`);
      });

      const latLngs = [
        [this.ltd, this.lng],
        [51.12828, 71.43052],
      ];
      DG.ruler(latLngs).addTo(map);
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
  },
};
</script>

<template>
  <div class="container">
    <div id="map"></div>
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
}

@media screen and (min-width: 640px) {
  .container {
    width: 200%;
  }
}
</style>
