"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

const OtherProfilePage = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (params?.id)
        try {
          const userPostsURL = `/api/users/${params?.id}/posts`;
          const response = await fetch(userPostsURL);
          const data = await response.json();
          setUserPosts(data.user.posts);
        } catch (error) {
          console.log(error);
        }
    };
    fetchUserPosts();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default OtherProfilePage;
