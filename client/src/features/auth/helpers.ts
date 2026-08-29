import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth-client";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    await auth.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
          router.refresh();
        },
        onError: () => {
          console.error("Log out error");
        },
      },
    });
  };

  return { logout };
};
