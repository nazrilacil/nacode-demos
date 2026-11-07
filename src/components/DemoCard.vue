<script setup>
import { computed, ref } from 'vue';
import { ArrowUpRight, Sparkles } from 'lucide-vue-next';

const props = defineProps({
  demo: { type: Object, required: true },
  index: { type: Number, default: 0 },
});

const imgError = ref(false);
const hasThumb = computed(() => Boolean(props.demo.thumbnail) && !imgError.value);
const animationDelay = computed(() => `${Math.min(props.index, 6) * 60}ms`);

const statusStyles = computed(() => {
  switch (props.demo.status) {
    case 'Available': return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
    case 'Coming Soon': return 'bg-amber-50 text-amber-700 ring-amber-200';
    case 'Archived': return 'bg-slate-100 text-slate-600 ring-slate-200';
    default: return 'bg-slate-100 text-slate-600 ring-slate-200';
  }
});
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    :style="{ animationDelay }"
  >
    <a
      :href="demo.url"
      target="_blank"
      rel="noopener noreferrer"
      class="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      :aria-label="`Buka demo ${demo.name}`"
    >
      <img
        v-if="hasThumb"
        :src="demo.thumbnail"
        :alt="`Thumbnail ${demo.name}`"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        @error="imgError = true"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-accent-soft"
      >
        <div class="px-6 text-center">
          <Sparkles class="mx-auto mb-2 h-6 w-6 text-accent" />
          <p class="font-display text-sm font-semibold text-ink-soft">{{ demo.name }}</p>
          <p class="text-xs text-ink-mute">Preview segera hadir</p>
        </div>
      </div>

      <span
        class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1"
        :class="statusStyles"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {{ demo.status }}
      </span>
    </a>

    <div class="flex flex-1 flex-col p-5">
      <p class="text-xs font-medium uppercase tracking-wide text-accent">{{ demo.category }}</p>
      <h3 class="mt-1 font-display text-lg font-semibold leading-snug text-ink">{{ demo.name }}</h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-mute">{{ demo.description }}</p>

      <div class="mt-4 flex items-center justify-between gap-3">
        <a
          :href="demo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Live Preview
          <ArrowUpRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <span class="text-xs text-ink-mute">{{ demo.slug }}</span>
      </div>
    </div>
  </article>
</template>