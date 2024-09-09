"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearchTextChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(setTimeout(() => handleSearch(e.target.value), 500));
  };

  const handleSearch = (query) => {
    const queryRegExp = new RegExp(query, "i");
    const searchedPosts = posts.filter(
      (post) =>
        queryRegExp.test(post.prompt) ||
        queryRegExp.test(post.tag) ||
        queryRegExp.test(post.creator.username)
    );

    setSearchedPosts(searchedPosts);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    handleSearch(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("api/prompt/all");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {}
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full  flex-center">
        <input
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText ? searchedPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
