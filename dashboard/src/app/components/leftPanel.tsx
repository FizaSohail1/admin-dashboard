"use client"

import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { client } from "@/sanity/lib/client"
import { useEffect, useState } from "react"

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
]

interface IOrderDetails {
  userID:string,
  userName: string;
  totalAmount:number,
  productLength:number,
  orderDate:Date
}

export default function AdminDashboard() {

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
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h1>

      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$216000</div>
            <p className="text-xs text-muted-foreground">from this month</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">from this month</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+20</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 h-fit">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Product Length</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order,i) => (
                  <TableRow key={i}>
                    <TableCell>{order.userID}</TableCell>
                    <TableCell>{order.productLength}</TableCell>
                    <TableCell>{order.userName}</TableCell>
                    <TableCell>Shipped</TableCell>
                    <TableCell className="text-right">{order.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

