<script>
import axios from "axios";

export default {
  name: "ChatBottom",
  props: {
    recommendedMessages: Array,
    point: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async postToAI(query) {
      await axios.post(
        "http://172.18.0.1:8080/user-query",
        {
          query,
        },
        {
          params: {
            distance: this.point ? this.point.totalDistance : null,
          },
        }
      );
    },
    sendMessage(mes, rec = false, ai = false) {
      this.$emit("send-message", { message: mes });
      this.message = "";

      if (rec) {
        this.$emit("click-recommend", mes);
      }

      if (ai) {
        this.postToAI(mes);
      }
    },
  },
};
</script>

<template>
  <div class="bottom">
    <div v-if="recommendedMessages.length" style="display: flex; gap: 8px; margin-bottom: 8px">
      <div
        v-for="mes in recommendedMessages"
        :key="mes"
        style="
          background-color: #4faff8;
          padding: 4px 8px;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
        "
        @click="sendMessage(mes, true)"
      >
        {{ mes }}
      </div>
    </div>

    <div class="bottom-input">
      <input
        v-model="message"
        placeholder="Введите сообщение"
        @keyup.enter="sendMessage(message, false, true)"
      />
      <img
        @click="sendMessage"
        src="/send.svg"
        style="
          margin: 0;
          width: 20px;
          height: 20px;
          padding: 10px;
          cursor: pointer;
          background-color: #4faff8;
          border-radius: 50%;
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-input {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.bottom {
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: center;
  input {
    min-width: 200px;
    width: 78%; /* Ensures the input takes up available width */
    padding: 10px 0 5px 10px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: 0.5s;

    overflow-wrap: break-word;
    word-wrap: break-word;

    &:focus + label,
    &:not(:placeholder-shown) + label {
      transform: translateY(-30%);
      font-size: 0.6rem;
    }
  }
}
</style>
