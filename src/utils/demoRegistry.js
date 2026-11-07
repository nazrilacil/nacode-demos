const modules = import.meta.glob('../../public/demos/*/demo.json', { eager: true });

const REQUIRED_FIELDS = ['name', 'slug', 'category', 'description', 'url'];
const STATUS_VALUES = ['Available', 'Coming Soon', 'Archived'];

function safeString(v, fallback = '') {
  return typeof v === 'string' && v.trim().length ? v.trim() : fallback;
}

function normalizeThumbnail(raw) {
  if (typeof raw !== 'string' || !raw.trim()) return null;
  const t = raw.trim();
  if (/^https?:\/\//i.test(t) || t.startsWith('/')) return t;
  return `/${t}`;
}

function normalizeDemo(raw, fallbackSlug) {
  if (!raw || typeof raw !== 'object') {
    console.warn('[demoRegistry] Invalid metadata:', fallbackSlug);
    return null;
  }
  const missing = REQUIRED_FIELDS.filter((k) => !safeString(raw[k]));
  if (missing.length) {
    console.warn(`[demoRegistry] "${fallbackSlug}" missing: ${missing.join(', ')} — skipped`);
    return null;
  }
  
  const url = safeString(raw.url);
  
  // Validasi URL: terima http(s) absolute ATAU path relatif yang diawali '/'
  const urlValid = /^https?:\/\//i.test(url) || url.startsWith('/');
  if (!urlValid) {
    console.warn(`[demoRegistry] "${fallbackSlug}" invalid url — skipped`);
    return null;
  }

  // PERBAIKAN: Hanya tambahkan trailing slash jika URL bukan file .html
  let normalizedUrl = url;
  if (url.startsWith('/') && !url.endsWith('/') && !url.endsWith('.html')) {
    normalizedUrl = `${url}/`;
  }

  return {
    name: raw.name.trim(),
    slug: raw.slug.trim(),
    category: raw.category.trim(),
    description: raw.description.trim(),
    url: normalizedUrl,
    thumbnail: normalizeThumbnail(raw.thumbnail),
    status: STATUS_VALUES.includes(raw.status) ? raw.status : 'Available',
    featured: Boolean(raw.featured),
    techStack: Array.isArray(raw.techStack) ? raw.techStack.filter((s) => typeof s === 'string') : [],
  };
}

let cache = null;

export function getAllDemos() {
  if (cache) return cache;
  const demos = [];
  for (const path in modules) {
    const mod = modules[path];
    const raw = mod?.default ?? mod;
    const fallbackSlug = path.split('/').slice(-2)[0];
    const normalized = normalizeDemo(raw, fallbackSlug);
    if (normalized) demos.push(normalized);
  }
  demos.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  cache = demos;
  return demos;
}

export function getCategories(demos = getAllDemos()) {
  const set = new Set();
  demos.forEach((d) => set.add(d.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getFeaturedDemos(demos = getAllDemos()) {
  return demos.filter((d) => d.featured);
}