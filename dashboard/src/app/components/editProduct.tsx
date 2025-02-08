"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICard } from "@/services/data";


interface EditProductDialogProps {
  product: ICard;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: ICard) => void;
  categoryDropdown: string[];
}

export function EditProductDialog({
  product: initialProduct,
  open,
  onOpenChange,
  onSave,
  categoryDropdown
}: EditProductDialogProps) {
  const [product, setProduct] = useState<ICard>(initialProduct);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSave(product);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update product", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  
    // When the custom button is clicked, trigger the file input click
    const handleButtonClick = () => {
      fileInputRef.current?.click()
    };
  
    // Optional: handle file selection
    const handleFileChange = (e: any) => {
      const files = e.target.files;
      if (files && files[0]) {
      }
    } 

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative aspect-square w-40 overflow-hidden rounded-lg border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
          
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={product.category}
                  onValueChange={(value) =>
                    setProduct({ ...product, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryDropdown.map((category, index) => (
                      <SelectItem value={category} key={index}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={product.stockLevel}
                  onChange={(e) =>
                    setProduct({ ...product, stockLevel: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, ...props }: React.ComponentProps<"label">) {
  return (
    <label className="text-sm font-medium leading-none" {...props}>
      {children}
    </label>
  );
}
