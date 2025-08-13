<template>
  <nav
    class="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
  >
    <div class="flex items-center gap-2 text-sm text-gray-400 sm:flex hidden">
      <span>
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
        {{ Math.min(currentPage * itemsPerPage, totalResults) }} of
        {{ totalResults }} results
      </span>
    </div>

    <div class="flex items-center gap-2 flex-1 justify-center sm:justify-end">
      <button
        @click="$emit('go-to-page', currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-4 py-2 rounded-lg border border-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
      >
        ←
      </button>

      <div class="flex gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="$emit('go-to-page', page)"
          :class="
            page === currentPage
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-600 hover:bg-gray-700'
          "
          class="px-3 py-2 rounded-lg border text-white text-sm transition-colors"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="$emit('go-to-page', currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 rounded-lg border border-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
      >
        →
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  totalResults: { type: Number, required: true },
});

const visiblePages = computed(() => {
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>
