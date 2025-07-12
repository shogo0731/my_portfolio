import NextAuth, { Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import dotenv from "dotenv";
dotenv.config();

let adminEmails: string[] = [];
adminEmails = process.env.ADMIN_EMAILS?.split(";") || [];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    providers: [Google],   //Googleプロバイダを設定
    trustHost: true,
    callbacks: { //クライアントから送信した情報はcallbacksの中で処理
      async signIn({ user }) {   // サインイン時の処理
        if (adminEmails.includes(user.email || "")) {
          return true; // 許可されたメールアドレスの場合はサインインを許可
        }
        return false; // それ以外はサインインを拒否
      },
      async jwt({ token, user, account }: {token: JWT}) {   // JWTトークンの処理
        if (user && account?.id_token) {
          token.idToken = account?.id_token;
        }
        return token;
      },
      async session({ token, session }: {token: JWT}) {   // セッションの処理
        session.idToken = token.idToken;
        return session;
      },
    },
  ],
})