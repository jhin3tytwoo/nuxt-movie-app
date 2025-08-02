<template>
  <div
    class="flex items-center justify-center min-h-screen bg-black text-white"
  >
    <div
      class="p-8 w-full max-w-sm relative bg-black rounded-2xl"
      style="
        border-radius: 1rem;
        border: 2px solid transparent;
        background-image: linear-gradient(black, black),
          linear-gradient(to bottom right, #ff8c00, #ffd700);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        box-shadow: 0 0 25px rgba(255, 165, 0, 0.4),
          0 0 60px rgba(255, 215, 0, 0.2);
      "
    >
      <h2
        class="text-4xl font-extrabold text-center mb-8"
        style="color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5)"
      >
        <span class="text-white">TEST</span
        ><span class="text-yellow-400">HUB</span>
      </h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label
            for="username"
            class="block text-gray-400 text-base font-bold mb-2"
            >Username</label
          >
          <div class="relative">
            <span class="material-icons absolute left-3 top-2.5 text-gray-500"
              >person</span
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="shadow appearance-none border-none rounded-full w-full py-2.5 pl-10 pr-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 placeholder-gray-400"
              placeholder="Username"
            />
          </div>
        </div>

        <div class="mb-8">
          <label
            for="password"
            class="block text-gray-400 text-base font-bold mb-2"
            >Password</label
          >
          <div class="relative">
            <span class="material-icons absolute left-3 top-2.5 text-gray-500"
              >lock</span
            >
            <input
              :type="passwordFieldType"
              id="password"
              v-model="password"
              class="shadow appearance-none border-none rounded-full w-full py-2.5 pl-10 pr-10 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 placeholder-gray-400"
              placeholder="••••"
            />
            <span
              class="material-icons absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              @click="togglePasswordVisibility"
            >
              {{
                passwordFieldType === "password"
                  ? "visibility_off"
                  : "visibility"
              }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline w-full text-black text-xl"
            style="
              background-image: linear-gradient(to right, #ffa500, #ffd700);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            "
          >
            Login
          </button>
        </div>

        <p
          v-if="loginError"
          class="text-red-500 text-sm italic mt-6 text-center font-bold"
        >
          {{ loginError }}
        </p>
        <p class="text-gray-500 text-sm italic mt-6 text-center font-bold">
          Username: test@gmail.com
          <br />
          Password: test
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const username = ref("");
const password = ref("");
const loginError = ref("");
const passwordFieldType = ref("password");

const handleLogin = () => {
  loginError.value = "";
  if (username.value === "test@gmail.com" && password.value === "test") {
    // ไปหน้า '/'
    router.push("/");
  } else {
    loginError.value = "Invalid email or password.";
  }
};

const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};
</script>

<style scoped>
/* ใช้ Tailwind CSS เป็นหลัก ไม่มีสไตล์เพิ่มเติม */
</style>
