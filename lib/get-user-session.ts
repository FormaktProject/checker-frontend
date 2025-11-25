"use server"
import { getSession } from "@/auth"
export async function getUserSession(){
    const session = await getSession()
    if(!session || !session.user || !session.user.id){
        return null
    }
    try{
        return session.user
    }catch(error){
        console.log('Error :', error)
        return null
    }
}