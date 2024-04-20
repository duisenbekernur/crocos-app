<script>
export default {
  name: "CategoriesSurvey",
  data() {
    return {};
  },
  created() {
    const hasSurvey = localStorage.getItem("survey");

    if (hasSurvey) {
      this.$emit("finish", true);
    }
  },
};
</script>

<template>
  <div>survey</div>
</template>

<style scoped></style>
