import SiteHeader from "@/components/SiteHeader";
import WikiSidebar from "@/components/WikiSidebar";

export const metadata = {
  title: "Resident Evil 4 Remake Guide",
  description: "Comprehensive walkthrough, boss strategies, and treasure locations.",
};

export default function SiteLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[250px_1fr] md:gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
        <WikiSidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
