<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <strong>SevenNine Lab</strong>
        <p>记录代码、系统与持续发生的工程实践。</p>
      </div>
      <div class="footer-links">
        <RouterLink to="/posts">文章</RouterLink>
        <RouterLink to="/projects">项目</RouterLink>
        <RouterLink to="/lab">实验室</RouterLink>
        <a href="mailto:hello@sevennine.top">Email</a>
      </div>
      <span class="copyright">© 2026 · Built with Vue & Node.js</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 80px;
  border-top: 1px solid var(--line);
}

.footer-inner {
  width: min(var(--shell-max), calc(100% - var(--shell-gap)));
  margin: 0 auto;
  padding: 34px 0 42px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 12px 32px;
}

.footer-inner strong {
  font-size: 15px;
}

.footer-inner p,
.copyright {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 12px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: var(--muted);
  font-size: 13px;
}

.footer-links a:hover {
  color: var(--brand);
}

.copyright {
  grid-column: 2;
  text-align: right;
}

@media (max-width: 680px) {
  .footer-inner {
    width: min(100% - 28px, 1180px);
    grid-template-columns: 1fr;
    align-items: start;
  }

  .footer-links {
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .copyright {
    grid-column: 1;
    text-align: left;
  }
}
</style>
