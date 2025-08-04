<template>
  <div class="relative w-full h-full">
    <!-- ฝั่งซ้าย (Desktop) -->
    <div
      v-if="isDesktop"
      class="hidden md:block absolute top-0 left-0 bottom-0 w-[4px] rounded-l-[12px] bg-gradient-to-b from-[#FFB700] to-[#9D6400]"
      style="
        box-shadow: -4px 0 12px #ffcb00dd, -8px 0 24px #ffcb00bb,
          -12px 0 36px #ffb700aa, -16px 0 48px #ffb70088;
        z-index: 10;
      "
    ></div>

    <!-- ขอบบน (Mobile) -->
    <div
      v-if="!isDesktop"
      class="md:hidden absolute top-0 left-0 right-0 h-[4px] rounded-t-[12px] bg-gradient-to-r from-[#FFB700] to-[#9D6400]"
      style="
        box-shadow: 0 -4px 12px #ffcb00dd, 0 -8px 24px #ffcb00bb,
          0 -12px 36px #ffb700aa, 0 -16px 48px #ffb70088;
        z-index: 10;
      "
    ></div>

    <!-- ขอบล่าง (Mobile) -->
    <div
      v-if="!isDesktop"
      class="md:hidden absolute bottom-0 left-0 right-0 h-[4px] rounded-b-[12px] bg-gradient-to-r from-[#FFB700] to-[#9D6400]"
      style="
        box-shadow: 0 4px 12px #ffcb00dd, 0 8px 24px #ffcb00bb,
          0 12px 36px #ffb700aa, 0 16px 48px #ffb70088;
        z-index: 10;
      "
    ></div>

    <!-- Slot สำหรับเนื้อหาด้านใน -->
    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isDesktop = ref(false);
const checkScreen = () => {
  isDesktop.value = window.innerWidth >= 768;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>
