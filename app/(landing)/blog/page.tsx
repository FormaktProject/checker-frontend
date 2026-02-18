import BlogGrid from "./_component/blog-rgid";
import HeroSection from "./_component/hero-section";
import Sidebar from "./_component/sidebar-blog";

export default function BlogPage() {
    return (
       <div className="flex flex-col items-center w-full flex-1 mt-5 py-6 pb-20">
        <div className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8 pt-8 md:pt-12">
          <HeroSection />

          {/* Two Column Layout: Blog Grid + Sidebar */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <BlogGrid />
            <Sidebar />
          </div>
        </div>
      </div>
 
    )
}