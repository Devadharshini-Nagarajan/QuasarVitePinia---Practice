<script setup>
import { ref, computed } from "vue"
import { useMouse } from "./useMouse.js"
import { useFetch } from "./useFetch.js"

// const devList = ref([1, 2, 3])
// const devObject = ref({
//     name: "deva",
//     lname: "kd"
// })
const { x, y } = useMouse()
const id = ref(1)
const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
const url = computed(() => {
    return baseUrl + id.value
})
const { data, error } = useFetch(url)

// function updateContent() {
//     delete devObject.value['lname']
//     devList.value.push(11)
// }


</script>
<template>
    About
    <!-- <div v-for="item in devList" :key="item">
        {{ item }}
    </div>
    <div v-for="(value, key) in devObject" :key="key">
        {{ value }} - {{ key }}
    </div>
    <q-btn push color="primary" label="Add to List" @click="updateContent" /> -->

    <div>Mouse position is at: {{ x }}, {{ y }}</div>
    <div v-if="data">{{ data.title }}</div>
    <div v-if="error">{{ error }}</div>
    <q-btn push color="primary" label="Update Count" @click="id++" />

</template>