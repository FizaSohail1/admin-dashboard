"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface IUserDetails {
  name: string;
  email: string;
  image: string;
}

const UserCard = () => {
  const [users, setUsers] = useState<IUserDetails[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await client.fetch(
          '*[_type == "user"]{"name": name, "email": email, "image": image.asset->url}'
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
        {users.map((userInfo, index) => (
          <Card key={index} className="w-80 shadow-lg rounded-lg">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userInfo.image} alt="User Avatar" />
              </Avatar>
              <CardTitle className="mt-3 text-lg font-semibold">
                {userInfo.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-500">{userInfo.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
