<template>
  <section
    v-if="isLoading"
    class="flex flex-col items-center justify-center py-16"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"
    ></div>
    <p class="text-gray-400 text-lg">Loading news...</p>
  </section>

  <section v-else-if="error" class="text-center py-16">
    <div
      class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md mx-auto"
    >
      <svg
        class="h-12 w-12 text-red-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-red-400 mb-2">An Error Occurred</h3>
      <p class="text-red-300 mb-4">{{ error }}</p>
      <button
        @click="$emit('retry')"
        class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </section>

  <section v-else-if="isEmpty" class="text-center py-16">
    <div
      class="bg-gray-800/50 border border-gray-700 rounded-xl p-8 max-w-md mx-auto"
    >
      <svg
        class="h-16 w-16 text-gray-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.077-2.33"
        />
      </svg>
      <h3 class="text-xl font-semibold mb-2">No News Found</h3>
      <p class="text-gray-400 mb-4">
        Try changing your search terms or filters
      </p>
      <button
        @click="$emit('clear-search')"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
      >
        Clear Search
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}>();
</script>
