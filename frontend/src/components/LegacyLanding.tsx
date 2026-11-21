"use client";
import {useEffect} from "react";
import {legacyTemplate} from "@/lib/legacy-template";
import {setupLegacyPage} from "@/lib/legacy-init";
import {renderLiveHomepage} from "@/lib/legacy-live";
import type {Craft,Article,Magazine,LoadResult} from "@/lib/content";
import "@/styles/legacy-home.css";
type LiveData={crafts:LoadResult<Craft>;articles:LoadResult<Article>;magazines:LoadResult<Magazine>;configured:boolean};
export function LegacyLanding({data}:{data:LiveData}){
 useEffect(()=>{setupLegacyPage();renderLiveHomepage(data);},[data]);
 return <div className="legacy-home" dangerouslySetInnerHTML={{__html:legacyTemplate}} />;
}
