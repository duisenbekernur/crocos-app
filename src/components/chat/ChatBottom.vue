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
      loading: false,
      message: "",
    };
  },
  methods: {
    async postToAI(query) {
      this.loading = true;
      const { data } = await axios.post(
        "http://localhost:8080/user-query",
        {
          query,
        },
        {
          params: {
            distance: this.point ? this.point.totalDistance : null,
          },
          withCredentials: true,
        }
      );
      this.loading = false;

      this.sendMessage(data, false, false, true);
    },
    sendMessage(mes, rec = false, ai = false, isBot = false) {
      this.$emit("send-message", { message: mes, type: isBot ? "bot" : "user" });

      if (rec) {
        this.$emit("click-recommend", mes);
      }

      if (ai) {
        this.postToAI(mes);
      }

      console.log("here1", this.message);
      if (this.message.includes("код")) {
        console.log("here", this.message);
        setTimeout(() => {
          this.sendMessage(
            `<p>Ваш QR</p> <img src="https://www.qrstuff.com/images/default_qrcode.png"  width="200"/>`,
            false,
            false,
            true
          );
        }, 400);
      }

      this.message = "";
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

    <div v-if="loading" style="font-size: 35px">...</div>

    <div class="bottom-input">
      <input
        v-model="message"
        placeholder="Введите сообщение"
        @keyup.enter="sendMessage(message, false, true)"
      />
      <img
        @click="sendMessage(message, false, false)"
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
