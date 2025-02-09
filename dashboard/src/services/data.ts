"use server"
import { client } from "@/sanity/lib/client"

export interface ICard {
  image: string;
  name: string;
  _id: string;
  category: string;
  description: string;
  stockLevel: number;
  price: number;
}

//product Fetch Sanity
export async function sanityFetch(query: string) {
  const res: ICard[] =  await client.fetch(`${query}{
          'image': image.asset->url,
          name,
          _id,
          category,
          description,
          stockLevel,
          price
        }`)

  return res;
}

async function uploadImageToSanity(imagePath: string) {
  try {
    const response = await fetch(imagePath);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const blob = await response.blob();

    const asset = await client.assets.upload("image", blob);
 
    return asset;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}

export interface IReturnSanityProduct {
  _id: string;
  category: string;
  description: string;
  imagePath: {
    _type: string;
    asset: {
      _ref: string;
      _type: 'reference'
    }
  },
  stockLevel: number;
  price: number;
  name: string
}


//product Update to Sanity
export async function productPostSanity(updatedProduct: ICard) {
  
  const imageAsset = await uploadImageToSanity(updatedProduct.image)
  
  const res = await client.patch(updatedProduct._id)
  .set({
    imagePath: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      },
    },
    name: updatedProduct.name,
    price: updatedProduct.price,
    category: updatedProduct.category,
    stockLevel: updatedProduct.stockLevel,
    description: updatedProduct.description,
  })
  .commit();

  return res
  
}

export async function productDeleteSanity(updatedProduct: ICard) {  
  const res = await client.delete(updatedProduct._id);
  return res  
}

//product Create Sanity
export async function productCreateSanity(updatedProduct: ICard) {
  try {
    const res = await client.create({
      _type: "product",
      name: updatedProduct.name,
      price: updatedProduct.price,
      category: updatedProduct.category,
      stockLevel: updatedProduct.stockLevel,
      description: updatedProduct.description,
    });

    return res;
  } catch (error) {
    console.error("Product not created:", error);
    throw error;
  }
}





