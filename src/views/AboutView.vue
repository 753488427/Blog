<script setup>
import SectionWithProfile from '../components/SectionWithProfile.vue'

const skillGroups = [
  { title:'前端开发', icon:'</>', skills:['Vue 3','Vite','JavaScript','uni-app','响应式 UI'] },
  { title:'后端与数据', icon:'DB', skills:['Node.js','Express','Java','REST API','MySQL'] },
  { title:'移动开发', icon:'APP', skills:['Android','Kotlin','鸿蒙','Location API'] },
  { title:'部署运维', icon:'OPS', skills:['Linux','Nginx','PM2','腾讯云','HTTPS'] },
]
const timeline = [
  { mark:'NOW', title:'构建 SevenNine Lab', text:'持续完善个人博客、项目作品与开发者工具。' },
  { mark:'NEXT', title:'博客内容系统', text:'接入文章管理、Markdown 内容和服务端数据。' },
  { mark:'LATER', title:'更多工程实验', text:'继续增加 Android、鸿蒙、API 与效率工具。' },
]
</script>

<template>
  <main class="page-shell about-page">
    <SectionWithProfile>
      <header class="about-hero">
        <div class="about-copy"><p class="page-kicker">ABOUT SEVENNINE</p><h1>你好，我是<br /><span>SevenNine。</span></h1><p>一名关注全栈 Web、移动开发与服务部署的 IT 程序员。喜欢把陌生问题拆开、验证，再整理成可以复用的代码与文档。</p><div class="domain-list"><span>Web 开发</span><span>移动应用</span><span>服务部署</span><span>工程实践</span></div><div class="hero-actions"><RouterLink class="primary-button" to="/projects">查看项目作品</RouterLink><a class="secondary-button" href="mailto:hello@sevennine.top">联系我</a></div></div>
        <div class="code-card"><div class="code-head"><i></i><i></i><i></i><span>developer.js</span></div><pre><span>const</span> developer = {
  name: <em>'SevenNine'</em>,
  role: <em>'Full-stack Developer'</em>,
  focus: [
    <em>'Web Engineering'</em>,
    <em>'Mobile Development'</em>,
    <em>'Deployment & Systems'</em>
  ],
  status: <b>'keep building'</b>
}</pre></div>
      </header>

      <section class="about-grid">
        <article class="story-card"><p class="page-kicker">MY STORY</p><h2>持续学习，持续构建。</h2><p>SevenNine Lab 是我的工程日志。这里不仅记录最后的结果，也保留开发过程中的失败、判断和取舍。</p><p>我相信真正有价值的技术内容，应该来自亲手完成的项目，能够说明“为什么这样做”，并给出清楚的验证方式。</p><div class="principle-row"><span><b>01</b>先理解系统</span><span><b>02</b>保持可验证</span><span><b>03</b>持续写下来</span></div></article>
        <article class="timeline-card"><div class="card-title"><p class="page-kicker">NOW & NEXT</p><h2>正在发生</h2></div><div v-for="item in timeline" :key="item.mark" class="timeline-row"><span>{{ item.mark }}</span><div><strong>{{ item.title }}</strong><p>{{ item.text }}</p></div></div></article>
      </section>

      <section class="skills-section"><div class="section-head"><div><p class="page-kicker">TECH STACK</p><h2>能力与工具</h2><p>围绕完整产品链路持续积累，而不是只停留在单一框架。</p></div></div><div class="skills-grid"><article v-for="group in skillGroups" :key="group.title"><span class="skill-icon">{{ group.icon }}</span><h3>{{ group.title }}</h3><div><span v-for="skill in group.skills" :key="skill">{{ skill }}</span></div></article></div></section>

      <section class="goal-banner"><div><p class="page-kicker">CURRENT GOAL</p><h2>把做过的事，变成长期可复用的能力。</h2></div><RouterLink class="primary-button" to="/posts">阅读工程笔记 →</RouterLink></section>
    </SectionWithProfile>
  </main>
</template>

<style scoped>
.about-page{padding-top:42px}.about-hero{min-height:500px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:42px;padding:clamp(32px,5vw,60px);background:var(--surface);border:1px solid var(--line);border-radius:22px}.about-copy h1{margin:0;font-size:clamp(44px,5vw,70px);line-height:1.03;letter-spacing:-.055em}.about-copy h1 span{color:transparent;background:linear-gradient(100deg,var(--brand),#72a6ff);background-clip:text}.about-copy>p:not(.page-kicker){max-width:620px;margin:24px 0 0;color:var(--muted);font-size:15px;line-height:1.9}.hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}.code-card{overflow:hidden;background:var(--bg);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);transform:rotate(1deg)}.code-head{height:45px;display:flex;align-items:center;gap:6px;padding:0 14px;background:var(--surface-2);border-bottom:1px solid var(--line)}.code-head i{width:7px;height:7px;background:var(--danger);border-radius:50%}.code-head i:nth-child(2){background:var(--warning)}.code-head i:nth-child(3){background:var(--success)}.code-head span{margin-left:auto;color:var(--muted);font:700 8px/1 var(--mono)}.code-card pre{margin:0;padding:30px;color:var(--soft);font:600 12px/2 var(--mono);white-space:pre-wrap}.code-card pre span{color:#c792ea}.code-card pre em{color:#c3e88d;font-style:normal}.code-card pre b{color:var(--brand);font-weight:600}.about-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:18px;margin-top:18px}.story-card,.timeline-card{padding:30px;background:var(--surface);border:1px solid var(--line);border-radius:20px}.story-card h2,.card-title h2{margin:12px 0 18px;font-size:27px;letter-spacing:-.035em}.story-card>p:not(.page-kicker){margin:0 0 14px;color:var(--muted);font-size:13px;line-height:1.85}.principle-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:26px;padding-top:22px;border-top:1px solid var(--line)}.principle-row span{color:var(--muted);font-size:11px}.principle-row b{display:block;margin-bottom:9px;color:var(--brand);font:800 9px/1 var(--mono)}.timeline-row{display:grid;grid-template-columns:55px 1fr;gap:16px;padding:18px 0;border-top:1px solid var(--line)}.timeline-row>span{color:var(--brand);font:800 9px/1.5 var(--mono)}.timeline-row strong{font-size:13px}.timeline-row p{margin:7px 0 0;color:var(--muted);font-size:12px;line-height:1.65}.skills-section{margin-top:70px}.skills-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.skills-grid article{min-height:220px;padding:25px;background:var(--surface);border:1px solid var(--line);border-radius:18px}.skill-icon{display:grid;width:44px;height:44px;place-items:center;color:var(--brand);font:800 10px/1 var(--mono);background:color-mix(in srgb,var(--brand) 8%,var(--surface));border:1px solid color-mix(in srgb,var(--brand) 30%,var(--line));border-radius:11px}.skills-grid h3{margin:25px 0 18px;font-size:18px}.skills-grid article>div{display:flex;flex-wrap:wrap;gap:7px}.skills-grid article>div span{padding:7px 9px;color:var(--muted);font:700 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:6px}.goal-banner{display:flex;align-items:center;justify-content:space-between;gap:30px;margin-top:18px;padding:30px;background:linear-gradient(120deg,color-mix(in srgb,var(--brand) 7%,var(--surface)),var(--surface));border:1px solid var(--line);border-radius:20px}.goal-banner h2{max-width:690px;margin:12px 0 0;font-size:clamp(24px,3vw,34px);line-height:1.25}
.domain-list{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.domain-list span{padding:7px 9px;color:var(--soft);font:700 9px/1 var(--mono);background:var(--surface-2);border:1px solid var(--line);border-radius:6px}.about-hero{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--brand) 7%,transparent),transparent 34%),var(--surface)}
@media(max-width:880px){.about-hero,.about-grid{grid-template-columns:1fr}.code-card{transform:none}.skills-grid{grid-template-columns:1fr}.goal-banner{align-items:flex-start;flex-direction:column}}
@media(max-width:560px){.about-hero{padding:26px 22px}.hero-actions{align-items:stretch;flex-direction:column}.principle-row{grid-template-columns:1fr}.code-card pre{padding:22px;font-size:10px}}
</style>
