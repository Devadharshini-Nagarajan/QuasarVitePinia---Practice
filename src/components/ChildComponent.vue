<script setup>
defineOptions({
    name: "ChildComponent"
})

const model = defineModel('modelCheck')
const emit = defineEmits(['onFormShowChnage', 'onChildClick'])

function buttonClick() {
    emit('onChildClick', { name: model.value, love: 200, id: 2 })
}

</script>
<template>
    <div>
        <q-btn color="blue" class="q-mt-sm q-mx-md">
            Child
            <q-badge color="red" rounded floating />
        </q-btn>
        <q-input v-model="model" />
        <q-btn push color="primary" label="Add to List" @click="buttonClick" />
    </div>
</template>