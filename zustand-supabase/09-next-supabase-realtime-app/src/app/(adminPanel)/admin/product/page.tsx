"use client";

import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
// import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table";
import { productSchema } from "@/services/validation/product.validation";
import { ProductsFromvalues } from "@/typescript/interface/product.from";
import { useProductStore } from "@/zustand/useProduct";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit, Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";




const Products = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isEditId, setIsEditId] = useState<number | null>(null);
  const {loading,product,productList,addProduct,updateProduct,deleteProduct,error,} = useProductStore();


  useEffect(() => {
    productList();
  }, []);
  console.log("products", product);


  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductsFromvalues>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  console.log("errors", errors);

  const onSubmit = async (data: any) => {
    console.log("data", data);
    try {
      if (isEditId) {
        const response = await updateProduct({ id: isEditId, data: data });
        console.log("response from product page", response);
        if (response.success) {
          toast.success(response.message);
          setOpen(false);
          reset();
          setPreview(null);
        }
      } else {
        const response = await addProduct(data);
        console.log("response from product page", response);
        if (response.success) {
          toast.success(response.message);
          setOpen(false);
          reset();
          setPreview(null);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteProduct(id);
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setOpen(!open);
            reset({
              name: "",
              price: "",
            });
            setPreview(null);
          }}
        >
          Add Product
        </Button>
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(!open);
            reset({
              name: "",
              price: "",
            });
            setPreview(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditId ? "Update" : "Create"} Product
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="Product Name"
                    required
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Product Price</Label>
                  <Input
                    id="price"
                    placeholder="Product Price"
                    type="number"
                    required
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                      Image
                    </div>
                  )}

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setValue("image", file, { shouldValidate: true });

                      if (file) {
                        setPreview(URL?.createObjectURL(file) as any);
                      }
                    }}
                  />
                </div>
              </div>
              {error && <p>{error}</p>}
              <DialogFooter className="mt-4">
                <Button disabled={loading} type="submit">{isEditId ? "Update" : "Save"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </TableCell>
              </TableRow>
            ) : product?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              product?.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setOpen(true);
                        setIsEditId(product.id);
                        reset({
                          name: product.name,
                          price: product.price,
                        });
                        if (product.image) {
                          setPreview(product.image);
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
