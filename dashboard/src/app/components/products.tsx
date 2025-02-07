"use client"

import { useEffect, useState } from "react"
import { Edit, Search, Trash } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditProductDialog } from "./editProduct"
import { ICard, productCreateSanity, productDeleteSanity, productPostSanity, sanityFetch } from "@/services/sanityApi"
import { CreateProductDialog } from "./createProduct"




export default function ProductsGrid() {
  const [editingProduct, setEditingProduct] = useState<ICard | null>()

  const [isChange, setIsChange] = useState<boolean>(false)

  //Edit product
  const handleSaveProduct = async (updatedProduct: ICard) => {
    const res = await productPostSanity(updatedProduct)
    if (res) {
      setIsChange(!isChange)
    }
  }

  // delete product
  const handleDeleteProduct = async (updatedProduct: ICard) => {
    const res = await productDeleteSanity(updatedProduct)
    if (res) {
      setIsChange(!isChange)
    }
  }

  // create new product

  const [createProduct, setCreateProduct] = useState<ICard | null>()
  const handleCreateProduct = async (updatedProduct: ICard) => {
    try {
      const res = await productCreateSanity(updatedProduct);
      if (res) {
        setIsChange(!isChange);
        setCreateProduct(null);
      }
    } catch (error) {
      console.error("Creation failed:", error);
    }
  }

  const [productArray, setProductsArray] = useState<ICard[]>([])
  const [showProductArray, setShowProductArray] = useState<ICard[]>([])
  const [search, setSearch] = useState<string>()
  const [categoryDropdown, setCategoryDropdown] = useState<string[]>([])

  useEffect(() => {
    async function getData() {
      let query = '*[_type == "product"]';

      if (search) {
        query = `*[_type == "product" && name match "${search}*"]`;
      }

      const res = await sanityFetch(query);
      setProductsArray(res)
      setShowProductArray(res)
      setCategoryDropdown([...new Set(res.map((item) => item.category))])
    }
    getData()
  }, [search, isChange])

  function valueChangeCategory(value: string) {
    if (value !== "all") {
      setShowProductArray(productArray.filter((item) => (item.category == value)))
    } else {
      setShowProductArray(productArray)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Products({productArray.length})</h1>
        <div className="flex items-center gap-4">

          <Button onClick={(e) => {
            e.stopPropagation(); setCreateProduct({
              _id: '',
              name: '',
              price: 0,
              stockLevel: 0,
              category: '',
              description: '',
              image: '',

            })
          }}>
            Create new
          </Button>

        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." className="pl-8 max-w-sm" value={search} onChange={(e: any) => { setSearch(e.target.value) }} />
        </div>

        <Select defaultValue="all"
          onValueChange={valueChangeCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryDropdown.map((option, index) => (
              <SelectItem value={option} key={index}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showProductArray.map((product) => (
          <Card
            key={product._id}
            className="cursor-pointer transition-shadow hover:shadow-lg overflow-hidden border-[1px]"
            onClick={() => setEditingProduct(product)}
          >
            <CardHeader className="border-b p-0">
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1 text-black">{product.name}</CardTitle>
              <p className="text-lg font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground mt-1">Stock: {product.stockLevel}</p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => { e.stopPropagation(); setEditingProduct(product) }}
                >
                  <Edit className="mr-2 size-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product) }}>
                  <Trash className="mr-2 size-4" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={true}
          onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
          onSave={handleSaveProduct}
          categoryDropdown={categoryDropdown}
        />
      )}

      {createProduct && (
        <CreateProductDialog
          product={createProduct}
          open={true}
          onOpenChange={(open: boolean) => !open && setCreateProduct(null)}
          onSave={handleCreateProduct}
          categoryDropdown={categoryDropdown}
        />
      )}
    </div>
  )
}

