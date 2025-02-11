"use client"
import { Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { orderDeleteSanity } from "@/services/data"


interface IOrderDetails {
  userID:string,
  userName: string;
  totalAmount:number,
  productLength:number,
  orderDate:Date
}

export default function OrdersPage() {

  const [orders,setOrders] = useState<IOrderDetails[] | []>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orders = await client.fetch(`*[_type == "shipment" ]{userID,userName,productLength,orderDate,totalAmount}`);
        setOrders(orders)

      } catch (error) {
        
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false)
      }

    }
    fetchOrderDetails();

  },[])

  if (loading) return <p>Loading...</p>
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Orders</h1>
      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="dark:bg-gray-800 dark:text-gray-200">
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead className="text-center">Total Products</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order,index) => (
              <TableRow key={index} className="dark:bg-gray-900 dark:text-gray-200">
                <TableCell className="font-medium">{order.userID}</TableCell>
                <TableCell className="text-center">{order.productLength}</TableCell>
                <TableCell>{order.userName}</TableCell>
                {/* <TableCell>{order.orderDate.toLocaleDateString()}</TableCell> */}
                <TableCell className="text-green-500 font-semibold">Shipped</TableCell>
                <TableCell className="text-right">{order.totalAmount}</TableCell>
                <TableCell>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      orderDeleteSanity(order)
                    }
                  >
                    <Trash className="mr-2 size-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

