import {LegacyLanding} from "@/components/LegacyLanding";
import {getCrafts, getArticles, getMagazines, integrationConfigured} from "@/lib/content";
import {getMarkdownArticles} from "@/lib/github-articles";
export const revalidate = 120;
export default async function Home(){
 const mdArticles = getMarkdownArticles();
 const [crafts, fetchedArticles, magazines] = await Promise.all([getCrafts(), getArticles(), getMagazines()]);
 const articles = mdArticles.items.length > 0 ? mdArticles : fetchedArticles;
 return <LegacyLanding data={{crafts, articles, magazines, configured: integrationConfigured}}/>;
}
