<template>
    <a-modal :visible="visible" :title="title" @cancel="onClose" footer={null}>
        <div>
            <ul style="list-style: none; padding: 0">
                <li v-for="item in list" :key="item.id"
                    style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 5px 0">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </a-modal>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    visible: Boolean,
    title: String,
    list: Array,
})

const emit = defineEmits(['close'])

const onClose = () => {
    emit('close')
}
</script>

<style scoped>
/* 可选样式优化 */
</style>
