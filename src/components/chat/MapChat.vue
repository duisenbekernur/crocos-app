<script>
import ChatTop from "@/components/chat/ChatTop.vue";
import ChatMiddle from "@/components/chat/ChatMiddle.vue";
import ChatBottom from "@/components/chat/ChatBottom.vue";

export default {
  name: "MapChat",
  components: { ChatBottom, ChatMiddle, ChatTop },
};
</script>

<template>
  <div class="container">
    <ChatTop />
    <ChatMiddle />
    <ChatBottom />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
