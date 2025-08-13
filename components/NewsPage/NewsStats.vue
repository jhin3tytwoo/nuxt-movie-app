<template>
  <section
    class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-400"
  >
    <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span>Found {{ totalResults }} items</span>
      <span v-if="searchQuery" class="text-blue-400"
        >Search results: "{{ searchQuery }}"</span
      >
    </div>
    <div class="flex items-center gap-2">
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  searchQuery: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
}>();
</script>
