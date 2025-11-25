import Image from "next/image";
import Header from "../(landing)/_component/header";
import { DivideIcon } from "lucide-react";

const AuthenticationLayout = ({children}:{children:React.ReactNode})=>{
    return (
        <div className="relative h-screen w-full overflow-hidden  ">
          <div className=" absolute inset-0 z-10 h-screen w-full top-0  backdrop-blur-2xl"></div>
            <Header/>
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0  ">
                <Image
                  alt="Checkerist" 
                  src="/img/hero/bg.webp" 
                  fill 
                  sizes="100vw"
                  priority
                  className="object-cover object-center"
                  quality={90}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020924e5] via-[#0510367e] to-[#2c396686]  "></div>
              </div>
            
            <div className="relative z-10 pt-10 max-h-full overflow-y-auto md:pt-20 py-2 ">
                
                {children}

            </div>
        </div>
    )

}
export default AuthenticationLayout;