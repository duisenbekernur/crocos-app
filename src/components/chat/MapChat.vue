<script>
import ChatTop from "@/components/chat/ChatTop.vue";
import ChatMiddle from "@/components/chat/ChatMiddle.vue";
import ChatBottom from "@/components/chat/ChatBottom.vue";

export default {
  name: "MapChat",
  components: { ChatBottom, ChatMiddle, ChatTop },
  props: {
    point: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      open: false,
      messages: [
        {
          id: 1,
          type: "bot",
          text: "Алоха! Ой, я хотел представиться - меня зовут Алоха и я буду твоим городским путеводителем, как тебя зовут? ;)",
        },
      ],
      recommendedMessages: [],
    };
  },
  created() {
    const localMessages = JSON.parse(localStorage.getItem("messages"));

    if (localMessages) {
      this.messages = localMessages;
    }
  },
  methods: {
    toggleChat() {
      this.open = !this.open;
    },
    sendMessage(payload) {
      if (!payload.message) return;

      this.messages.push({
        id: this.messages.length,
        type: payload.type ?? "user",
        text: payload.message,
      });

      localStorage.setItem("messages", JSON.stringify(this.messages));

      setTimeout(() => {
        this.$refs["chat-middle"].toBottom();
      }, 200);
    },
    onRecommend(payload) {
      this.recommendedMessages = payload;
    },
    handleClickRecommend(text) {
      if (text === "Да") {
        this.sendMessage({
          message: `
          <p>Astana PASS 24 часа: 9990 тг </p>
          <img src="/ticket1.png" style="width: 250px; height: 150px;" />
          <br />
          <p>Astana PASS 24 часа (детская): 7990 тг</p>
          <img src="/ticket2.png" style="width: 250px; height: 150px;" />

          <a href="https://astana.citypass.kz/ru/kupit-citypass/" target="_blank" style="text-decoration: underline; margin-left: 8px">Купить</a>
          `,
          type: "bot",
        });
      }

      this.recommendedMessages = [];
    },
  },
};
</script>

<template>
  <div class="container">
    <Transition>
      <div v-if="open" style="width: 400px; margin-bottom: 20px">
        <ChatTop @close="open = false" />
        <ChatMiddle ref="chat-middle" :messages="messages" />
        <ChatBottom
          @send-message="sendMessage"
          :point="point"
          :recommended-messages="recommendedMessages"
          @click-recommend="handleClickRecommend"
        />
      </div>
    </Transition>

    <div class="widget">
      <img src="/chat.svg" alt="robot" @click="toggleChat" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.container {
  position: absolute;
  right: 40px;
  bottom: 40px;
}

.widget {
  display: flex;
  justify-content: end;
  img {
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 15px;
    background-color: #4faff8;
    border-radius: 50%;
  }
}
</style>
