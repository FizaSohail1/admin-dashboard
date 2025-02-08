"use client";

import { useEffect, useState } from "react";
import { Edit,Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EditProductDialog } from "./editProduct";
import {
  ICard,
  productCreateSanity,
  productDeleteSanity,
  productPostSanity,
  sanityFetch,
} from "@/services/data";
import { CreateProductDialog } from "./createProduct";

export default function ProductsTable() {
  const [editingProduct, setEditingProduct] = useState<ICard | null>(null);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [createProduct, setCreateProduct] = useState<ICard | null>(null);
  const [productArray, setProductsArray] = useState<ICard[]>([]);
  const [showProductArray, setShowProductArray] = useState<ICard[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categoryDropdown, setCategoryDropdown] = useState<string[]>([]);

  useEffect(() => {
    async function getData() {
      let dataFetch = '*[_type == "product"]';
      const res = await sanityFetch(dataFetch);
      setProductsArray(res);
      setShowProductArray(res);
      setCategoryDropdown([...new Set(res.map((item) => item.category))]);
    }
    getData();
  }, [search, isChange]);

  return (
    <div className=" space-y-3 lg:space-y-8">
      <div className="flex items-center justify-between  gap-2">
        <h1 className="text-xl md:text-3xl font-semibold">
          Products ({productArray.length})
        </h1>
        <Button
          onClick={() =>
            setCreateProduct({
              _id: "",
              name: "",
              price: 0,
              stockLevel: 0,
              category: "",
              description: "",
              image: "",
            })
          }
        >
          Create New
        </Button>
      </div>

      <div className="max-h-[500px] 2xlmax-h-full overflow-auto  border rounded-lg w-[350px] md:w-[620px] lg:w-full">
        <table className="w-full border-collapse">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {showProductArray.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="p-4">
                  <div className="w-16 h-16 relative border-[1px] p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stockLevel}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4 flex justify-center gap-2 whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Edit className="mr-2 size-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      productDeleteSanity(product).then(() =>
                        setIsChange(!isChange)
                      )
                    }
                  >
                    <Trash className="mr-2 size-4" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialogs for Creating & Editing Products */}
      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={true}
          onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
          onSave={(updatedProduct) =>
            productPostSanity(updatedProduct).then(() => setIsChange(!isChange))
          }
          categoryDropdown={categoryDropdown}
        />
      )}

      {createProduct && (
        <CreateProductDialog
          product={createProduct}
          open={true}
          onOpenChange={(open: boolean) => !open && setCreateProduct(null)}
          onSave={(updatedProduct) =>
            productCreateSanity(updatedProduct).then(() => setIsChange(!isChange))
          }
          categoryDropdown={categoryDropdown}
        />
      )}
    </div>
  );
}
