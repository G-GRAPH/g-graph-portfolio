document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'×':'☰'});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false')}));
  const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('visible');observer.unobserve(item.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const viewer=document.querySelector('.viewer'),image=viewer?.querySelector('img'),stage=viewer?.querySelector('.viewer-image');
  document.querySelectorAll('.gallery-card').forEach(card=>card.addEventListener('click',()=>{image.src=card.dataset.image;image.alt=card.dataset.title;viewer.querySelector('strong').textContent=card.dataset.title;viewer.querySelector('span').textContent=card.dataset.type;viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('lock')}));
  const close=()=>{viewer?.classList.remove('open');viewer?.setAttribute('aria-hidden','true');document.body.classList.remove('lock')};viewer?.querySelector('.viewer-close').addEventListener('click',close);viewer?.addEventListener('click',e=>{if(e.target===viewer)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});stage?.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect();stage.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);stage.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)});
});
