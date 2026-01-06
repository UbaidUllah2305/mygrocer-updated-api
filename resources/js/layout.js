function setHeaderHeightVar() {
  const header = document.querySelector('header');
  if (!header) return;
  const h = header.offsetHeight || 72;
  document.documentElement.style.setProperty('--header-height', h + 'px');
}

function initLayoutVars() {
  setHeaderHeightVar();
  const ro = new ResizeObserver(() => setHeaderHeightVar());
  const header = document.querySelector('header');
  if (header) ro.observe(header);
  window.addEventListener('resize', setHeaderHeightVar);
  document.addEventListener('DOMContentLoaded', setHeaderHeightVar, { once: true });
}

initLayoutVars();

