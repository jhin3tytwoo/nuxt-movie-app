<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Sidebar for desktop only -->
    <aside class="hidden md:flex md:flex-col w-60 bg-slate-800 p-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-white">🎬 Monkey</h1>
        <NuxtLink to="/NotificationPage" class="text-white">
          <span class="material-icons">notifications</span>
        </NuxtLink>
      </div>
      <nav class="flex flex-col gap-4 text-white">
        <NuxtLink to="/" class="hover:bg-slate-700 p-2 rounded"
          ><span class="material-icons">home</span>Home</NuxtLink
        >
        <NuxtLink to="/LiveNow" class="hover:bg-slate-700 p-2 rounded"
          ><span class="material-icons">live_tv</span>Live Now</NuxtLink
        >
        <NuxtLink to="/FavoritePage" class="hover:bg-slate-700 p-2 rounded"
          ><span class="material-icons">favorite</span>Favorite</NuxtLink
        >
      </nav>
    </aside>

    <!-- Main content with top bar for mobile -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar for mobile only -->
      <div
        class="md:hidden flex items-center justify-between bg-slate-800 text-white px-4 py-3"
      >
        <h1 class="text-xl font-bold">🎬 Monkey</h1>
        <NuxtLink to="/NotificationPage">
          <span class="material-icons">notifications</span>
        </NuxtLink>
      </div>

      <!-- Main content -->
      <main class="flex-1 p-6">
        <slot />
      </main>

      <!-- Bottom nav for mobile only -->
      <nav
        class="md:hidden fixed bottom-0 left-0 right-0 flex justify-around bg-slate-800 p-2 text-white"
      >
        <NuxtLink to="/"><span class="material-icons">home</span></NuxtLink>
        <NuxtLink to="/LiveNow"
          ><span class="material-icons">live_tv</span></NuxtLink
        >
        <NuxtLink to="/FavoritePage"
          ><span class="material-icons">favorite</span></NuxtLink
        >
      </nav>
    </div>
  </div>
</template>

<script setup name="MainLayout"></script>
