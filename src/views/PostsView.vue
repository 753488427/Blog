<script setup>
import { computed, ref } from 'vue'
import SectionWithProfile from '../components/SectionWithProfile.vue'
import { categories, posts } from '../data/posts'

const activeCategory = ref('全部')
const keyword = ref('')

const filteredPosts = computed(() => {
  const term = keyword.value.trim().toLowerCase()
  return posts.filter((post) => {
    const categoryMatches = activeCategory.value === '全部' || post.category === activeCategory.value
    const keywordMatches = !term || [post.title, post.excerpt, post.category, ...post.tags]
      .some((value) => value.toLowerCase().includes(term))
    return categoryMatches && keywordMatches
  })
})

const featuredPost = computed(() =>
  filteredPosts.value.find((post) => post.featured) || filteredPosts.value[0],
)

const regularPosts = computed(() =>
  filteredPosts.value.filter((post) => post.slug !== featuredPost.value?.slug),
)

const categoryCounts = computed(() => Object.fromEntries(
  categories.map((category) => [
    category,
    category === '全部' ? posts.length : posts.filter((post) => post.category === category).length,
  ]),
))

const popularTags = computed(() => {
  const counts = new Map()
  posts.flatMap((post) => post.tags).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1))
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
})

function selectCategory(category) {
  activeCategory.value = category
}
</script>

<template>
  <main class="page-shell posts-page">
    <SectionWithProfile>
    <header class="posts-header">
      <div class="heading-copy">
        <p class="page-kicker">ENGINEERING NOTES</p>
        <h1>技术文章</h1>
        <p>记录真实问题的现场、判断过程和最终实现。留下下一次仍然能够复用的工程答案。</p>
      </div>

      <div class="header-tools">
        <label class="search-input">
          <span aria-hidden="true">⌕</span>
          <input v-model="keyword" type="search" placeholder="搜索文章、分类或标签" />
          <kbd>⌘ K</kbd>
        </label>
        <div class="note-summary">
          <strong>{{ posts.length }}</strong>
          <span>篇工程笔记</span>
          <i></i>
          <small>持续更新</small>
        </div>
      </div>
    </header>

    <div class="category-tabs" aria-label="文章分类">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :class="{ active: activeCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }} <span>{{ categoryCounts[category] }}</span>
      </button>
    </div>

    <div v-if="filteredPosts.length" class="content-layout">
      <section class="main-column">
        <RouterLink
          v-if="featuredPost"
          class="featured-post"
          :class="`accent-${featuredPost.accent}`"
          :to="`/posts/${featuredPost.slug}`"
        >
          <div class="featured-copy">
            <div class="post-meta">
              <span>FEATURED NOTE</span>
              <i></i>
              <time>{{ featuredPost.date }}</time>
              <em>{{ featuredPost.readTime }}</em>
            </div>
            <h2>{{ featuredPost.title }}</h2>
            <p>{{ featuredPost.excerpt }}</p>
            <div class="featured-footer">
              <div class="tag-list"><span v-for="tag in featuredPost.tags" :key="tag">{{ tag }}</span></div>
              <strong>阅读全文 <span>↗</span></strong>
            </div>
          </div>
          <div class="featured-visual" aria-hidden="true">
            <div class="code-window">
              <div class="code-bar"><span></span><span></span><span></span><small>deployment.log</small></div>
              <div class="code-body">
                <p><i>01</i><b>browser</b><span>request /api</span></p>
                <p><i>02</i><b>nginx</b><span>proxy → :3000</span></p>
                <p><i>03</i><b>node</b><span>query database</span></p>
                <p><i>04</i><b>mysql</b><span>return result</span></p>
                <div><span></span><em>BUILD PASSED</em></div>
              </div>
            </div>
          </div>
        </RouterLink>

        <div v-if="regularPosts.length" class="article-section-head">
          <div><p class="page-kicker">ALL NOTES</p><h2>更多工程记录</h2></div>
          <span>{{ regularPosts.length }} ARTICLES</span>
        </div>

        <div class="article-list">
          <RouterLink
            v-for="(post, index) in regularPosts"
            :key="post.slug"
            class="article-row"
            :class="`accent-${post.accent}`"
            :to="`/posts/${post.slug}`"
          >
            <span class="article-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="article-thumb" aria-hidden="true">
              <span>{{ post.tags[0]?.slice(0, 2) || 'DEV' }}</span>
              <i></i><i></i><i></i>
            </div>
            <div class="article-main">
              <div class="article-meta"><span>{{ post.category }}</span><time>{{ post.date }}</time></div>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <div class="tag-list"><span v-for="tag in post.tags" :key="tag">{{ tag }}</span></div>
            </div>
            <div class="article-side"><span>{{ post.readTime }}</span><strong>↗</strong></div>
          </RouterLink>
        </div>
      </section>

      <aside class="posts-sidebar">
        <section class="sidebar-block">
          <div class="sidebar-heading"><span>01</span><h2>文章分类</h2></div>
          <button
            v-for="category in categories.slice(1)"
            :key="category"
            type="button"
            :class="{ active: activeCategory === category }"
            @click="selectCategory(category)"
          >
            <span>{{ category }}</span><strong>{{ categoryCounts[category] }}</strong>
          </button>
        </section>

        <section class="sidebar-block tags-block">
          <div class="sidebar-heading"><span>02</span><h2>热门标签</h2></div>
          <div class="popular-tags">
            <button v-for="([tag, count]) in popularTags" :key="tag" type="button" @click="keyword = tag">
              #{{ tag }} <span>{{ count }}</span>
            </button>
          </div>
        </section>

        <RouterLink class="series-card" to="/posts/deploy-vue-node-to-tencent-cloud">
          <span class="page-kicker">RECOMMENDED SERIES</span>
          <h2>Vue + Node.js<br />全栈部署实录</h2>
          <p>从服务器购买，到 Nginx、数据库、域名与 HTTPS。</p>
          <strong>开始阅读 <span>→</span></strong>
          <i>01</i>
        </RouterLink>
      </aside>
    </div>

    <section v-else class="empty-result">
      <span>404 / NO NOTES</span>
      <strong>没有找到匹配的文章</strong>
      <p>换一个关键词，或者重新查看全部文章。</p>
      <button type="button" @click="keyword = ''; activeCategory = '全部'">查看全部文章</button>
    </section>
    </SectionWithProfile>
  </main>
</template>

<style scoped>
.posts-page{min-height:75vh;padding-top:42px;padding-bottom:90px}.posts-header{display:grid;grid-template-columns:minmax(0,1fr) minmax(420px,.7fr);align-items:end;gap:70px;padding-bottom:42px;border-bottom:1px solid var(--line)}
.heading-copy h1{margin:10px 0 24px;font-size:clamp(42px,4.6vw,64px);line-height:1.05;letter-spacing:-.05em}.heading-copy h1 span{color:var(--brand)}.heading-copy>p:last-child{max-width:720px;margin:0;color:var(--muted);font-size:15px;line-height:1.9}
.header-tools{display:grid;gap:14px}.search-input{min-height:52px;display:flex;align-items:center;gap:10px;padding:0 14px;color:var(--muted);background:var(--surface);border:1px solid var(--line);border-radius:12px}.search-input:focus-within{border-color:var(--brand);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 12%,transparent)}.search-input input{min-width:0;flex:1;height:48px;color:var(--text);background:transparent;border:0;outline:0}.search-input kbd{padding:5px 7px;color:var(--muted);font:600 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:5px}
.note-summary{display:flex;align-items:center;gap:12px;color:var(--muted)}.note-summary strong{color:var(--text);font:750 28px/1 var(--mono)}.note-summary span{font-size:12px}.note-summary i{width:1px;height:16px;background:var(--line)}.note-summary small{color:var(--brand);font:700 10px/1 var(--mono)}
.category-tabs{display:flex;flex-wrap:wrap;gap:8px;padding:24px 0 30px}.category-tabs button{padding:10px 14px;color:var(--muted);font-size:12px;font-weight:750;background:var(--surface);border:1px solid var(--line);border-radius:999px}.category-tabs button span{margin-left:6px;color:var(--soft);font:700 9px/1 var(--mono)}.category-tabs button:hover,.category-tabs button.active{color:#07111f;background:var(--brand);border-color:var(--brand)}.category-tabs button.active span{color:#07111f}
.content-layout{display:block}.main-column{min-width:0}.featured-post{--accent:var(--brand);min-height:370px;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.68fr);overflow:hidden;background:var(--surface);border:1px solid var(--line);border-top:3px solid var(--accent);border-radius:20px;transition:transform .18s ease,border-color .18s ease}.featured-post:hover{border-color:color-mix(in srgb,var(--accent) 55%,var(--line));transform:translateY(-3px)}
.accent-blue{--accent:#4d8dff}.accent-violet{--accent:#a783ff}.accent-green{--accent:#42d99b}.accent-orange{--accent:#ff9f5a}.featured-copy{display:flex;flex-direction:column;padding:clamp(28px,3.5vw,46px)}.post-meta{display:flex;align-items:center;gap:11px;color:var(--muted);font:700 9px/1 var(--mono);letter-spacing:.08em}.post-meta>span{color:var(--accent)}.post-meta i{width:20px;height:1px;background:var(--line)}.post-meta em{margin-left:auto;font-style:normal}.featured-copy h2{max-width:820px;margin:38px 0 16px;font-size:clamp(30px,3.6vw,46px);line-height:1.08;letter-spacing:-.05em}.featured-copy>p{max-width:760px;margin:0;color:var(--muted);font-size:14px;line-height:1.8}.featured-footer{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-top:auto;padding-top:32px}.featured-footer>strong{color:var(--accent);font-size:13px;white-space:nowrap}
.tag-list{display:flex;flex-wrap:wrap;gap:7px}.tag-list>span{padding:5px 8px;color:var(--soft);font:650 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:6px}
.featured-visual{display:grid;place-items:center;min-width:0;padding:32px;background:radial-gradient(circle at 50% 30%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 55%),var(--surface-2);border-left:1px solid var(--line)}.code-window{width:100%;overflow:hidden;background:var(--bg);border:1px solid color-mix(in srgb,var(--accent) 28%,var(--line));border-radius:14px;box-shadow:var(--shadow);transform:rotate(1deg)}.code-bar{height:42px;display:flex;align-items:center;gap:6px;padding:0 13px;border-bottom:1px solid var(--line)}.code-bar>span{width:7px;height:7px;background:var(--line);border-radius:50%}.code-bar>span:first-child{background:#ff6b75}.code-bar>span:nth-child(2){background:#ffbd66}.code-bar>span:nth-child(3){background:#41d896}.code-bar small{margin-left:auto;color:var(--muted);font:600 8px/1 var(--mono)}.code-body{padding:16px}.code-body p{display:grid;grid-template-columns:24px 70px 1fr;gap:10px;margin:0;padding:13px 0;border-bottom:1px solid var(--line);font:600 10px/1 var(--mono)}.code-body p i{color:var(--muted);font-style:normal}.code-body p b{color:var(--accent)}.code-body p span{color:var(--soft)}.code-body>div{display:flex;align-items:center;gap:9px;margin-top:22px;color:var(--brand);font:750 9px/1 var(--mono)}.code-body>div>span{width:7px;height:7px;background:var(--brand);border-radius:50%;box-shadow:0 0 10px var(--brand)}.code-body em{font-style:normal}
.article-section-head{display:flex;justify-content:space-between;align-items:end;margin:48px 0 18px}.article-section-head h2{margin:7px 0 0;font-size:26px;letter-spacing:-.035em}.article-section-head>span{color:var(--muted);font:700 9px/1 var(--mono);letter-spacing:.1em}.article-list{display:grid;gap:10px}.article-row{--accent:var(--brand);display:grid;grid-template-columns:34px 104px minmax(0,1fr) auto;align-items:center;gap:18px;padding:18px;background:var(--surface);border:1px solid var(--line);border-radius:15px;transition:background .18s ease,transform .18s ease,border-color .18s ease}.article-row:hover{background:color-mix(in srgb,var(--accent) 4%,var(--surface));border-color:color-mix(in srgb,var(--accent) 42%,var(--line));transform:translateX(4px)}.article-index{color:var(--accent);font:750 10px/1.5 var(--mono)}.article-thumb{height:84px;display:grid;grid-template-columns:repeat(3,1fr);align-content:end;gap:5px;padding:12px;overflow:hidden;background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 22%,var(--surface-2)),var(--bg));border:1px solid color-mix(in srgb,var(--accent) 30%,var(--line));border-radius:12px}.article-thumb span{grid-column:1/-1;align-self:start;color:var(--accent);font:800 12px/1 var(--mono)}.article-thumb i{height:22px;background:color-mix(in srgb,var(--accent) 32%,var(--surface));border-radius:3px}.article-thumb i:nth-of-type(2){height:34px}.article-thumb i:nth-of-type(3){height:48px}.article-meta{display:flex;gap:14px;color:var(--muted);font:700 9px/1 var(--mono);letter-spacing:.08em}.article-meta span{color:var(--accent)}.article-main h3{margin:10px 0 7px;font-size:clamp(18px,1.8vw,24px);letter-spacing:-.035em}.article-main>p{max-width:820px;margin:0 0 12px;color:var(--muted);font-size:12px;line-height:1.65}.article-side{display:flex;min-width:90px;align-items:center;justify-content:flex-end;gap:20px;color:var(--muted);font:650 10px/1 var(--mono)}.article-side strong{color:var(--accent);font-size:18px}
.posts-sidebar{display:none}.sidebar-block,.series-card{padding:24px;background:var(--surface);border:1px solid var(--line);border-radius:16px}.sidebar-heading{display:flex;align-items:center;gap:11px;margin-bottom:15px}.sidebar-heading>span{color:var(--brand);font:700 9px/1 var(--mono)}.sidebar-heading h2{margin:0;font-size:15px}.sidebar-block>button{width:100%;display:flex;align-items:center;justify-content:space-between;padding:12px 0;color:var(--muted);background:transparent;border:0;border-top:1px solid var(--line);font-size:12px}.sidebar-block>button:hover,.sidebar-block>button.active{color:var(--brand)}.sidebar-block>button strong{font:700 10px/1 var(--mono)}
.popular-tags{display:flex;flex-wrap:wrap;gap:7px}.popular-tags button{padding:7px 9px;color:var(--soft);font:650 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:7px}.popular-tags button:hover{color:var(--brand);border-color:var(--brand)}.popular-tags button span{margin-left:4px;color:var(--muted)}
.series-card{position:relative;overflow:hidden;min-height:245px;display:flex;flex-direction:column;background:linear-gradient(145deg,color-mix(in srgb,var(--brand-2) 14%,var(--surface)),var(--surface))}.series-card h2{margin:24px 0 12px;font-size:23px;line-height:1.2;letter-spacing:-.035em}.series-card p{margin:0;color:var(--muted);font-size:12px;line-height:1.75}.series-card strong{margin-top:auto;padding-top:24px;color:var(--brand-2);font-size:12px}.series-card>i{position:absolute;right:-8px;bottom:-28px;color:color-mix(in srgb,var(--brand-2) 12%,transparent);font:900 110px/1 var(--mono);font-style:normal}
.empty-result{min-height:420px;display:grid;place-content:center;justify-items:center;padding:60px;text-align:center;background:var(--surface);border:1px solid var(--line);border-radius:18px}.empty-result>span{color:var(--brand);font:750 9px/1 var(--mono)}.empty-result strong{margin-top:18px;font-size:26px}.empty-result p{color:var(--muted)}.empty-result button{margin-top:14px;padding:11px 16px;color:#07111f;font-weight:800;background:var(--brand);border:0;border-radius:9px}
@media(max-width:1180px){.content-layout{grid-template-columns:1fr}.posts-sidebar{position:static;grid-template-columns:1fr 1fr 1.2fr}.featured-post{grid-template-columns:1fr 380px}}
@media(max-width:850px){.posts-header{grid-template-columns:1fr;gap:34px}.featured-post{grid-template-columns:1fr}.featured-visual{min-height:300px;border-top:1px solid var(--line);border-left:0}.posts-sidebar{grid-template-columns:1fr 1fr}.series-card{grid-column:1/-1}}
@media(max-width:620px){.posts-page{padding-top:48px}.heading-copy h1{font-size:42px}.category-tabs{flex-wrap:nowrap;overflow-x:auto}.category-tabs button{white-space:nowrap}.featured-copy{padding:26px}.featured-copy h2{margin-top:36px}.featured-footer{align-items:flex-start;flex-direction:column}.featured-visual{display:none}.article-row{grid-template-columns:28px 1fr;padding:16px}.article-thumb,.article-side{display:none}.posts-sidebar{grid-template-columns:1fr}.series-card{grid-column:auto}.post-meta em,.search-input kbd{display:none}}
</style>
