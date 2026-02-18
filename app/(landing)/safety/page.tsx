import SafetyCTA from "./_compoent/safety-cto";
import SafetyHero from "./_compoent/safety-hero";
import SafetyPillars from "./_compoent/safety-paylar";
import SafetyProcess from "./_compoent/safety-process";
import TrustBadges from "./_compoent/trustedbadge";

export default function SafteyPage(){
    return (
        <main className="flex flex-col items-center mt-5 w-full">
        <SafetyHero />
        <SafetyPillars />
        <SafetyProcess />
        <TrustBadges />
        <SafetyCTA />
        {/* Global Coverage Map */}
        <section className="w-full max-w-[1000px] px-6 pb-24">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] relative w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end p-8">
              <p className="text-white font-medium text-lg">Global Safety Coverage</p>
            </div>
            <img
              alt="Abstract blue map of the world indicating global connectivity and safety network"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA053FEBcJ-87cKGu-27lnjHl04Jia-aexVToYNa65WNgErr35UZvQx_N18HNClInRtpOOevW_AraFDO7VSmqIWhyVkma-j0hxjfAbaWqlplS7FYHB_iDPYb5vhdWIVCFFX9MA53j1zvQXUsAn9o4lo2_1Yqfss2uV1truJw4iZ2KiSNSPWeNFGOUqKEL60mbFerMhhL3TjMHVcpn3F5U5ekDkJp0ppbArpRgXi7npRCpK-M0juN24bFr26PxUeOPcOkSFx1-YgB88"
            />
          </div>
        </section>
      </main>
    )
}