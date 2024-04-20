<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  name: "ChatMiddle",
};
</script>

<template>
  <div class="chat-middle">
    <div v-for="message in messages" :key="message.id">
      <div
        :class="{
          message: true,
          bot: message.type === 'bot',
          user: message.type === 'user',
        }"
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-middle {
  height: 400px;
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
</style>
