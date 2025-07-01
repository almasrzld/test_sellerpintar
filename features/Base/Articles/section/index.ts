import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./HeroSection"));
export const ListArticlesSection = dynamic(
  () => import("./ListArticlesSection/index")
);
export const PaginationSection = dynamic(() => import("./PaginationSection"));
