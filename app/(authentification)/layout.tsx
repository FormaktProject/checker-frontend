import Image from "next/image";
import Header from "../(landing)/_component/header";

const AuthenticationLayout = ({children}:{children:React.ReactNode})=>{
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <Header/>
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0 ">
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#020924e5] via-[#0510367e] to-[#2c396686] "></div>
              </div>
            
            <div className="relative z-10 pt-32">
                
                {children}

            </div>
        </div>
    )

}
export default AuthenticationLayout;