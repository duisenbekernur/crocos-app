<script>
export default {
  name: "ChatTop",
};
</script>

<template>
  <div class="top">
    <div style="display: flex; align-items: center; gap: 10px">
      <img src="/chat.svg" style="width: 30px" />
      <p style="margin: 0; font-size: 25px">Aloha Guide</p>
    </div>

    <img src="/close.svg" style="cursor: pointer" @click="$emit('close')" />
  </div>
</template>

<style scoped lang="scss">
.top {
  padding: 10px 20px;
  border-radius: 10px 10px 0 0;
  background-color: #4faff8;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
