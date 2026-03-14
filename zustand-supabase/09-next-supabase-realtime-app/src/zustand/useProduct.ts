import { supabase } from "@/lib/supabaseclient";
import { ProductState } from "@/typescript/type/ProductState";
import { create } from "zustand";


export const useProductStore = create<ProductState>((set, get) => ({
  product: [],
  loading: false,
  error: null,
  success: false,
  
  productList: async () => {
    set({
      loading: true,
    });

    try {
      const response = await supabase.from("products").select("*");
      console.log("response from productlist", response);
      set({ loading: false, product: response.data as any});
      return response.data;
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to get list",
      };
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (data: any) => {
    try {
      //   console.log("data coming in zustand", data);
      set({
        loading: true,
      });

      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      console.log("authdata from addproduct", authData);
      if (authError) throw authError;

      let imageURL: string | null = null;

      if (data.image) {
        const fileExt =
          data.image.name.split(".").pop() ||
          data.image.type.split("/")[1] ||
          "png";
        const fileName = `${crypto.randomUUID()}/${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("product-image")
          .upload(fileName, data.image);

        if (uploadError) throw uploadError;

        const { data: imageData } = supabase.storage
          .from("product-image")
          .getPublicUrl(fileName);
        console.log("get image data", imageData);

        imageURL = imageData.publicUrl;
      }
      console.log("uploaded image url", imageURL);

      const { data: addProduct, error: addProductError } = await supabase
        .from("products")
        .insert({
          name: data.name,
          price: data.price,
          image: imageURL,
          auth_user_id: authData.user.id,
        });
      console.log("addproducts compleated ", addProduct);
      if (addProductError) throw addProductError;
      const list = await get().productList();
      set({
        loading: false,
        success: true,
        product: list,
      });
      return {
        success: true,
        message: "Add Product Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to Add product",
      };
    } finally {
      set({ loading: false });
    }
  },
  
  deleteProduct: async (id: number) => {
    // set({ loading: true });
    try {
      const response = await supabase.from("products").delete().eq("id", id);
      if (response.error) throw response.error;
      const list = await get().productList();
      console.log("after delete list", list);
      set({
        // loading: false,
        success: true,
        product: list,
      });
      return {
        success: true,
        message: "Delete Product Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to Delete product",
      };
    }
  },

  updateProduct: async ({ id, data }: any) => {
    set({ loading: true });
    try {
      let imageURL: string | null = data.image;

      if (data.image) {
        const fileExt =
          data.image.name.split(".").pop() ||
          data.image.type.split("/")[1] ||
          "png";
        const fileName = `${crypto.randomUUID()}/${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("product-image")
          .upload(fileName, data.image);

        if (uploadError) throw uploadError;

        const { data: imageData } = supabase.storage
          .from("product-image")
          .getPublicUrl(fileName);
        console.log("get image data", imageData);

        imageURL = imageData.publicUrl;
      }
      console.log("uploaded image url", imageURL);
      const { data: updateProduct, error: updateProductError } = await supabase
        .from("products")
        .update({
          name: data.name,
          price: data.price,
          image: imageURL,
        })
        .eq("id", id);
      console.log("addproducts compleated ", updateProduct);
      if (updateProductError) throw updateProductError;
      const list = await get().productList();
      set({
        loading: false,
        success: true,
        product: list,
      });
      return {
        success: true,
        message: "Update Product Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to Update product",
      };
    } finally {
      set({ loading: false });
    }
  },
}));
