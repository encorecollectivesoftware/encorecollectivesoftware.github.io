/* Encore interactions; only explicit non-identifying events are sent after analytics consent. */
(function(){
  'use strict';
  document.documentElement.classList.add('js-ready');
  const track=(name,params)=>{if(window.EncoreAnalytics)window.EncoreAnalytics.track(name,params)};
  // No form values, names, addresses, or free text are ever passed to Analytics.
  document.querySelectorAll('details[data-specialist]').forEach(details=>{
    details.addEventListener('toggle',()=>{if(details.open)track('specialist_profile_open',{specialist:details.dataset.specialist})});
  });
  document.querySelectorAll('[data-service-interest]').forEach(link=>{
    link.addEventListener('click',()=>track('service_interest',{service:link.dataset.serviceInterest}));
  });
  const menu=document.querySelector('.menu-toggle');
  const nav=document.getElementById('primary-nav');
  if(menu&&nav){
    menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
  }
  const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduced){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.05,rootMargin:'0px 0px 45px 0px'});
    items.forEach(item=>observer.observe(item));
  }else{items.forEach(item=>item.classList.add('visible'))}
  // Shared deterministic tally: continues across page loads and GitHub Pages builds.
  // Time-based display counter; no server-side storage required.
  const diaper=document.querySelector('[data-diaper-counter]');
  if(diaper){
    const base=Number(diaper.dataset.base)||128640;
    const anchor=Date.parse(diaper.dataset.reference)||Date.parse('2026-10-23T00:00:00Z');
    const intervalMs=Math.max(1000,(Number(diaper.dataset.interval)||240)*1000);
    const computed=()=>base+Math.max(0,Math.floor((Date.now()-anchor)/intervalMs));
    const format=new Intl.NumberFormat('en-CA');
    const draw=value=>{diaper.textContent=format.format(value)};
    const liveCount=computed();
    if(!reduced && 'requestAnimationFrame' in window){
      const first=Math.max(base,liveCount-18);const start=performance.now();
      function animate(t){
        const progress=Math.min(1,(t-start)/1600);
        const eased=1-Math.pow(1-progress,3);
        draw(Math.round(first+(liveCount-first)*eased));
        if(progress<1)requestAnimationFrame(animate);else draw(computed());
      }
      requestAnimationFrame(animate);
    } else draw(liveCount);
    window.setInterval(()=>{if(!document.hidden)draw(computed())},1000);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)draw(computed())});
  }
  const filterButtons=Array.from(document.querySelectorAll('[data-review-filter]'));
  const reviews=Array.from(document.querySelectorAll('[data-review-type]'));
  filterButtons.forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.reviewFilter;
    track('review_filter_selected',{category:value});
    filterButtons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
    reviews.forEach(card=>{card.hidden=value!=='all'&&card.dataset.reviewType!==value});
  }));
  const form=document.getElementById('match-form');
  if(form){
    form.addEventListener('focusin',()=>track('assessment_started'),{once:true});
    const countInput=document.getElementById('children-input');const countOutput=document.getElementById('children-value');
    function updateChildren(plus){let n=Number(countInput.value)+plus;n=Math.max(1,Math.min(12,n));countInput.value=String(n);countOutput.textContent=String(n)}
    document.getElementById('children-minus').addEventListener('click',()=>updateChildren(-1));
    document.getElementById('children-plus').addEventListener('click',()=>updateChildren(1));
    const copyButton=document.getElementById('copy-assessment');let message='';
    form.addEventListener('submit',e=>{
      e.preventDefault();const children=Number(countInput.value);const youngest=document.getElementById('youngest').value;
      const duration=document.getElementById('duration').value;const overnight=document.getElementById('overnight').value==='yes';
      const confidence=form.querySelector('input[name="confidence"]:checked').value;
      let score=children*2+(youngest==='baby'?3:youngest==='toddler'?2:youngest==='preschool'?1:0)+(duration==='extended'?3:duration==='weekend'?2:0)+(confidence==='urgent'?3:confidence==='concerned'?1:0);
      const critical=score>=13;const medium=score>=8;
      const label=critical?'COMPREHENSIVE COVERAGE':medium?'COORDINATED CARE':'FLEXIBLE SUPPORT';
      track('assessment_completed',{care_tier:critical?'comprehensive':medium?'coordinated':'flexible'});
      const plan=overnight?(critical?'After Midnight — Private Residence':'After Midnight Engagements'):(critical?'Family Continuity — Wife-Away Protocol':medium?'Encore Duo':'Encore Flex');
      const coverage=overnight?'Two dedicated overnight specialists':critical?'Lead specialist with optional overlapping support':medium?'Coordinated specialist coverage':'One specialist';
      const intensity=critical?'Comprehensive':medium?'Coordinated':'Flexible';
      const explanation=critical?`For a household of ${children} children, a structured family brief, agreed care blocks and additional support during overlapping routines may be helpful. The recommended starting point is a Family Continuity arrangement.`:medium?`Your ${children}-child household may benefit from coordinated care during busy periods, supported by a clear schedule and household priorities.`:`A flexible care arrangement may be suitable for a household of ${children} child${children===1?'':'ren'}, with responsibilities and timing agreed in advance.`;
      const heading=overnight?'A considered plan for <em>overnight continuity.</em>':critical?'A more complete approach to <em>family continuity.</em>':medium?'Support arranged for <em>busy family routines.</em>':'Flexible care, <em>thoughtfully arranged.</em>';
      document.querySelector('.result-status').textContent=label;
      document.getElementById('result-title').innerHTML=heading;
      document.getElementById('result-description').textContent=explanation+(overnight?(critical?' Private Residence starts at $3,950 and includes additional household coordination.':' Overnight care begins at $1,795 for two specialists; Private Residence begins at $3,950.'):'');
      document.getElementById('result-rows').innerHTML=`<div><span>Children</span><strong>${children}</strong></div><div><span>Suggested coverage</span><strong>${coverage}</strong></div><div><span>Care arrangement</span><strong>${intensity}</strong></div><div><span>Recommended service</span><strong>${plan}</strong></div>`;
      copyButton.disabled=false;
      document.getElementById('copy-feedback').textContent='';
      message=`ENCORE HOUSEHOLD CARE SUMMARY\n${label}\nChildren: ${children}\nCoverage: ${coverage}\nRecommended arrangement: ${plan}\n${overnight?(critical?'Private Residence: from $3,950\n':'Overnight care: from $1,795\n'):''}${explanation}\nPlanning guidance only; no online reservation is created.`;
      document.getElementById('assessment-result').scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});
    });
    copyButton.addEventListener('click',async()=>{try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(message)}else{const box=document.createElement('textarea');box.value=message;box.style.position='fixed';box.style.opacity='0';document.body.appendChild(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw Error('Copy unavailable')};document.getElementById('copy-feedback').textContent='Care summary copied.'}catch{document.getElementById('copy-feedback').textContent='Copy blocked by browser permissions.'}});
  }

  const enquiryForm=document.getElementById('enquiry-form');
  if(enquiryForm){
    enquiryForm.addEventListener('focusin',()=>track('enquiry_started'),{once:true});
    let consultationBrief='';
    const enabled=String(enquiryForm.dataset.formspreeEnabled).toLowerCase()==='true';
    const submit=enquiryForm.querySelector('button[type="submit"]');
    const feedback=document.getElementById('enquiry-feedback');
    const result=document.getElementById('enquiry-result');
    enquiryForm.addEventListener('submit',async e=>{
      e.preventDefault();
      if(!enquiryForm.reportValidity())return;
      const get=id=>document.getElementById(id).value;
      const priorities=Array.from(enquiryForm.querySelectorAll('.enquiry-priorities input:checked')).map(e=>e.value);
      const body=[`Service: ${get('enquiry-service')}`,`Children: ${get('enquiry-children')}`,`Area: ${get('enquiry-area')}`,`Timing: ${get('enquiry-when')}`,`Coverage: ${get('enquiry-coverage')}`,`Priorities: ${priorities.join(', ')||'To be discussed'}`];
      consultationBrief='ENCORE — PRIVATE CONSULTATION BRIEF\n'+body.join('\n');
      if(enabled){
        const endpoint=enquiryForm.action;
        if(!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint)){
          feedback.textContent='The enquiry connection is not configured. Please try again later.';
          result.hidden=false;return;
        }
        submit.disabled=true;
        submit.setAttribute('aria-busy','true');
        feedback.textContent='Sending your enquiry…';
        try{
          const response=await fetch(endpoint,{method:'POST',body:new FormData(enquiryForm),headers:{'Accept':'application/json'}});
          if(!response.ok){
            let detail='';
            try{const data=await response.json();detail=Array.isArray(data.errors)?data.errors.map(x=>x.message).filter(Boolean).join(' '):''}catch{}
            throw new Error(detail||'The message could not be sent.');
          }
          document.getElementById('enquiry-summary').textContent=body.join(' · ')+'.';
          feedback.textContent='Your enquiry has been sent. No care arrangement or availability is confirmed.';
          track('generate_lead',{method:'formspree'});
          result.hidden=false;
          enquiryForm.reset();
          result.scrollIntoView({behavior:reduced?'instant':'smooth',block:'nearest'});
        }catch(err){
          feedback.textContent='We could not send your enquiry. Please retry. '+(err.message||'');
          result.hidden=false;
        }finally{submit.disabled=false;submit.removeAttribute('aria-busy')}
      }else{
        consultationBrief+='\nPrepared for review only; no enquiry has been sent.';
        document.getElementById('enquiry-summary').textContent=body.join(' · ')+'.';
        feedback.textContent='Prepared for your review. This is not a reservation or transmitted enquiry.';
        track('enquiry_brief_prepared');
        result.hidden=false;
        result.scrollIntoView({behavior:reduced?'instant':'smooth',block:'nearest'});
      }
    });
    document.getElementById('enquiry-copy').addEventListener('click',async()=>{
      try{
        if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(consultationBrief)}
        else{const box=document.createElement('textarea');box.value=consultationBrief;box.style.position='fixed';box.style.opacity='0';document.body.appendChild(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw Error('copy unavailable')}
        feedback.textContent='Consultation brief copied.';
      }catch{feedback.textContent='The browser could not copy the brief. You can select the details above.'}
    });
  }
})();
