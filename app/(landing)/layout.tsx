import React from "react";
import Header from "./_component/header";
import Footer from "./_component/footer";


export default function PublicLayout({children}:{children:React.ReactNode}){
    return (
        <div className=" bg-purple-50 text-purple-700">
            {/** Navigation */}
            <Header/>
            <div className=" h-screen">
                {children}
                
            </div>    
        </div>
    )
}