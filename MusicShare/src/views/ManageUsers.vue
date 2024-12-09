<template>
  <div style="display: flex">
    <!-- 用户管理部分 -->
    <div style="flex: 1; margin-right: 20px">
      <h2>管理用户</h2>

      <!-- 搜索框 -->
      <div style="margin-bottom: 20px">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索用户..."
          style="padding: 10px; width: 300px; border-radius: 40px; border: 1px solid #ccc"
        />
      </div>

      <!-- 用户列表 -->
      <div style="margin-top: 20px; width: 700px">
        <table border="1" style="width: 100%; border-collapse: collapse">
          <thead>
            <tr>
              <th>手机号</th>
              <th>昵称</th>
              <th>年龄</th>
              <th>性别</th>
              <th>个性签名</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.phone }}</td>
              <td>{{ user.nickname }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.signature }}</td>
              <td>
                <button @click="deleteUser(user.id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 历史删除用户部分 -->
    <div>
      <h2>历史删除</h2>
      <div
        style="
          flex: 1;
          width: 500px;
          background-color: rgb(249, 205, 173);
          border-radius: 40px;
          min-height: 500px;
        "
      >
        <div style="border: 1px solid #ccc; padding: 10px">
          <ul>
            <li v-for="deletedUser in deletedUsers" :key="deletedUser.id">
              {{ deletedUser.nickname }} ({{ deletedUser.phone }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 示例用户数据
const users = ref([
  { id: 1, phone: '13800000001', nickname: '用户1', age: 25, gender: '男', signature: '热爱编程' },
  {
    id: 2,
    phone: '13800000002',
    nickname: '用户2',
    age: 30,
    gender: '女',
    signature: '生活不止眼前的苟且',
  },
  {
    id: 3,
    phone: '13800000003',
    nickname: '用户3',
    age: 28,
    gender: '男',
    signature: '梦想与代码',
  },
  { id: 4, phone: '13800000004', nickname: '用户4', age: 22, gender: '女', signature: '随风而行' },
])

// 历史删除的用户
const deletedUsers = ref([])

// 搜索查询字符串
const searchQuery = ref('')

// 计算属性：返回过滤后的用户列表
const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value
  }

  const query = searchQuery.value.toLowerCase()
  return users.value.filter(
    (user) =>
      user.phone.includes(query) ||
      user.nickname.toLowerCase().includes(query) ||
      user.signature.toLowerCase().includes(query),
  )
})

// 删除用户函数
const deleteUser = (userId) => {
  const userToDelete = users.value.find((user) => user.id === userId)
  if (userToDelete) {
    // 将删除的用户添加到历史删除列表
    deletedUsers.value.push(userToDelete)
    // 从用户列表中删除该用户
    users.value = users.value.filter((user) => user.id !== userId)
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}

button {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 40px;
}

button:hover {
  background-color: rgb(254, 67, 101);
  color: white;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>
