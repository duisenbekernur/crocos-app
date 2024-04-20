<script>
import Map from "@/components/Map.vue";
import CategoriesSurvey from "@/components/CategoriesSurvey.vue";
import MapChat from "@/components/chat/MapChat.vue";

export default {
  name: "Main",
  components: { MapChat, CategoriesSurvey, Map },
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
      <Map />
      <MapChat />
    </template>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 640px) {
  .main {
    flex-direction: row;
  }
}
</style>
