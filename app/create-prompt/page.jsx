"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPromt] = useState("");
  const [tag, setTag] = useState("");
  const [warning, setWarning] = useState(false);
  const post = { prompt, tag };
  const { data: session } = useSession();
  const router = useRouter();

  const createPromt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (session?.user) {
        const response = await fetch("/api/prompt/create", {
          method: "POST",
          body: JSON.stringify({
            ...post,
            creator: session?.user.id,
          }),
        });
        if (response.ok) router.push("/");
      } else setWarning(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPrompt={setPromt}
        setTag={setTag}
        submitting={submitting}
        handleSubmit={createPromt}
        warning={warning}
      />
    </div>
  );
};

export default CreatePrompt;
