<script>
export default {
  name: "CategoriesSurvey",
  data() {
    return {
      title: "Анкета",
      questions: [
        {
          text: "Какие погодные условия вам больше всего нравиться?",
          options: ["Солнечное", "Облачное", "Дождь", "Снег"],
        },
        {
          text: "Где вам больше всего нравится провести время?",
          options: ["Природа", "Парки", "Культурные мероприятия", "Музей", "Технологические места"],
        },
        {
          text: "Чем ты интересуешься?",
          options: ["Технологии", "Бег", "Искусство", "Природа", "Высокая культура"],
        },
        {
          text: "Что ты больше предпочитаешь активный отдых или культурные мероприятия?",
          options: ["Активный отдых", "Культурные мероприятия"],
        },
        {
          text: "А какие в каких местах ты предпочитаешь проводить время?",
          options: ["Культурные", "Исторические", "Развлекательные"],
        },
      ],
      currentIndex: 0,
      currentQuestion: null,
      currentResponse: null,
      responses: [],
    };
  },
  created() {
    const hasSurvey = localStorage.getItem("survey");

    if (hasSurvey) {
      this.$emit("finish", true);
    }

    this.loadQuestion();
  },
  methods: {
    loadQuestion() {
      if (this.currentIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentIndex];
        this.currentResponse = null;
      } else {
        this.currentQuestion = null;
      }
    },
    nextQuestion() {
      if (this.currentResponse !== null) {
        this.responses.push(this.currentResponse);
        this.currentIndex++;
        this.loadQuestion();
      } else {
        alert("Please select an option before proceeding.");
      }
    },
    submitSurvey() {
      if (this.currentResponse !== null) {
        this.responses.push(this.currentResponse);
      }

      localStorage.setItem("survey", JSON.stringify(this.responses));
      this.currentQuestion = null;

      setTimeout(() => {
        this.$emit("finish");
      }, 3000);
      console.log("Survey responses:", this.responses);
    },
  },
};
</script>

<template>
  <div class="survey-container">
    <h2>{{ title }}</h2>
    <div v-if="currentQuestion !== null" class="question">
      <p>{{ currentQuestion.text }}</p>
      <div class="options">
        <label v-for="(option, index) in currentQuestion.options" :key="index" class="option-label">
          <input type="radio" :value="option" v-model="currentResponse" class="option-input" />
          <span class="option-text">{{ option }}</span>
        </label>
      </div>
      <button @click="nextQuestion" v-if="currentIndex < questions.length - 1">Next</button>
      <button @click="submitSurvey" v-else>Submit</button>
    </div>
    <div v-else>
      <p>Спасибо, приятного отдыха!</p>
    </div>
  </div>
</template>

<style scoped>
.survey-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.question {
  width: 600px;
  margin: 0 auto;
}

.options {
  display: flex;
  flex-direction: column;
}

.option-label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.option-input {
  margin-right: 10px;
}

.option-text {
  font-size: 16px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
