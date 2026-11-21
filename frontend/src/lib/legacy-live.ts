import type {Craft,Article,Magazine,LoadResult} from "./content";
type Data={crafts:LoadResult<Craft>;articles:LoadResult<Article>;magazines:LoadResult<Magazine>;configured:boolean};
function el(tag:string, cls?:string,text?:string):HTMLElement {
 const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;
}
function badge(r:LoadResult<unknown>, label:string) {
 const b=el('div','cc-data-state');
 b.textContent=r.live?`● LIVE SUPABASE · ${label}`:r.error?`⚠ SUPABASE CONNECTION ERROR · ${label}`:`○ DEMO CONTENT · ${label}`;
 b.classList.add(r.live?'connected':r.error?'failed':'demo');
 if(r.error){const detail=el('small','cc-error',r.error);b.appendChild(detail)}
 return b;
}
export function renderLiveHomepage(data:Data){
 document.querySelectorAll('.cc-data-state, .cc-live-editorial').forEach(node=>node.remove());
 const grid=document.getElementById('crafts-grid');
 const craftsPanel=document.querySelector('.crafts-panel');
 if(grid){grid.replaceChildren();grid.parentElement?.insertBefore(badge(data.crafts,'CRAFTS'),grid);
 if(data.crafts.items.length){data.crafts.items.forEach((craft,i)=>{
   const a=el('a','craft-tile') as HTMLAnchorElement;
   a.href='/crafts'; a.setAttribute('aria-label',`Explore ${craft.name}`);
   const glyph=el('span','craft-symbol','✧');glyph.setAttribute('aria-hidden','true');
   a.append(glyph,el('span',undefined,craft.name),el('small',undefined,String(i+1).padStart(2,'0')));grid.appendChild(a);
 });}else grid.append(el('p','cc-empty','No published crafts available.'));
 const count=craftsPanel?.querySelector('.count-pill');if(count)count.textContent=`${data.crafts.items.length} CRAFTS`;
 const headline=craftsPanel?.querySelector('.crafts-bar h3');if(headline)headline.textContent='All active crafts. One creative universe.';
 }
 const magazine=document.getElementById('magazine');
 const shell=magazine?.querySelector('.shell');
 if(shell){
  const editorial=el('div','cc-live-editorial');
  const heading=el('div','cc-editorial-heading');heading.append(el('h3',undefined,'From Cine Connect Magazine'),el('p',undefined,'Published directly from your Cine Connect database.'));
  editorial.append(heading);
  const cols=el('div','cc-editorial-columns');
  for(const [kind,r] of [['articles',data.articles],['magazines',data.magazines]] as const){
    const section=el('section','cc-editorial-column');
    const head=el('div','cc-editorial-row');head.append(el('h4',undefined,kind==='articles'?'Latest Articles':'Magazine Issues'),badge(r,kind.toUpperCase()));section.append(head);
    const cards=el('div','cc-editorial-cards');
    if(r.items.length){r.items.slice(0,4).forEach(item=>{
      const link=el('a','cc-editorial-item') as HTMLAnchorElement;
      link.href=kind==='articles'?`/articles/${encodeURIComponent(item.id)}`:`/magazine/${encodeURIComponent(item.id)}`;
      const title=el('strong',undefined,item.title);const desc=el('span',undefined,kind==='articles'?(item as Article).excerpt:'Explore the published issue');
      const arrow=el('i',undefined,'↗');arrow.setAttribute('aria-hidden','true');link.append(title,desc,arrow);cards.append(link);
    })}else cards.append(el('p','cc-empty',r.error?'Content is temporarily unavailable.':'No published content available.'));
    section.append(cards);const more=el('a','cc-see-all',kind==='articles'?'Read all articles ↗':'View all magazine issues ↗') as HTMLAnchorElement;
    more.href=kind==='articles'?'/articles':'/magazine';section.append(more);cols.append(section);
  }
  editorial.append(cols);shell.append(editorial);
  const original=magazine?.querySelector('.mag-meta small');if(original)original.textContent='Design concept; live records appear below.';
 }
}
