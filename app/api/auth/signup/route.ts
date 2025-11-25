import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req:Request){
     const { firstName, lastName, email, password } = await req.json();
  
  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return Response.json({ error: 'All fields required' }, { status: 400 });
  }
    try{
                
        
        // Check if user exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return Response.json({ error: 'Email already registered' }, { status: 400 });
        }
        
        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create user
        const user = await prisma.user.create({
            data: {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            status: 'PENDING_VERIFICATION',
            verificationToken,
            resetTokenExpiry
            }
        });
        
        // Send verification email
        //await sendVerificationEmail(email, verificationToken);
        
        return Response.json({ 
            success: true, 
            message: 'Account created. Please check your email.' 
        });
            }catch(error){
                console.log(" Error :", error)
                return Response.json({
                    error:"Somthing went wrong !",
                    
                },{ status: 500 })

            }
        }