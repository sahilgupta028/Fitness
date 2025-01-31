import NextAuth  from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import connectMongo from "./lib/mongodb"
import UserModel from "./models/User"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        fullName: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email"},
      },
      authorize: async (credentials) => {

        console.log("Credentials: ", credentials)
        console.log("email: ", credentials.email)
        console.log("password: ", credentials)
        console.log("password: ", credentials.password)

        await connectMongo();

        try {
          
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
        
            ]
          })

          // console.log(user);

          if (!user) {
            console.log("No user found")
            throw new Error("No user found")
          }

          const isPasswordCorrect = bcryptjs.compare(credentials.password, user.password)
          
          if (!isPasswordCorrect) {
            console.log("Password is incorrect")
            return;
            throw new Error("Password is incorrect")
          }

          // console.log("user found: ", user, user._id.toString())

          return user;

        } catch (error) {
          console.log("Error while signIn: ", error)
          throw new Error("Error while signIn")
        }

      }
    })
  ],
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
    verifyRequest: "/auth/verify-request",
    newUser: "/sign-up",
    signOut: "/sign-out",
    
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60*60,
  },
  jwt: {
    maxAge: 60*60, 
  },
  callbacks: {
    async jwt({ token, user}) {
      // console.log("Token in jwt: ", token, user)
      if (user) {
        token.id = user._id?.toString()
        token.email = user.email || ""
        token.fullName = user.fullName || ""

      }
    //  console.log("Token in jwt after: ", token)
      return token
    },
    async session({ session, token }) {

      // console.log("Token in session: ", token)
      if (token) {
        session.user._id = token.id?.toString()
        session.user.email = token.email || ""
        session.user.fullName = token.fullName || ""
       
      }

    //  console.log("Session: ", session);

     return session;
    }
    

  }
})