export const navigation=[
 {href:"/",label:"Home"},{href:"/crafts",label:"24 Crafts"},{href:"/collaboration",label:"Collaboration"},{href:"/opportunities",label:"Opportunities"},{href:"/learning",label:"Learning Hub"},{href:"/magazine",label:"Magazine"},{href:"/articles",label:"Articles"},{href:"/contact",label:"Contact"}
] as const;
export const safePlatformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL?.startsWith("https://") ? process.env.NEXT_PUBLIC_PLATFORM_URL : "/contact";
