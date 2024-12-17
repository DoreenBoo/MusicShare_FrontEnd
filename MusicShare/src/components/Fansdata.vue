<template>
    <a-modal :visible="visible" :title="title" @cancel="onClose" footer={null}>
        <div v-if="list && list.length > 0">
            <ul style="list-style: none; padding: 0">
                <li v-for="item in list" :key="item.id"
                    style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding: 5px 0">
                    <!-- 显示数据 -->
                    <span>{{ item.nickname || item.name }}</span>
                </li>
            </ul>
        </div>
        <!-- 当列表为空时显示提示信息 -->
        <div v-else style="text-align: center; color: gray;">
            暂无数据
        </div>
    </a-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import axios from 'axios'

// 定义组件属性和事件
const props = defineProps({
    visible: Boolean, // 控制弹窗显示
    title: String,    // 弹窗标题
    url: String,      // 获取数据的接口地址
})

const emit = defineEmits(['close']) // 自定义关闭事件
const list = ref([]) // 存储接口返回的数据列表

// 关闭弹窗
const onClose = () => {
    emit('close') // 触发父组件的关闭事件
}

// 获取数据列表
const fetchList = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(props.url, {}, {
            headers: {
                Authorization: `${token}`,
            },
        })
        if (response.data.code === 0) {
            list.value = response.data.data || []
        } else {
            console.error('获取列表失败:', response.data.message)
        }
    } catch (error) {
        console.error('获取列表请求错误:', error)
    }
}

// 监听 visible，当弹窗打开时自动获取数据
watch(() => props.visible, (newVal) => {
    if (newVal) {
        fetchList()
    }
})
</script>

<style scoped>
/* 可选样式优化 */
</style>
