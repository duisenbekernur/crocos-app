<script setup lang="ts">
import { useCounterStore } from "@/store/CounterStore.ts";

const counterStore = useCounterStore();
</script>

<template>
    <h1>
        Vue + vite + pinia pro starter pack by
        <a href="https://github.com/duisenbekernur" target="_blank" style="cursor: pointer"
            >duisenbekyernur</a
        >
    </h1>

    <p>It's example of Private router</p>

    <div class="card">
        <button type="button" @click="counterStore.increment()">
            count is {{ counterStore.count }}
        </button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
        official Vue + Vite starter
    </p>
    <p>
        Install
        <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
        in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
