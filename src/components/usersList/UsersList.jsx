"use client";

import User from "@/components/user/User";

export default function UsersList({ users }) {
  return (
    <table className="border-separate border-spacing-y-2">
      <thead className="hidden sm:table-header-group">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Profile Picture</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className="grid gap-4 sm:table-row-group">
        {users == null || users?.length === 0 ? (
          <tr>
            <td>😢 No user was found!</td>
          </tr>
        ) : (
          users.map((user) => <User key={user.id} userInfo={user} />)
        )}
      </tbody>
    </table>
  );
}
