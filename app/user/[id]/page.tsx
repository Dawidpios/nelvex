"use client"

import { notFound } from "next/navigation";

async function getUser(id: string) {
  const req = await fetch('http://localhost:3000/api/getUser', { method: 'POST', body: JSON.stringify(id)})
  const user = await req.json()
  
  if(user.message === 'User not found') { 
    notFound()
  }

  return user
}

const UserCard = async ({ params }: { params: { id: string } }) => {

  const userReq = await getUser(params.id)

  return (
        <div>
          <li>{userReq.name}</li>
          <li>{userReq.surname}</li>
          <li>{userReq.login}</li>
          <li>{userReq.email}</li>
        </div>
  );
};

export default UserCard;
