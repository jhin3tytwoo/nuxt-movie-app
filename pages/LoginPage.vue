<script setup name="LoginPage">
import { ref } from "vue";

const email = ref("");
const password = ref("");

function login() {
  alert(`Login ด้วย ${email.value}`);
}
</script>

<template>
  <div class="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>
    <form @submit.prevent="login">
      <label class="block mb-2">อีเมล</label>
      <input
        v-model="email"
        type="email"
        required
        class="w-full mb-4 p-2 border rounded"
      />

      <label class="block mb-2">รหัสผ่าน</label>
      <input
        v-model="password"
        type="password"
        required
        class="w-full mb-6 p-2 border rounded"
      />

      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        เข้าสู่ระบบ
      </button>
    </form>
  </div>
</template>
