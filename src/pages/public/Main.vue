<script>
import Map from "@/components/Map.vue";
import CategoriesSurvey from "@/components/CategoriesSurvey.vue";
import MapChat from "@/components/chat/MapChat.vue";
import LeafletMap from "@/components/LeafletMap.vue";
import ChatMiddle from "@/components/chat/ChatMiddle.vue";

export default {
  name: "Main",
  components: { ChatMiddle, LeafletMap, MapChat, CategoriesSurvey, Map },
  data() {
    return {
      surveyFinished: false,
      point: null,
    };
  },
  methods: {
    sendMessage(payload) {
      this.$refs.chat.open = true;
      this.$refs["chat"].sendMessage(payload);
    },
    onRecommend(payload) {
      this.$refs.chat.onRecommend(payload);
    },
  },
};
</script>

<template>
  <div class="main">
    <CategoriesSurvey v-if="!surveyFinished" @finish="surveyFinished = true" />
    <template v-else>
      <LeafletMap @send-message="sendMessage" @recommend="onRecommend" @point="p => (point = p)" />
      <MapChat ref="chat" :point="point" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

@media screen and (min-width: 640px) {
  .main {
    flex-direction: row;
  }
}
</style>
