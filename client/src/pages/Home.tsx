import Hero from "@/components/home/Hero";
import QuickAccess from "@/components/home/QuickAccess";
import RecentArticles from "@/components/home/RecentArticles";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div>
      <Hero />
      <QuickAccess />
      <RecentArticles />
      <Newsletter />
    </div>
  );
}
