"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserCard = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <p>Please sign in to see your profile.</p>;
  }

  return (
    <div>
       <h1 className="text-2xl font-bold ">
    Customers
  </h1>
    <div className="min-h-screen  p-4">
      <Card className="w-80 shadow-lg rounded-lg">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.imageUrl} alt="User Avatar" />
          </Avatar>
          <CardTitle className="mt-3 text-lg font-semibold">
            {user.fullName}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500">{user.emailAddresses[0]?.emailAddress}</p>
        </CardContent>
      </Card>
    </div>
    </div>
   
  );
};

export default UserCard;
