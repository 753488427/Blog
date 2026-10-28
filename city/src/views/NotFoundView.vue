<template>
  <main class="page-shell error-page">
    <div class="error-code">404</div>
    <p class="page-kicker">ROUTE NOT FOUND</p>
    <h1>这里没有页面，<br />只有一条未匹配的路由。</h1>
    <p>检查地址是否正确，或者从首页重新开始。</p>
    <RouterLink class="primary-button" to="/">返回首页</RouterLink>
  </main>
</template>

<style scoped>
.error-page {
  min-height: 70vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.error-code {
  position: absolute;
  right: 0;
  color: color-mix(in srgb, var(--line) 70%, transparent);
  font: 900 clamp(150px, 28vw, 360px)/1 var(--mono);
  letter-spacing: -0.12em;
  z-index: -1;
}

h1 {
  margin: 10px 0 20px;
  font-size: clamp(38px, 6vw, 68px);
  line-height: 1.1;
  letter-spacing: -0.055em;
}

.error-page > p:not(.page-kicker) {
  margin: 0 0 30px;
  color: var(--muted);
}
</style>
