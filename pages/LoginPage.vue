<template>
  <div
    class="min-h-screen flex items-center justify-center bg-black text-white"
  >
    <div class="login_card">
      <div class="login_inner_card">
        <div class="flex justify-center pb-6">
          <h2
            class="text-4xl font-extrabold text-center"
            style="color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5)"
          >
            <span class="text-white">TEST</span
            ><span class="text-yellow-400">HUB</span>
          </h2>
        </div>

        <form @submit.prevent="handleLogin">
          <!-- username -->
          <div class="relative mb-2">
            <span
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="material-icons text-gray-500">person</span>
            </span>
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="input_username"
            />
          </div>

          <!-- password -->
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="material-icons text-gray-500">lock</span>
            </span>
            <input
              v-model="password"
              :type="passwordFieldType"
              placeholder="Password"
              class="input_password"
            />
            <button
              @click="togglePasswordVisibility"
              type="button"
              class="absolute right-3 top-2"
            >
              <span class="material-icons text-[#FFFFFF66] size-6">
                {{
                  passwordFieldType === "password"
                    ? "visibility_off"
                    : "visibility"
                }}
              </span>
            </button>
          </div>

          <!-- btn -->
          <div class="my-2">
            <button type="submit" class="login_btn">Login</button>
          </div>

          <!-- Error message -->
          <p
            v-if="loginError"
            class="text-red-500 text-sm italic mt-4 text-center font-bold"
          >
            {{ loginError }}
          </p>

          <!-- Demo credentials -->
          <p class="text-gray-500 text-sm italic mt-6 text-center font-bold">
            Username: test@gmail.com
            <br />
            Password: test
          </p>
        </form>
      </div>
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
.login_card {
  padding: 2rem;
  width: 100%;
  max-width: 384px;
  position: relative;
  background-color: black;
  border-radius: 1rem;
  border: 2px solid transparent;
  background-image: linear-gradient(black, black),
    linear-gradient(to bottom right, #ff8c00, #ffd700);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 25px rgba(255, 165, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2);
}

.login_inner_card {
  width: 100%;
}

.input_username,
.input_password {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  appearance: none;
  border: none;
  border-radius: 9999px;
  width: 100%;
  padding: 0.625rem 2.5rem;
  color: white;
  line-height: 1.25;
  background-color: rgb(55, 65, 81);
}

.input_username:focus,
.input_password:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.input_username::placeholder,
.input_password::placeholder {
  color: rgb(156, 163, 175);
}

.login_btn {
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  width: 100%;
  color: black;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  background-image: linear-gradient(to right, #ffa500, #ffd700);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.login_btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.login_btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
</style>
