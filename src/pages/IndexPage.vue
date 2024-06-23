<script setup>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import ChildComponent from "../components/ChildComponent.vue"
import { watchEffect } from 'vue';

defineOptions({
  name: 'IndexPage'
});


const $q = useQuasar();
const myForm = ref({
  name: '',
  lastName: '',
  age: null,
  accept: false
})
const showForm = ref(true)
const modelCheck = ref("Input default")
const parentItems = ref([{
  name: "kd", love: 100, id: 1
}])
const fullname = ref('')

const onSubmit = () => {
  if (myForm.value.accept !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    onFormShowChnage()
  }
};

const onReset = () => {
  myForm.value = {
    name: '',
    age: null,
    lastName: '',
    accept: false
  }
};

const onFormShowChnage = () => {
  showForm.value = !showForm.value
}

const onChildClick = (val) => {
  parentItems.value = [...parentItems.value, val]
}

watchEffect(() => {
  fullname.value = myForm.value.lastName + " " + myForm.value.name
});

</script>
<template>
  <q-page class="flex  column">
    <q-btn color="blue" class="q-mt-sm q-mx-md">
      Parent
      <q-badge color="red" rounded floating />
    </q-btn>
    <h5 class="q-mb-sm">List items </h5>
    <ul>
      <li v-for="item in parentItems" :key="item.id">
        {{ item.name }}</li>
    </ul>
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px"> -->
    <h5 class="q-mb-sm">Model Check Parent: {{ modelCheck }}</h5>

    <div v-if="showForm" class="q-pa-md" style="max-width: 400px">

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        Fullname watcher: {{ fullname }}
        <q-input filled v-model="myForm.name" label="Your name *" hint="Name " lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled v-model="myForm.lastName" label="Your Last  name *" hint=" surname" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled type="number" v-model="myForm.age" label="Your age *" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your age',
        val => val > 0 && val < 100 || 'Please type a real age'
      ]" />

        <q-toggle v-model="myForm.accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>

    <div v-else>
      <ChildComponent @onFormShowChnage="onFormShowChnage" @onChildClick="onChildClick" v-model:modelCheck="modelCheck">
      </ChildComponent>

    </div>



  </q-page>
</template>
