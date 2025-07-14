"use client";

import { useEffect } from "react";
import { SessionProvider, useSession, signIn } from "next-auth/react";

const Admin = () => {
  useEffect(() => {
    const checkSession = async () => {
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      if (!session?.user) {
        signIn("google");
      }
    };
    checkSession();
  }, []);
  return (
    <SessionProvider>
      <AuthGuard>
        <div>Admin page</div>
      </AuthGuard>
    </SessionProvider>
  );
};

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (!session?.user) {
    return <div>ログインが必要です。</div>;
  }

  return <>{children}</>;
}

export default Admin;
