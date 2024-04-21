<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  name: "ChatMiddle",
  methods: {
    toBottom() {
      const div = document.querySelector("#chat-middle");
      if (div) div.scrollTo({ top: div.scrollHeight, behavior: "smooth" });
    },
  },
};
</script>

<template>
  <div id="chat-middle" class="chat-middle">
    <div
      v-for="message in messages"
      :key="message.id"
      style="display: flex; align-items: end; gap: 4px"
    >
      <!--      <div v-if="message.type === 'bot'" class="bot-avatar">-->
      <!--        <img src="/chat.svg" style="width: 25px" />-->
      <!--      </div>-->
      <div
        :class="{
          message: true,
          bot: message.type === 'bot',
          user: message.type === 'user',
        }"
      >
        <div v-html="message.text"></div>
      </div>
      <!--      <div v-if="message.type === 'user'" class="user-avatar">-->
      <!--        <img src="/user.png" style="color: #fff; width: 25px" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-middle {
  height: 500px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  overflow-y: auto;
}

.message {
  padding: 5px 10px;
  background-color: #d2d2d2;
  max-width: 80%;
  width: max-content;
  border-radius: 7px;
}

.bot {
  background-color: #c9dffd;
  text-align: left;
}

.user {
  background-color: #ebebeb;
  margin-left: auto;
  text-align: left;
}

.bot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #535bf2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #535bf2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
