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
      const coordsArr = this.ltd ? [this.ltd, this.lng] : [51.12579, 71.4465];

      let map = DG.map("map", {
        center: coordsArr,
        zoom: 13,
      });
      // controls
      DG.control.location({ position: "bottomright" }).addTo(map);
      DG.control.scale().addTo(map);
      DG.control.ruler({ position: "bottomleft" }).addTo(map);
      DG.control.traffic().addTo(map);

      // my position
      DG.marker(coordsArr).addTo(map);

      // other points
      basicPoints.forEach(point => {
        const marker = DG.marker(point.coords, { icon: point.icon }).addTo(map);
        marker.bindPopup(`<div>
            <p>${point.title}<br /></p>
            <img src="${point.imgs[0]}" width="200" height="150"/>
          </div>`);

        marker.on("popupopen", () => {
          console.log(`Popup opened for marker at ${point.title}`);
        });
      });

      const latLngs = [
        [this.ltd, this.lng],
        [51.12828, 71.43052],
      ];
      DG.ruler(latLngs).addTo(map);

      const startCoords = [this.ltd, this.lng]; // Start coordinates (current location)
      const endCoords = [51.12579, 71.4465]; // End coordinates (destination)

      const routing = DG._distance({
        points: [startCoords, endCoords],
      });

      routing.addTo(map);
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
