import { supabase } from "@/lib/supabaseclient";
import { create } from "zustand";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface AuthState {
    loading: boolean;
    error: string | null;
    token: string | null;
    success: boolean;
    user: any | null;
    role: string | null;
    registerUser: (data: any) => Promise<any>;
    loginUser: (data: any) => Promise<any>;
    logoutUser: () => Promise<{ success: boolean, message: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
    token: (getCookie("token") as string || null),
    success: false,
    user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
    role: (getCookie("role") as string) || null,

    registerUser: async (data) => {
        console.log("data comming for zustand", data);
        set({ loading: true });
        try {
            //supabase acc create
            const { data: authData, error: accountCreateError } =
                await supabase.auth.signUp({
                    email: data.email,
                    password: data.password,
                    // name: data.name //supabase signUp is not accept name
                });
            if (accountCreateError) throw accountCreateError;
            console.log("account create", authData);

            //id
            const userID = authData.user?.id;

            //supabase image upload
            let imageURL: string | null = null;

            if (data.image) {
                const reFileName =
                    data.image.name.split(".").pop() ||
                    data.image.type.split("/")[1] ||
                    "png";
                const fileName = `${crypto.randomUUID()}/${reFileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("register-image")
                    .upload(fileName, data.image);
                if (uploadError) throw uploadError;

                const { data: imageData } = supabase.storage
                    .from("register-image")
                    .getPublicUrl(fileName);
                console.log("image data", imageData);

                imageURL = imageData.publicUrl;
            }
            console.log("uploaded image url", imageURL);

            //imsert data to supabase
            const { data: register, error: registerError } = await supabase
                .from("register")
                .insert({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    role: "user",
                    image: imageURL,
                    auth_user_id: userID,
                });
            console.log("register completed", register);

            if (registerError) throw registerError;

            set({
                loading: false,
                success: true,
            });
            return {
                success: true,
                message: "Register Successfull",
            };
        } catch (error: any) {
            console.log(error);
            set({ loading: false, error: error.message || "failed" });
            return {
                success: false,
                message: error.message || "Faild to register",
            };
        } finally {
            set({ loading: false });
        }
    },

    loginUser: async (data) => {
        console.log("data comming for zustand", data);
        set({ loading: true });
        try {
            set({ loading: true, success: true });
            const { data: authData, error: authError } =
                await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                });
            console.log("login auth return", authData);
            if (authError) throw authError;

            const { data: profile, error: profileError } = await supabase
                .from("register")
                .select("*")
                .eq("auth_user_id", authData.user.id)
                .single();
            console.log("profile details", profile);
            if (profileError) throw profileError;

            // set cookies
            setCookie("token", authData?.session?.access_token, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });
            
            setCookie("role", profile.role, { maxAge: 60 * 60 * 24 * 7, path: "/" });

            setCookie("user", JSON.stringify(profile), {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });

            //check data to register credentials
            set({
                token: authData?.session?.access_token,
                user: profile,
                role: profile.role,
                loading: false,
            });
            return {
                success: true,
                message: "Login Successfully",
            };
        } catch (error: any) {
            console.log(error);
            set({ loading: false, error: error.message || "failed" });
            return {
                success: false,
                message: error.message || "Faild to login",
            };
        } finally {
            set({ loading: false });
        }
    },


    logoutUser: async () => {
        try {
            set({ loading: true });

            await supabase.auth.signOut();

            deleteCookie("token");
            deleteCookie("role");
            deleteCookie("user");

            set({
                token: null,
                user: null,
                role: null,
                loading: false,
            });

            return {
                success: true,
                message: "Logged out successfully",
            };
        } catch (error: any) {
            set({ loading: false });

            return {
                success: false,
                message: error.message || "Logout failed",
            };
        }
    },
}));
