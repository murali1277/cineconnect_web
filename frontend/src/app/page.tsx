import {LegacyLanding} from "@/components/LegacyLanding";
import {getCrafts, getArticles, getMagazines, integrationConfigured} from "@/lib/content";
export const revalidate = 120;
export default async function Home(){
 const [crafts,articles,magazines] = await Promise.all([getCrafts(),getArticles(),getMagazines()]);
 return <LegacyLanding data={{crafts,articles,magazines,configured:integrationConfigured}}/>;
}
