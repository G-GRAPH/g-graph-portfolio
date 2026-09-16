document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav-links');
  menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰'});
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}));

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

  const gallery=document.querySelector('.gallery');
  if(gallery && gallery.children.length>1){
    const shell=document.createElement('div');shell.className='gallery-carousel';gallery.parentNode.insertBefore(shell,gallery);shell.appendChild(gallery);
    const previous=document.createElement('button');previous.className='carousel-arrow carousel-prev';previous.type='button';previous.setAttribute('aria-label','Previous project');previous.textContent='←';
    const next=document.createElement('button');next.className='carousel-arrow carousel-next';next.type='button';next.setAttribute('aria-label','Next project');next.textContent='→';
    const dots=document.createElement('div');dots.className='carousel-dots';
    [...gallery.children].forEach((_,index)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Show project ${index+1}`);dot.addEventListener('click',()=>go(index));dots.appendChild(dot)});
    shell.append(previous,next,dots);let current=0,timer;
    function go(index){current=(index+gallery.children.length)%gallery.children.length;gallery.scrollTo({left:gallery.clientWidth*current,behavior:'smooth'});dots.querySelectorAll('button').forEach((dot,i)=>dot.classList.toggle('active',i===current));}
    function restart(){clearInterval(timer);timer=setInterval(()=>go(current+1),6000)}
    previous.addEventListener('click',()=>{go(current-1);restart()});next.addEventListener('click',()=>{go(current+1);restart()});go(0);restart();
  }

  const viewer=document.querySelector('.viewer');
  const image=viewer?.querySelector('img');
  const stage=viewer?.querySelector('.viewer-image');
  document.querySelectorAll('.gallery-card').forEach(card=>card.addEventListener('click',()=>{if(!viewer||!image)return;image.src=card.dataset.image;image.alt=card.dataset.title||'G GRAPH project';viewer.querySelector('.viewer-caption strong').textContent=card.dataset.title||'G GRAPH';viewer.querySelector('.viewer-caption span').textContent=card.dataset.type||'Portfolio project';viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('lock')}));
  const close=()=>{viewer?.classList.remove('open');viewer?.setAttribute('aria-hidden','true');document.body.classList.remove('lock')};viewer?.querySelector('.viewer-close')?.addEventListener('click',close);viewer?.addEventListener('click',event=>{if(event.target===viewer)close()});document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});stage?.addEventListener('mousemove',event=>{const rect=stage.getBoundingClientRect();stage.style.setProperty('--x',`${(event.clientX-rect.left)/rect.width*100}%`);stage.style.setProperty('--y',`${(event.clientY-rect.top)/rect.height*100}%`)});

  const form=document.querySelector('.contact-form');
  if(form && new URLSearchParams(location.search).get('sent')==='true'){const message=document.createElement('p');message.className='sent-message';message.textContent='Your inquiry was sent successfully.';form.prepend(message)}
});
