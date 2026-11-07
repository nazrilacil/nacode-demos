<script setup>
import { Search, X } from 'lucide-vue-next';

defineProps({
  modelValue: { type: String, default: '' },
  categories: { type: Array, default: () => [] },
  activeCategory: { type: String, default: 'All' },
  showFeaturedOnly: { type: Boolean, default: false },
  resultCount: { type: Number, default: 0 },
});
const emit = defineEmits(['update:modelValue', 'update:activeCategory', 'update:showFeaturedOnly']);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3 sm:flex-row">
      <div class="relative flex-1">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
        <input
          :value="modelValue"
          @input="emit('update:modelValue', $event.target.value)"
          type="search"
          placeholder="Cari demo berdasarkan nama…"
          aria-label="Cari demo"
          class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-ink shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          v-if="modelValue"
          type="button"
          @click="emit('update:modelValue', '')"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-mute hover:bg-slate-100"
          aria-label="Hapus pencarian"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        :aria-pressed="showFeaturedOnly"
        @click="emit('update:showFeaturedOnly', !showFeaturedOnly)"
        class="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition"
        :class="showFeaturedOnly
          ? 'border-accent bg-accent-soft text-accent-deep'
          : 'border-slate-200 bg-white text-ink-soft hover:bg-slate-50'"
      >
        <span class="h-2 w-2 rounded-full" :class="showFeaturedOnly ? 'bg-accent' : 'bg-slate-300'" />
        Featured Only
      </button>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        @click="emit('update:activeCategory', 'All')"
        class="rounded-full px-3.5 py-1.5 text-sm font-medium transition ring-1"
        :class="activeCategory === 'All'
          ? 'bg-ink text-white ring-ink'
          : 'bg-white text-ink-soft ring-slate-200 hover:bg-slate-50'"
      >
        All Demos
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        @click="emit('update:activeCategory', cat)"
        class="rounded-full px-3.5 py-1.5 text-sm font-medium transition ring-1"
        :class="activeCategory === cat
          ? 'bg-ink text-white ring-ink'
          : 'bg-white text-ink-soft ring-slate-200 hover:bg-slate-50'"
      >
        {{ cat }}
      </button>
    </div>

    <p class="text-xs text-ink-mute">
      {{ resultCount }} demo{{ resultCount === 1 ? '' : 's' }} ditemukan
    </p>
  </div>
</template>