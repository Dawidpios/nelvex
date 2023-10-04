import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../utilities/connectDB/connectDB";
import { verifyPassword } from "../../../../utilities/passwordManage/passwordManage";


export const authOptions = {
  session: {
    strategy: "jwt",
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
    async session({session, token}) {
      session.user.id = token.sub
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



