import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDb from '@/app/db/connectDb';
import User from '@/app/models/User';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        await connectDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true; // Always allow valid sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Block sign-in on error
      }
    },

    async session({ session }) {
      try {
        await connectDb();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return session even if DB fails
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };
