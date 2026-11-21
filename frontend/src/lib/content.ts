export type Craft = { key: string; name: string; sort: number; active: boolean; mediaKey?: string | null };
export type Article = { id: string; title: string; header: string; excerpt: string; body: string; sort: number; public: boolean; imageName?: string | null };
export type Magazine = { id: string; title: string; sort: number; public: boolean; coverName?: string | null };
export type LoadResult<T> = { items: T[]; live: boolean; error?: string };
const fallbackCrafts: Craft[] = ["Acting", "Direction", "Cinematography", "Screenwriting", "Film Editing", "Music & Sound", "Makeup", "Costume Design", "VFX", "Production Design", "Choreography", "Stunts"].map((name,i)=>({key:`demo-${i}`,name,sort:i+1,active:true}));
const fallbackArticles: Article[] = [
 {id:"demo-1",title:"The evolution of Indian storytelling",header:"Perspectives from a changing cinema landscape",excerpt:"Explore how collaboration, craft and technology shape the future of cinema.",body:"A sample editorial layout preview. Connect Supabase to display published Cine Connect articles.",sort:1,public:true},
 {id:"demo-2",title:"The people behind the camera",header:"Celebrating every craft",excerpt:"From cinematography to sound, a story is built by an entire creative team.",body:"This is illustrative content, not a published Cine Connect article.",sort:2,public:true},
 {id:"demo-3",title:"Building the next production",header:"From an idea to a team",excerpt:"Discover how filmmakers plan, connect, and collaborate across departments.",body:"This is illustrative content, not a published Cine Connect article.",sort:3,public:true}
];
const fallbackMagazines: Magazine[] = ["Cinema and the craft", "Behind every frame", "New voices"].map((title,i)=>({id:`demo-mag-${i}`,title,sort:i+1,public:true}));
const base=process.env.SUPABASE_URL;
const key=process.env.SUPABASE_PUBLISHABLE_KEY;
export const integrationConfigured = Boolean(base && key);
async function fetchRows<T>(table:string,select:string,filter:string):Promise<T[]> {
  if(!base || !key) throw new Error("Public content connection is not configured");
  const endpoint=new URL(`/rest/v1/${table}`,base);
  endpoint.searchParams.set("select",select);
  for(const [k,v] of new URLSearchParams(filter)) endpoint.searchParams.set(k,v);
  const abort=AbortSignal.timeout(7000);
  const response=await fetch(endpoint,{headers:{apikey:key,Accept:"application/json"},signal:abort,next:{revalidate:120}});
  if(!response.ok) throw new Error(`Supabase read failed (${response.status})`);
  return (await response.json()) as T[];
}
export async function getCrafts():Promise<LoadResult<Craft>> {
 if(!integrationConfigured) return {items:fallbackCrafts,live:false};
 try {const rows=await fetchRows<{craft_key:string;craft_name:string;home_sort_no:number|null;is_active:boolean;media_storage_key:string|null}>("crafts","craft_key,craft_name,home_sort_no,is_active,media_storage_key","is_active=eq.true&order=home_sort_no.asc.nullslast&limit=60");
  return {items:rows.map(x=>({key:x.craft_key,name:x.craft_name,sort:x.home_sort_no??999,active:x.is_active,mediaKey:x.media_storage_key})),live:true};
 }catch(e){return {items:[],live:false,error:e instanceof Error?e.message:"Unknown error"};}
}
export async function getArticles():Promise<LoadResult<Article>> {
 if(!integrationConfigured) return {items:fallbackArticles,live:false};
 try {const rows=await fetchRows<{article_id:string;article_name:string;article_header:string|null;article_text:string|null;article_image:string|null;order_no:number|null;visible_to_public:boolean}>("articles","article_id,article_name,article_header,article_text,article_image,order_no,visible_to_public","visible_to_public=eq.true&order=order_no.asc.nullslast&limit=40");
 return {items:rows.map(x=>({id:x.article_id,title:x.article_name,header:x.article_header||"",body:x.article_text||"",excerpt:(x.article_text||x.article_header||"").slice(0,170),sort:x.order_no??999,public:x.visible_to_public,imageName:x.article_image})),live:true};
 }catch(e){return {items:[],live:false,error:e instanceof Error?e.message:"Unknown error"};}
}
export async function getMagazines():Promise<LoadResult<Magazine>> {
 if(!integrationConfigured)return{items:fallbackMagazines,live:false};
 try {const rows=await fetchRows<{magazine_id:string;magazine_name:string;magazine_image:string|null;order_no:number|null;visible_to_public:boolean}>("magazines","magazine_id,magazine_name,magazine_image,order_no,visible_to_public","visible_to_public=eq.true&order=order_no.asc.nullslast&limit=40");
 return{items:rows.map(x=>({id:x.magazine_id,title:x.magazine_name,coverName:x.magazine_image,sort:x.order_no??999,public:x.visible_to_public})),live:true};
 }catch(e){return{items:[],live:false,error:e instanceof Error?e.message:"Unknown error"};}
}
// Only use after separately deploying and testing the proposed record-bound V4 endpoints.
// No raw storage keys, absolute paths, secret tokens, or arbitrary URLs are accepted.
export function editorialImageUrl(type:"articles"|"magazines"|"crafts",id:string,kind:"image"|"thumbnail"|"cover"|"icon"){
 const base=process.env.PUBLIC_EDITORIAL_MEDIA_BASE_URL;
 if(!base || !/^[\w-]{1,100}$/.test(id)) return null;
 const supported={articles:["image","thumbnail"],magazines:["cover","thumbnail"],crafts:["icon"]};
 if(!supported[type].includes(kind))return null;
 return `${base.replace(/\/$/,"")}/v1/public/editorial/${type}/${encodeURIComponent(id)}/${kind}`;
}
