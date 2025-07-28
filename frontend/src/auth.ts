import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails: string[] = ([] = process.env.ADMIN_EMAILS?.split(";") || []);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google], //Googleプロバイダを設定
  trustHost: true,
  callbacks: {
    //クライアントから送信した情報はcallbacksの中で処理
    async signIn({ user }) {
      // サインイン時の処理
      if (adminEmails.includes(user.email || "")) {
        return true; // 許可されたメールアドレスの場合はサインインを許可
      }
      return false; // それ以外はサインインを拒否
    },
  },
});
