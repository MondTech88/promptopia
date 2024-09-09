"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed)
      try {
        await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
        const newPosts = userPosts.filter((p) => post._id !== p._id);
        setUserPosts(newPosts);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (session)
        try {
          const userPostsURL = `/api/users/${session.user.id}/posts`;
          const response = await fetch(userPostsURL);
          const data = await response.json();
          setUserPosts(data.user.posts);
        } catch (error) {
          console.log(error);
        }
    };
    fetchUserPosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
