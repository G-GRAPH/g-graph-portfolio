document.addEventListener('DOMContentLoaded',()=>{
  const slides=[...document.querySelectorAll('.carousel-slide')];
  const dots=document.querySelector('.carousel-dots'); let current=0; let timer;
  const show=(index)=>{current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));[...dots.children].forEach((dot,i)=>dot.classList.toggle('active',i===current));};
  slides.forEach((_,i)=>{const dot=document.createElement('button');dot.className='carousel-dot';dot.type='button';dot.ariaLabel=`Show project ${i+1}`;dot.onclick=()=>{show(i);restart()};dots.append(dot)});
  document.querySelector('.prev').onclick=()=>{show(current-1);restart()};document.querySelector('.next').onclick=()=>{show(current+1);restart()};show(0);
  const restart=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),6000)};restart();
  const lightbox=document.querySelector('.lightbox'), stage=document.querySelector('.lightbox-stage'), viewer=stage.querySelector('img');
  document.querySelectorAll('.image-button').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img');viewer.src=image.src;viewer.alt=image.alt;const card=button.closest('.project');lightbox.querySelector('.lightbox-caption strong').textContent=card.dataset.title;lightbox.querySelector('.lightbox-caption span').textContent=card.dataset.type;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}));
  const close=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};document.querySelector('.lightbox-close').onclick=close;lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  stage.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect();stage.style.setProperty('--x',`${((e.clientX-r.left)/r.width)*100}%`);stage.style.setProperty('--y',`${((e.clientY-r.top)/r.height)*100}%`)});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});
