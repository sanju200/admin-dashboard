import NextAuth, { NextAuthOptions } from "next-auth";
import { environments } from "../../../../environment";
import GoogleProvider  from 'next-auth/providers/google'

const GOOGLE_CLEINT_ID = environments.clientId;
const GOOGLE_CLIENT_SECRET = environments.clientSecret;
const NEXTAUTH_SECRET = environments.bearedToken;

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLEINT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    secret: NEXTAUTH_SECRET
    // callbacks: {
    //     async signIn({ account, profile }){
    //         if(!profile?.email){
    //             throw new Error("No profile");
    //         }

    //         await .user.upsert({})
    //     }
    // }
}

const handler = NextAuth(authOption);
export { handler as GET, handler as POST }