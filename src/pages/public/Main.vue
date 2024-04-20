<script>
import Map from "@/components/Map.vue";
import CategoriesSurvey from "@/components/CategoriesSurvey.vue";
import MapChat from "@/components/chat/MapChat.vue";
import LeafletMap from "@/components/LeafletMap.vue";

export default {
  name: "Main",
  components: { LeafletMap, MapChat, CategoriesSurvey, Map },
  data() {
    return {
      surveyFinished: false,
    };
  },
};
</script>

<template>
  <div class="main">
    <CategoriesSurvey v-if="surveyFinished" @finish="bool => (surveyFinished = bool)" />
    <template v-else>
      <LeafletMap />
      <!--      <MapChat />-->
    </template>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 640px) {
  .main {
    flex-direction: row;
  }
}
</style>
