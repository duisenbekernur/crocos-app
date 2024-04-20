<script>
export default {
  name: "ChatBottom",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      this.$emit("send-message", { message: this.message });
      this.message = "";
    },
  },
};
</script>

<template>
  <div class="bottom">
    <input v-model="message" placeholder="Введите сообщение" @keyup.enter="sendMessage" />
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
</template>

<style scoped lang="scss">
.bottom {
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  display: flex;
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
