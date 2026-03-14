"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/zustand/useProduct";
import Image from "next/image";

const List = () => {
  const { loading, product, error, productList } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  console.log("");


  useEffect(() => {
    productList();
  }, []);

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "40px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      {product?.length === 0 && (
        <p>No products available.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {product?.map((item: any) => (
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            style={{
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              cursor: "pointer",
              overflow: "hidden",
              transition: "0.2s ease",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "180px",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "15px" }}>
              <h3 style={{ marginBottom: "8px" }}>{item.name}</h3>
              <p style={{ fontWeight: "bold" }}>₹ {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Product Details Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "350px",
            }}
          >
            {selectedProduct.image && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <h2 style={{ marginTop: "15px" }}>{selectedProduct.name}</h2>
            <p style={{ fontWeight: "bold" }}>
              ₹ {selectedProduct.price}
            </p>

            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                border: "none",
                background: "black",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;