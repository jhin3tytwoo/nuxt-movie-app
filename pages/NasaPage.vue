<template>
  <MainLayout>
    <div class="h-full overflow-y-auto rounded-[40px]">
      <div
        class="flex items-center gap-3 px-4 md:px-8 py-4"
        style="display: none"
      ></div>
      <transition name="fade">
        <div v-if="showFilters" class="px-4 md:px-8 py-4"></div>
      </transition>

      <div class="px-4 md:px-8 py-4">
        <div v-if="isLoading" class="text-white text-center">
          กำลังโหลดข้อมูล...
        </div>
        <div v-else-if="apodData" class="text-white">
          <h2 class="text-2xl font-bold mb-2">{{ apodData.title }}</h2>
          <p class="text-sm text-gray-400 mb-4">{{ apodData.date }}</p>
          <img
            :src="apodData.url"
            alt="NASA APOD"
            class="w-full h-auto object-cover rounded-xl mb-4"
          />
          <p class="text-gray-200">
            {{ apodData.explanation }}
          </p>
        </div>
        <div v-else class="text-red-500 mt-4 text-center">
          เกิดข้อผิดพลาดในการโหลดข้อมูล
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts" name="HomePage">
import { ref, onMounted } from "vue";
import MainLayout from "~/components/MainLayout.vue";

interface Apod {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

const apodData = ref<Apod | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const API_KEY = "H9CjDaxSTb58Hems9sJfEld4GO532z85rgDwFBhK";
const API_URL = "https://api.nasa.gov/planetary/apod";

async function fetchApod() {
  isLoading.value = true;
  error.value = null;

  try {
    const fullUrl = `${API_URL}?api_key=${API_KEY}`;
    const res = await fetch(fullUrl);

    if (!res.ok) {
      throw new Error(`HTTP error! status ${res.status}`);
    }

    const data = await res.json();
    apodData.value = data as Apod;

    console.log("ข้อมูลที่ได้รับจาก NASA APOD:", data);
  } catch (err) {
    error.value = err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchApod();
});

// โค้ดส่วนอื่นๆ ที่เกี่ยวข้องกับภาพยนตร์เดิมถูกลบออกไป
</script>

<style scoped>
/* สไตล์เดิม */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.drop-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
</style>
