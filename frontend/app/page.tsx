"use client";

import { getCurrentUser } from "aws-amplify/auth";

export async function getUserName() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return username;
  } catch (err) {
    console.log(err);
  }
}
async function Page() {
  const username = await getUserName();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl lg:mt-20">
        <h1>Hello {username}</h1>
      </div>
    </div>
  );
}

export default Page;
