"use client";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [tag, setTag] = useState("");
  const post = { prompt, tag };
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  const editPrompt = async (e) => {
    e.preventDefault();

    if (!promptID) return alert("No Prompt For Update");

    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({ ...post }),
      });
      if (response.ok) router.push("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();
      setPrompt(data.data.prompt);
      setTag(data.data.tag);
    };
    if (promptID) getPromptDetails();
  }, [promptID]);
  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPrompt={setPrompt}
        setTag={setTag}
        submitting={submitting}
        handleSubmit={editPrompt}
      />
    </div>
  );
};

export default EditPrompt;
