"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../app/page.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/userAuth";

const Header = () => {
  const router = useRouter();

  const { logoutUser, user, loading } = useAuthStore();

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response?.success) {
      router.push("/login");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Image
          src="/next.svg"
          alt="Logo"
          width={100}
          height={30}
          priority
        />
      </div>

      <div className={styles.center}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/list" className={styles.navLink}>
          Products
        </Link>
      </div>

      <div className={styles.right}>
        {user ? (
          <button
            onClick={handleLogout}
            disabled={loading}
            className={styles.logoutBtn}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;