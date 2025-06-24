"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import authStore from "@/utils/authStore";
import { useAuthUpdate } from "@/utils/useAuth";

const allowedRoles = ["SUPERADMIN", "ADMIN", "ADMINWATCHER", "ENGINEER"];

function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const AdminAuthComponent: React.FC<P> = observer((props: P) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useAuthUpdate();

    useEffect(() => {
      if (!authStore.user || !authStore.isAuthenticated) {
        return;
      }

      if (!allowedRoles.includes(authStore.user.userGrade)) {
        router.push("/");
      } else {
        setIsChecking(false);
      }
    }, [router]);

    if (isChecking) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          관리자 권한 확인 중...
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  });

  return AdminAuthComponent;
}

export default withAdminAuth;
