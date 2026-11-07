<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const open = ref(false);
const scrolled = ref(false);
const links = [
  { label: 'Home', href: '#home' },
  { label: 'All Demos', href: '#demos' },
  { label: 'Categories', href: '#demos' },
];

function onScroll() { scrolled.value = window.scrollY > 8; }
onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full transition-colors duration-300"
    :class="scrolled ? 'border-b border-slate-200/70 bg-white/70 backdrop-blur-md' : 'bg-transparent'"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="#home" class="flex items-center gap-2">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-ink font-display text-sm font-bold text-white">N</span>
        <span class="font-display text-base font-semibold tracking-tight text-ink">Nacode</span>
        <span class="hidden rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-deep sm:inline">
          Showcase
        </span>
      </a>

      <ul class="hidden items-center gap-1 md:flex">
        <li v-for="l in links" :key="l.label">
          <a :href="l.href" class="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-slate-100 hover:text-ink">
            {{ l.label }}
          </a>
        </li>
      </ul>

      <div class="hidden md:block">
        <a
          href="mailto:hello@nacode.id?subject=Project%20Inquiry"
          class="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-deep"
        >
          Contact
        </a>
      </div>

      <button
        type="button"
        class="rounded-lg p-2 text-ink-soft hover:bg-slate-100 md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <Menu v-if="!open" class="h-5 w-5" />
        <X v-else class="h-5 w-5" />
      </button>
    </nav>

    <div v-if="open" id="mobile-menu" class="border-t border-slate-200/70 bg-white/95 backdrop-blur-md md:hidden">
      <ul class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
        <li v-for="l in links" :key="l.label">
          <a :href="l.href" class="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-slate-100 hover:text-ink" @click="open = false">
            {{ l.label }}
          </a>
        </li>
        <li class="pt-1">
          <a href="mailto:hello@nacode.id?subject=Project%20Inquiry" class="block rounded-full bg-ink px-4 py-2 text-center text-sm font-semibold text-white" @click="open = false">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>