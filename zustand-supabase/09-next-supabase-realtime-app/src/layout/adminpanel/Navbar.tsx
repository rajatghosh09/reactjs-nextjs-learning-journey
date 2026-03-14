"use client";

import { useRouter } from "next/navigation";
import { LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/zustand/userAuth";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();

  const { logoutUser, loading } = useAuthStore();


  const handleLogout = async () => {
    const res = await logoutUser();

    console.log("res", res);

    if (res?.success) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error(res?.message || "Logout failed");
    }
  };

  return (
    <div className="w-full h-16 bg-black text-white flex items-center justify-between px-6 shadow-md">

      {/* Left Side - Admin Logo */}
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-500" />
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      {/* Right Side - Logout */}
      <Button
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
      >
        <LogOut className="w-4 h-4" />
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default Navbar;