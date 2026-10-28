<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findPost, posts } from '../data/posts'

const route = useRoute()
const post = computed(() => findPost(route.params.slug))
const headings = computed(() => post.value?.content.filter((item) => item.type === 'heading') || [])
const relatedPosts = computed(() => posts.filter((item) => item.slug !== route.params.slug).slice(0, 3))
const allTags = computed(() => [...new Set(posts.flatMap((item) => item.tags))])

function copyCode(code) {
  navigator.clipboard?.writeText(code)
}
</script>

<template>
  <main v-if="post" class="article-shell">
    <nav class="breadcrumb" aria-label="面包屑导航">
      <RouterLink to="/">首页</RouterLink><span>›</span>
      <RouterLink to="/posts">技术文章</RouterLink><span>›</span>
      <strong>{{ post.category }}</strong>
    </nav>

    <div class="article-layout">
      <article class="article-column">
        <header class="article-header">
          <div class="article-meta">
            <span>{{ post.category }}</span><i></i>
            <time>{{ post.date }}</time><i></i>
            <span>{{ post.readTime }}</span>
          </div>
          <h1>{{ post.title }}</h1>
          <p>{{ post.excerpt }}</p>
          <div class="author-line">
            <span class="mini-avatar">97</span>
            <div><strong>SevenNine</strong><small>全栈开发者 · 工程实践记录</small></div>
            <div class="article-tags"><span v-for="tag in post.tags" :key="tag"># {{ tag }}</span></div>
          </div>
        </header>

        <div class="article-cover" :class="`accent-${post.accent}`" aria-hidden="true">
          <div class="cover-terminal">
            <div class="terminal-head"><span></span><span></span><span></span><small>sevennine@engineering:~</small></div>
            <div class="terminal-lines">
              <p><i>01</i><b>$</b><span>define the problem</span></p>
              <p><i>02</i><b>$</b><span>trace the data flow</span></p>
              <p><i>03</i><b>$</b><span>build a verifiable solution</span></p>
              <strong>ENGINEERING NOTE / {{ post.category }}</strong>
            </div>
          </div>
          <span class="cover-mark">97</span>
        </div>

        <section class="article-body">
          <template v-for="(block, index) in post.content" :key="`${block.type}-${index}`">
            <p v-if="block.type === 'lead'" class="lead">{{ block.text }}</p>
            <h2 v-else-if="block.type === 'heading'" :id="block.id">{{ block.text }}</h2>
            <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
            <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
            <div v-else-if="block.type === 'code'" class="code-block">
              <div class="code-toolbar">
                <span>{{ block.language }}</span>
                <button type="button" @click="copyCode(block.code)">复制代码</button>
              </div>
              <pre><code>{{ block.code }}</code></pre>
            </div>
          </template>
        </section>

        <footer class="article-footer">
          <div class="footer-tags"><span v-for="tag in post.tags" :key="tag">{{ tag }}</span></div>
          <div class="article-actions"><button type="button">♡ 收藏</button><button type="button">↗ 分享</button></div>
        </footer>

        <RouterLink v-if="relatedPosts[0]" class="next-post" :to="`/posts/${relatedPosts[0].slug}`">
          <div><span>NEXT ARTICLE</span><strong>{{ relatedPosts[0].title }}</strong></div><i>→</i>
        </RouterLink>
      </article>

      <aside class="article-sidebar">
        <div class="sidebar-stack">
          <section class="profile-card side-card">
            <p class="side-title">关于我</p>
            <div class="profile-avatar">97<span></span></div>
            <h2>SevenNine</h2>
            <strong>Full-stack Developer</strong>
            <p>热爱编程与系统设计，记录 Vue、Node.js、Android、数据库和服务部署中的真实工程问题。</p>
            <div class="profile-links">
              <a href="https://github.com/753488427" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
              <RouterLink to="/projects" aria-label="项目">⌘</RouterLink>
              <a href="mailto:hello@sevennine.top" aria-label="邮件">@</a>
            </div>
            <div class="profile-stats">
              <div><strong>{{ posts.length }}</strong><span>文章</span></div>
              <div><strong>5</strong><span>项目</span></div>
              <div><strong>{{ allTags.length }}</strong><span>标签</span></div>
            </div>
          </section>

          <section v-if="headings.length" class="toc-card side-card">
            <p class="side-title">目录</p>
            <a v-for="(heading, index) in headings" :key="heading.id" :href="`#${heading.id}`">
              <span>{{ index + 1 }}.</span>{{ heading.text }}
            </a>
          </section>

          <section class="related-card side-card">
            <p class="side-title">相关文章</p>
            <RouterLink v-for="item in relatedPosts" :key="item.slug" :to="`/posts/${item.slug}`">
              <span :class="`related-icon accent-${item.accent}`">{{ item.category.slice(0, 1) }}</span>
              <div><strong>{{ item.title }}</strong><small>{{ item.date }} · {{ item.readTime }}</small></div>
            </RouterLink>
          </section>

          <section class="tag-card side-card">
            <p class="side-title">标签云</p>
            <div><RouterLink v-for="tag in allTags" :key="tag" to="/posts">{{ tag }}</RouterLink></div>
          </section>
        </div>
      </aside>
    </div>
  </main>

  <main v-else class="not-found-article page-shell">
    <p class="page-kicker">ARTICLE NOT FOUND</p>
    <h1>这篇文章还不存在。</h1>
    <RouterLink class="primary-button" to="/posts">返回文章列表</RouterLink>
  </main>
</template>

<style scoped>
.article-shell{width:min(1120px,calc(100% - var(--shell-gap)));margin:0 auto;padding:34px 0 80px}.breadcrumb{display:flex;align-items:center;gap:9px;margin-bottom:30px;color:var(--muted);font-size:12px}.breadcrumb a:hover{color:var(--brand)}.breadcrumb strong{max-width:280px;overflow:hidden;color:var(--soft);font-weight:600;text-overflow:ellipsis;white-space:nowrap}
.article-layout{display:grid;grid-template-columns:minmax(0,1fr);align-items:start}.article-column{min-width:0;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:18px}.article-header{padding:clamp(32px,5vw,68px);padding-bottom:38px}.article-meta,.article-tags{display:flex;align-items:center;flex-wrap:wrap;gap:10px}.article-meta{color:var(--brand);font:750 10px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase}.article-meta i{width:3px;height:3px;background:var(--line);border-radius:50%}.article-header h1{max-width:980px;margin:25px 0 20px;font-size:clamp(38px,5vw,68px);line-height:1.08;letter-spacing:-.055em}.article-header>p{max-width:850px;margin:0;color:var(--muted);font-size:16px;line-height:1.85}.author-line{display:flex;align-items:center;gap:12px;margin-top:30px;padding-top:24px;border-top:1px solid var(--line)}.mini-avatar{display:grid;width:38px;height:38px;place-items:center;color:#07111f;font-weight:900;background:var(--brand);border-radius:11px}.author-line>div:nth-child(2){display:grid;gap:5px}.author-line strong{font-size:12px}.author-line small{color:var(--muted);font-size:10px}.article-tags{margin-left:auto}.article-tags span{color:var(--muted);font:650 9px/1 var(--mono)}
.article-cover{--accent:var(--brand);position:relative;min-height:340px;display:grid;place-items:center;overflow:hidden;padding:38px;background:radial-gradient(circle at 75% 20%,color-mix(in srgb,var(--accent) 25%,transparent),transparent 45%),#0a101b;border-block:1px solid var(--line)}.accent-blue{--accent:#4d8dff}.accent-violet{--accent:#a783ff}.accent-green{--accent:#42d99b}.accent-orange{--accent:#ff9f5a}.cover-terminal{position:relative;z-index:1;width:min(720px,85%);overflow:hidden;background:#070b12;border:1px solid color-mix(in srgb,var(--accent) 35%,#1d2939);border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,.38);transform:rotate(-1deg)}.terminal-head{height:44px;display:flex;align-items:center;gap:6px;padding:0 14px;border-bottom:1px solid #1d2939}.terminal-head>span{width:7px;height:7px;background:#344054;border-radius:50%}.terminal-head>span:first-child{background:#ff6b75}.terminal-head>span:nth-child(2){background:#ffbd66}.terminal-head>span:nth-child(3){background:#41d896}.terminal-head small{margin-left:auto;color:#667085;font:600 8px/1 var(--mono)}.terminal-lines{padding:20px}.terminal-lines p{display:grid;grid-template-columns:28px 18px 1fr;gap:8px;margin:0;padding:11px 0;color:#a9b7ca;border-bottom:1px solid #182334;font:600 11px/1 var(--mono)}.terminal-lines i{color:#59687d;font-style:normal}.terminal-lines b{color:var(--accent)}.terminal-lines strong{display:block;margin-top:24px;color:var(--accent);font:800 10px/1 var(--mono);letter-spacing:.12em}.cover-mark{position:absolute;right:6%;bottom:-28%;color:color-mix(in srgb,var(--accent) 7%,transparent);font:900 280px/1 var(--mono);letter-spacing:-.12em}
.article-body{max-width:900px;margin:0 auto;padding:54px clamp(30px,6vw,74px) 70px;counter-reset:section}.article-body p,.article-body blockquote{color:var(--soft);font-size:16px;line-height:2}.article-body .lead{margin:0 0 42px;padding-bottom:36px;color:var(--text);font-size:20px;line-height:1.9;border-bottom:1px solid var(--line)}.article-body h2{counter-increment:section;margin:64px 0 22px;padding-top:12px;font-size:30px;letter-spacing:-.035em;scroll-margin-top:100px}.article-body h2::before{margin-right:10px;color:var(--brand);content:counter(section,decimal-leading-zero) '.';font:750 11px/1 var(--mono)}.article-body blockquote{margin:36px 0;padding:22px 24px;color:var(--text);background:color-mix(in srgb,var(--brand) 7%,var(--surface-2));border-left:3px solid var(--brand);border-radius:0 12px 12px 0}
.code-block{overflow:hidden;margin:30px 0;background:#070b12;border:1px solid #1d2939;border-radius:14px}.code-toolbar{height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;color:#77869b;font:700 9px/1 var(--mono);border-bottom:1px solid #1d2939;text-transform:uppercase}.code-toolbar button{padding:6px 9px;color:#8fa0b6;background:#101827;border:1px solid #243147;border-radius:6px}.code-toolbar button:hover{color:var(--brand)}pre{margin:0;padding:24px;overflow-x:auto;color:#b9f6e2;font:500 13px/1.85 var(--mono)}
.article-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 clamp(30px,6vw,74px);padding:24px 0 34px;border-top:1px solid var(--line)}.footer-tags{display:flex;flex-wrap:wrap;gap:7px}.footer-tags span{padding:7px 10px;color:var(--muted);font:650 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:7px}.article-actions{display:flex;gap:8px}.article-actions button{padding:8px 11px;color:var(--muted);background:transparent;border:1px solid var(--line);border-radius:8px}.next-post{display:flex;align-items:center;justify-content:space-between;gap:30px;margin:0 clamp(30px,6vw,74px) 44px;padding:24px;background:var(--surface-2);border:1px solid var(--line);border-radius:13px}.next-post>div{display:grid;gap:9px}.next-post span{color:var(--brand);font:750 9px/1 var(--mono);letter-spacing:.1em}.next-post strong{font-size:16px}.next-post i{color:var(--brand);font-size:24px;font-style:normal}
.article-sidebar{display:none}.sidebar-stack{display:none}.side-card{padding:22px;background:var(--surface);border:1px solid var(--line);border-radius:15px}.side-title{margin:0 0 20px;color:var(--text);font-size:14px;font-weight:800}.profile-card{text-align:center}.profile-card>.side-title{text-align:left}.profile-avatar{position:relative;display:grid;width:76px;height:76px;margin:0 auto 15px;place-items:center;color:#07111f;font-size:25px;font-weight:950;background:linear-gradient(135deg,var(--brand),#78a5ff);border:5px solid var(--surface-2);border-radius:50%}.profile-avatar span{position:absolute;right:1px;bottom:1px;width:12px;height:12px;background:var(--success);border:3px solid var(--surface);border-radius:50%}.profile-card h2{margin:0;font-size:18px}.profile-card>strong{display:block;margin-top:7px;color:var(--brand);font:700 9px/1 var(--mono)}.profile-card>p:not(.side-title){margin:17px 0;color:var(--muted);font-size:11px;line-height:1.8}.profile-links{display:flex;justify-content:center;gap:9px}.profile-links a{display:grid;width:31px;height:31px;place-items:center;color:var(--soft);font:700 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:8px}.profile-links a:hover{color:var(--brand);border-color:var(--brand)}.profile-stats{display:grid;grid-template-columns:repeat(3,1fr);margin:20px -22px -22px;border-top:1px solid var(--line)}.profile-stats div{padding:16px 6px}.profile-stats div+div{border-left:1px solid var(--line)}.profile-stats strong,.profile-stats span{display:block}.profile-stats strong{font:750 16px/1 var(--mono)}.profile-stats span{margin-top:6px;color:var(--muted);font-size:9px}
.toc-card{display:grid;gap:0}.toc-card .side-title{margin-bottom:10px}.toc-card a{display:flex;gap:9px;padding:10px 0;color:var(--muted);font-size:11px;line-height:1.5;border-top:1px solid var(--line)}.toc-card a:hover{color:var(--brand)}.toc-card a span{color:var(--brand);font:700 9px/1.7 var(--mono)}.related-card>a{display:grid;grid-template-columns:46px 1fr;gap:11px;align-items:center;padding:12px 0;border-top:1px solid var(--line)}.related-icon{display:grid;width:46px;height:46px;place-items:center;color:var(--accent);font-weight:900;background:color-mix(in srgb,var(--accent) 10%,var(--surface-2));border:1px solid color-mix(in srgb,var(--accent) 28%,var(--line));border-radius:9px}.related-card>a>div{min-width:0}.related-card strong{display:-webkit-box;overflow:hidden;font-size:11px;line-height:1.5;-webkit-box-orient:vertical;-webkit-line-clamp:2}.related-card small{display:block;margin-top:6px;color:var(--muted);font-size:8px}.tag-card>div{display:flex;flex-wrap:wrap;gap:7px}.tag-card a{padding:6px 8px;color:var(--muted);font:650 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:6px}.tag-card a:hover{color:var(--brand);border-color:var(--brand)}.not-found-article{min-height:65vh}.not-found-article h1{margin-bottom:30px}
@media(max-width:1080px){.article-shell{width:min(100% - 32px,1120px)}}
@media(max-width:860px){.article-layout{grid-template-columns:1fr}.article-sidebar{order:-1}.sidebar-stack{position:static;max-height:none;grid-template-columns:1fr 1fr;overflow:visible}.profile-card{grid-row:span 2}.tag-card{display:none}}
@media(max-width:620px){.article-shell{width:min(100% - 24px,1560px);padding-top:22px}.sidebar-stack{grid-template-columns:1fr}.profile-card{grid-row:auto}.toc-card,.related-card{display:none}.article-header{padding:28px 22px}.article-header h1{font-size:38px}.author-line{align-items:flex-start;flex-wrap:wrap}.article-tags{width:100%;margin-left:0}.article-cover{min-height:230px;padding:20px}.cover-terminal{width:100%}.cover-mark{display:none}.article-body{padding:38px 22px 50px}.article-body .lead{font-size:18px}.article-footer{align-items:flex-start;flex-direction:column;margin-inline:22px}.next-post{margin-inline:22px}}
</style>
