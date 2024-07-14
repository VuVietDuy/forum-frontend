"use client";
import { getListQuestions } from "@/api/questions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Question {
  postId: string;
  title: string;
  detail: string;
  expecting: string;
  tags: string;
  createBy: string;
  author: string;
  createdAt: string;
}

export default function page() {
  const [listQuestiions, setListQuestions] = useState<Question[]>();
  const { refetch, isLoading, isFetching } = useQuery(
    "GET_LIST_QUESTIONS",
    getListQuestions,
    {
      onSuccess: (res) => {
        setListQuestions(res.data.data);
        console.log(res.data.data);
      },
    }
  );
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3 md:col-span-2">
        <div className="p-6 border-b">
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold">All Questions</h1>
            <Link href={"/questions/ask"} className="button">
              Ask question
            </Link>
          </div>
        </div>
        {listQuestiions &&
          listQuestiions.map((question) => (
            <div className="p-5 border-b flex flex-col gap-2">
              <Link
                href={`questions/${question.postId}`}
                className="text-2xl text-blue-500 line-clamp-2"
              >
                {question.title}
              </Link>
              <div
                dangerouslySetInnerHTML={{ __html: question.detail }}
                className="text-sm line-clamp-2"
              ></div>
              <div className="flex justify-between">
                <div>
                  {question?.tags?.split("#").map((item, index) => (
                    <span className="tag mr-2" key={index}>
                      {item}
                    </span>
                  ))}
                </div>
                <div>
                  <Link href={`users/${question.createBy}`}>
                    {question.author}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-3 md:col-span-1 p-6">
        <div className="border">
          <div className="p-4 bg-gray-100 flex justify-between items-center">
            <h2>Collectives</h2>
            <a>see all</a>
          </div>
          <div className="border-t p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center mb-3">
                <img className="w-8 h-8 mr-2"></img>
                <div className="flex flex-col">
                  <span className="">Microsoft</span>
                  <span className="">21k member</span>
                </div>
              </div>
              <div>
                <button className="px-3 py-2 rounded-md border border-blue-500">
                  Join
                </button>
              </div>
            </div>
            <div>
              <p className="line-clamp-2">
                A collective for developers to engage, share, and learn about
                Microsoft Azure’s open-source frameworks, languages, and
                platform. This collective is organized
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
