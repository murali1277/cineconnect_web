export function setupLegacyPage(){
const icons={crafts:'▦',collaboration:'⟡',profiles:'◉',opportunities:'↗',learning:'✳',magazine:'▤',buzz:'✦',ott:'▷',influencers:'♧',classifieds:'◇',services:'⚙'};
const ecosystem=[['24 Crafts','An industry-wide home for the creative and technical crafts of cinema.','crafts'],['Cine Collaboration','Find people who share your vision and build something together.','collaboration'],['Professional Profiles','Let your skills, experience and portfolio speak for you.','profiles'],['Opportunities','Explore pathways to auditions, projects and industry work.','opportunities'],['Learning Hub','Grow through filmmaking education and mentorship.','learning'],['Cinema Magazine','Read stories celebrating cinema and the minds behind it.','magazine'],['Cinema Buzz','Stay close to the events and conversations of film.','buzz'],['OTT Discovery','Explore stories and discoveries across viewing platforms.','ott'],['Influencers','Connect with voices that shape audience conversations.','influencers'],['Classifieds','Discover cinema-related listings and resources.','classifieds'],['Production Services','Bring the right equipment and services to your set.','services']];
const targets={ott:'ecosystem',influencers:'profiles',classifieds:'production',services:'production'};
const ecoGrid=document.getElementById('ecosystem-grid');
if(ecoGrid)ecoGrid.innerHTML=ecosystem.map(([name,description,key],i)=>`<a class="ecosystem-card" href="#${targets[key]||key}"><span class="eco-index">${String(i+1).padStart(2,'0')}</span><span class="eco-icon" aria-hidden="true">${icons[key]}</span><h3>${name}</h3><p>${description}</p><span class="eco-arrow" aria-hidden="true">↗</span></a>`).join('');
const crafts=['Acting','Direction','Screenwriting','Cinematography','Film Editing','Music Direction','Sound Design','VFX','Makeup','Costume Design','Production Design','Stunt Direction','Art Direction','Choreography','Playback Singing','Dubbing & Voice','Lighting','Production Management','Casting','Animation','Color Grading','Visual Storytelling','Publicity & PR','Production Crew'];
const craftGlyphs=['◈','⌘','✎','◎','⌁','♫','◉','✺','✧','♜','▣','↗','▤','✳','♪','◌','☼','▥','♧','◇','◐','✦','✺','⟡'];
const craftsGrid=document.getElementById('crafts-grid');
if(craftsGrid)craftsGrid.innerHTML=crafts.map((name,i)=>`<a href="#profiles" class="craft-tile"><span class="craft-symbol" aria-hidden="true">${craftGlyphs[i]}</span><span>${name}</span><small>${String(i+1).padStart(2,'0')}</small></a>`).join('');
const opportunities=[['Auditions','Explore performance opportunities','◉'],['Casting Calls','Find talent requirements for productions','✦'],['Crew Requirements','Discover teams looking for skilled crew','▦'],['Film Projects','Connect with stories in development','▣'],['Collaborations','Find your next creative partner','⟡'],['Freelance Assignments','Explore flexible industry work','↗'],['Industry Networking','Meet the people behind the picture','✳']];
const oppGrid=document.getElementById('opportunity-grid');
if(oppGrid)oppGrid.innerHTML=opportunities.map(([title,desc,icon],i)=>`<a href="#contact" class="opportunity-card"><div><span class="opportunity-icon" aria-hidden="true">${icon}</span><span class="sample-tag">CATEGORY PREVIEW</span></div><span class="op-num">0${i+1}</span><h3>${title}</h3><p>${desc}</p><span class="op-arrow" aria-hidden="true">↗</span></a>`).join('');
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('primary-navigation');
function closeMenu(){if(!nav||!toggle)return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');document.body.classList.remove('menu-open')}
if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');document.body.classList.toggle('menu-open',open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  window.addEventListener('resize',()=>{if(window.innerWidth>1120)closeMenu()});
}
const header=document.getElementById('header');
function updateHeader(){if(header)header.classList.toggle('scrolled',window.scrollY>20)}
if(header){
  addEventListener('scroll',updateHeader,{passive:true});
  updateHeader();
}
const yr=document.getElementById('year');
if(yr)yr.textContent=String(new Date().getFullYear());
const contactForm=document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const d=new FormData(f);const name=String(d.get('name')).trim(),email=String(d.get('email')).trim(),subject=String(d.get('subject')).trim(),message=String(d.get('message')).trim();const body=`Name: ${name}\nEmail: ${email}\n\n${message}`;const mailto=`mailto:reachus@cineconnect.cc?subject=${encodeURIComponent('[Cine Connect] '+subject)}&body=${encodeURIComponent(body)}`;const info=document.getElementById('form-info');if(info)info.textContent='Your email application should open with a draft. Press Send there to deliver it. If nothing opens, email reachus@cineconnect.cc directly.';window.location.href=mailto});
}
}
