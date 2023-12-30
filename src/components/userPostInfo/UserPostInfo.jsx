"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/utils/apiCalls/users";
import { getAllPosts } from "@/utils/apiCalls/posts";
import UsersList from "../usersList/UsersList";
import UserPostInfoSkeleton from "./UserPostInfoSkeleton";

export default function UserPostInfo() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: 1,
  });

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    retry: 1,
  });

  const queryClient = useQueryClient();

  if (usersQuery.isError) {
    // cancel query retry for no user was found
    if (usersQuery.error?.users != null)
      queryClient.cancelQueries({ queryKey: ["users"] });
  }

  if (postsQuery.isError) {
    // cancel query retry for no post was found
    if (postsQuery.error?.posts != null)
      queryClient.cancelQueries({ queryKey: ["posts"] });
  }

  if (usersQuery.isLoading || postsQuery.isLoading)
    return <UserPostInfoSkeleton />;

  return (
    <>
      <section className="flex flex-col gap-4 sm:flex-row">
        <div className="rounded-md bg-slate-200 p-2 dark:bg-slate-600">
          <h2 className="text-lg font-semibold">Users</h2>

          <span>
            {usersQuery.isLoading
              ? "Loading..."
              : usersQuery.isError
              ? usersQuery.error?.message
              : `Total ${usersQuery?.data?.users?.length}`}
          </span>
        </div>

        <div className="rounded-md bg-slate-200 p-2 dark:bg-slate-600">
          <h2 className="text-lg font-semibold">Posts</h2>
          <span>
            {postsQuery.isLoading
              ? "Loading..."
              : postsQuery.isError
              ? postsQuery?.error?.message
              : `Total: ${postsQuery?.data?.posts?.length}`}
          </span>
        </div>
      </section>

      {/* last user registered date */}
      <section className="text-lg">
        {usersQuery.isLoading
          ? "Loading..."
          : usersQuery.isError
          ? usersQuery.error?.message
          : `Last user registered: ${new Date(
              usersQuery?.data?.users
                ?.sort(
                  (user2, user1) =>
                    new Date(user1.create_date) - new Date(user2.create_date),
                )
                .find((user, i) => i === 0).create_date,
            ).toDateString()}`}
      </section>

      <UsersList users={usersQuery.data?.users} />
    </>
  );
}
