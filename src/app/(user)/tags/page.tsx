"use client";
import { getAllTags } from "@/api/tags";
import Paragraph from "@/components/Paragraph";
import SearchInput from "@/components/SearchInput";
import React, { useState } from "react";
import { useQuery } from "react-query";

interface Tag {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function page() {
  const [tags, setTags] = useState<Tag[]>();
  const { refetch, isLoading, isFetching } = useQuery(
    "GET_ALL_TEACHERS",
    getAllTags,
    {
      onSuccess: (res) => {
        setTags(res.data.data);
      },
    }
  );
  return (
    <div className="m-4">
      <h1 className="text-3xl my-4">Tags</h1>
      <Paragraph>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </Paragraph>
      <div className="flex justify-between mb-4">
        <SearchInput></SearchInput>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {tags &&
          tags.map((tag) => (
            <div className="border p-4 rounded-lg">
              <span className="border bg-gray-100 rounded-lg px-2 pb-1 font-medium text-sm">
                {tag.name}
              </span>
              <p className="line-clamp-4 text-sm text-gray-800 mt-4">
                {tag.description}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
