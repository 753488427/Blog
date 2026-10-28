<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="post-card" :class="`accent-${post.accent}`">
    <div class="post-meta">
      <span>{{ post.category }}</span>
      <span>{{ post.date }}</span>
    </div>
    <h3>
      <RouterLink :to="`/posts/${post.slug}`">{{ post.title }}</RouterLink>
    </h3>
    <p>{{ post.excerpt }}</p>
    <div class="post-footer">
      <div class="tags">
        <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
      </div>
      <RouterLink class="read-link" :to="`/posts/${post.slug}`" :aria-label="`阅读 ${post.title}`">
        阅读 <span>↗</span>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.post-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.post-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  content: '';
  background: var(--card-accent, var(--brand));
}

.post-card:hover {
  border-color: color-mix(in srgb, var(--card-accent, var(--brand)) 40%, var(--line));
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.accent-blue { --card-accent: #4d8dff; }
.accent-violet { --card-accent: #9c7cff; }
.accent-green { --card-accent: #35c993; }
.accent-orange { --card-accent: #ff9e57; }

.post-meta,
.post-footer,
.tags {
  display: flex;
  align-items: center;
}

.post-meta {
  justify-content: space-between;
  color: var(--muted);
  font: 700 10px/1 var(--mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h3 {
  margin: 21px 0 11px;
  font-size: clamp(20px, 2.5vw, 25px);
  line-height: 1.35;
  letter-spacing: -0.025em;
}

h3 a {
  color: var(--text);
}

p {
  min-height: 52px;
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
}

.post-footer {
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
}

.tags {
  flex-wrap: wrap;
  gap: 6px;
}

.tags span {
  padding: 5px 8px;
  color: var(--muted);
  font: 600 10px/1 var(--mono);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 7px;
}

.read-link {
  flex: 0 0 auto;
  color: var(--card-accent, var(--brand));
  font-size: 13px;
  font-weight: 750;
}
</style>
