document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav-links');
  const menu=document.querySelector('.menu-toggle');
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
  window.addEventListener('resize',()=>{if(innerWidth>560)nav?.classList.remove('open')});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const slides=[...document.querySelectorAll('.slide')],dots=document.querySelector('.carousel-dots');let current=0,timer;
  slides.forEach((_,i)=>{const dot=document.createElement('button');dot.className='carousel-dot';dot.type='button';dot.setAttribute('aria-label',`Show project ${i+1}`);dot.onclick=()=>{current=i;render();restart()};dots?.append(dot)});
  function render(){slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));dots?.querySelectorAll('button').forEach((dot,i)=>dot.classList.toggle('active',i===current))}
  function restart(){clearInterval(timer);timer=setInterval(()=>{current=(current+1)%slides.length;render()},5600)}
  document.querySelector('.prev')?.addEventListener('click',()=>{current=(current-1+slides.length)%slides.length;render();restart()});document.querySelector('.next')?.addEventListener('click',()=>{current=(current+1)%slides.length;render();restart()});if(slides.length){render();restart()}
  const box=document.querySelector('.lightbox'),viewer=box?.querySelector('img'),stage=box?.querySelector('.lightbox-stage');
  document.querySelectorAll('.project-button').forEach(button=>button.addEventListener('click',()=>{const slide=button.closest('.slide');viewer.src=button.dataset.image;viewer.alt=button.dataset.alt;box.querySelector('strong').textContent=slide.dataset.title;box.querySelector('small').textContent=slide.dataset.type;box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}));
  const close=()=>{box?.classList.remove('open');box?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};box?.querySelector('.lightbox-close').addEventListener('click',close);box?.addEventListener('click',e=>{if(e.target===box)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});stage?.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect();stage.style.setProperty('--zoom-x',`${(e.clientX-r.left)/r.width*100}%`);stage.style.setProperty('--zoom-y',`${(e.clientY-r.top)/r.height*100}%`)});
});
