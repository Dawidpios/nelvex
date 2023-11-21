import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../utilities/connectDB/connectDB";
import { verifyPassword } from "../../utilities/passwordManage/passwordManage";


export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    updateAge: 10,
    maxAge: 600
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const client = await connectDB('users')
        const user = await client.collection('users').findOne({email: credentials.email})
        if (!user) {
          throw new Error("User not found!");
        }

        const verfied = await verifyPassword(credentials.password, user.password)
    
        if (!verfied) {
          throw new Error("Password is invalid");
        }
        client.close()
        return user;
      }
    })
  ], 
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token, user, trigger, session}) {
      if(trigger === 'update') {
        return {...token, ...session.user}
      }
      return {...token, ...user}
    },
    async session({session, token, trigger}) {
      session.user.id = token.sub
      return session
    }
  }
}