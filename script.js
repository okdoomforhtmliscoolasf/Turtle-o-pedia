(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const toast = document.getElementById('toast');
  let toastTimer;
  function message(text){ if(!toast) return; toast.textContent=text; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2600); }
  if(menu && nav){
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}));
    window.addEventListener('resize',()=>{if(window.innerWidth>900){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
  }
  const wordmark=document.querySelector('.wordmark-toggle');
  if(wordmark){wordmark.addEventListener('click',()=>{const active=wordmark.classList.toggle('is-active');wordmark.setAttribute('aria-pressed',String(active));message(active?'TURTLE / wordmark activated':'TURTLE / wordmark reset');});}
  document.querySelectorAll('[data-quiz]').forEach(quiz=>{
    const feedback=quiz.querySelector('.quiz-feedback');
    quiz.querySelectorAll('.quiz-answer').forEach(btn=>btn.addEventListener('click',()=>{
      quiz.querySelectorAll('.quiz-answer').forEach(b=>b.classList.remove('correct','incorrect'));
      if(btn.dataset.correct==='yes'){btn.classList.add('correct');feedback.textContent='Correct. The shell is integrated with the skeleton, including the ribs and vertebrae.';message('Correct answer — field note unlocked.');}
      else{btn.classList.add('incorrect');feedback.textContent='Not quite. A turtle shell is part of its skeleton, not a detachable covering. Try again.';message('Not quite — try the other answer.');}
    }));
  });
  const explanations={carapace:['Carapace','The carapace is the upper shell. It is fused with the ribs and vertebrae, making it part of the turtle’s skeleton.'],plastron:['Plastron','The plastron is the lower shell or belly plate. It protects the underside and is joined to the carapace by bony bridges in most turtles.'],scutes:['Scutes','Scutes are keratinous shields covering much of the shell surface. They are not the same thing as the underlying bony plates.']};
  document.querySelectorAll('[data-part]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-part]').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');const item=explanations[btn.dataset.part],detail=document.getElementById('anatomyDetail');if(detail&&item){detail.innerHTML=`<p class="eyebrow">SELECTED STRUCTURE</p><h3>${item[0]}</h3><p>${item[1]}</p>`;message(`${item[0]} selected.`);}}));
  const filters=document.querySelectorAll('[data-filter]');
  if(filters.length){filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');let shown=0;document.querySelectorAll('.species-card').forEach(card=>{const visible=btn.dataset.filter==='all'||card.dataset.group===btn.dataset.filter;card.hidden=!visible;if(visible)shown++;});const result=document.getElementById('filterResult');if(result)result.textContent=`Showing ${shown} ${btn.dataset.filter==='all'?'species and groups':btn.dataset.filter+' entries'}.`;message(`Filter applied: ${btn.textContent.toLowerCase()}.`);}));}
  // Graceful image fallback: broken external assets never leave a broken-image icon.
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.alt='Image unavailable — see the linked source for the original photograph.';img.style.background='linear-gradient(135deg,#dce3cf,#a9b98e)';img.style.minHeight='180px';}));
  // Check known local navigation destinations; surface a helpful error if a page link is mistyped.
  const localPages=new Set(['index.html','history.html','anatomy.html','species.html','conservation.html','404.html']);
  document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')){const file=href.split('#')[0];if(file&&!localPages.has(file)){a.addEventListener('click',e=>{e.preventDefault();message('That page link is not available yet.');});}}});
})();