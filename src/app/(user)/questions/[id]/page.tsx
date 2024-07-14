"use client";
import { getQuestionById } from "@/api/questions";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SaveFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Question {
  id: string;
  title: string;
  detail: string;
  expecting: string;
  tags: string;
}

export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  const [question, setQuestion] = useState<Question>();
  const { refetch, isLoading, isFetching } = useQuery(
    ["GET_QUESTION_BY_ID", params.id], // Use an array to pass the query key and the id
    () => getQuestionById(params.id), // Pass the query function as a function reference
    {
      onSuccess: (res) => {
        console.log(res);
        setQuestion(res.data.data);
      },
    }
  );

  const [answer, setAnswer] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];
  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      <div className="flex justify-between col-span-3 border-b pb-4">
        <div className="w-full">
          <h1 className="text-3xl font-medium mb-4">{question?.title}</h1>
          <div className="flex justify-between">
            <span className="text-sm">Asked 9 year, 2 months ago</span>
            <span className="text-sm">Modified 1 year, 5 months ago</span>
            <span className="text-sm">Viewed 152k times</span>
          </div>
        </div>
        <div className="w-56 flex justify-end">
          <div>
            <Link href={"/questions/ask"} className="button whitespace-nowrap">
              Ask question
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-2">
        <div className="flex pt-4">
          <div className="flex flex-col items-center mr-4">
            <div className="group relative">
              <button className="py-2 px-3 rounded-full border border-gray-800 hover:bg-blue-100">
                <CaretUpOutlined />
              </button>
              <div className="hidden absolute py-2 px-3 top-0 left-12 group-hover:flex bg-white border rounded-lg whitespace-nowrap shadow-lg shadow-gray-400">
                This question shows research effort; it is useful and clear
              </div>
            </div>
            <span className="font-bold my-2 text-2xl">121</span>
            <div className="group relative">
              <button className="py-2 px-3 rounded-full border border-gray-800 hover:bg-gray-100">
                <CaretDownOutlined />
              </button>
              <div className="hidden absolute py-2 px-3 top-0 left-12 group-hover:flex bg-white border rounded-lg  whitespace-nowrap shadow-lg shadow-gray-400">
                This question shows research effort; it is useful and clear
              </div>
            </div>
            <button className="py-2 px-3 rounded-full hover:text-gray-800">
              <SaveFilled></SaveFilled>
            </button>
          </div>
          <div>
            <div className="markdown">
              <div
                dangerouslySetInnerHTML={{ __html: question?.detail || "" }}
              ></div>
            </div>
            <div>
              {question?.tags &&
                question?.tags.split("#").map((tag) => {
                  if (tag) return <span className="tag mr-2 mb-2">{tag}</span>;
                })}
            </div>
          </div>
        </div>
        <h2 className="text-2xl py-4">Answers</h2>
        <div className="flex pt-4">
          <div className="flex flex-col items-center mr-4">
            <div className="group relative">
              <button className="py-2 px-3 rounded-full border border-gray-800 hover:bg-blue-100">
                <CaretUpOutlined />
              </button>
              <div className="hidden absolute py-2 px-3 top-0 left-12 group-hover:flex bg-white border rounded-lg whitespace-nowrap shadow-lg shadow-gray-400">
                This answer is useful
              </div>
            </div>
            <span className="font-bold my-2 text-2xl">121</span>
            <div className="group relative">
              <button className="py-2 px-3 rounded-full border border-gray-800 hover:bg-gray-100">
                <CaretDownOutlined />
              </button>
              <div className="hidden absolute py-2 px-3 top-0 left-12 group-hover:flex bg-white border rounded-lg  whitespace-nowrap shadow-lg shadow-gray-400">
                This answer is not useful
              </div>
            </div>
            <button className="py-2 px-3 rounded-full hover:text-gray-800">
              <SaveFilled></SaveFilled>
            </button>
          </div>
          <div>
            <div>
              I am using MarkEd which implements GitHub flavoured markdown. I
              have some working markdown: ## Test heading a paragraph. ## second
              heading another paragraph Which creates:
              <h2 id="test-heading">Test heading</h2>
              <p>a paragraph.</p>
              <h2 id="second-heading">second heading</h2>
              <p>another paragraph</p>I would like to wrap that markdown section
              in a div, eg:
              <div className="blog-post">
                ## Test heading a paragraph. ## second heading another paragraph
              </div>
              However this returns the following HTML:
              <div className="blog-post">
                ## Test heading a paragraph. ## second heading another paragraph
              </div>
              Eg, no markdown, literally '## Test heading' appears in the HTML.
              How can I properly wrap my markdown in a div? I have found the
              following workaround, however it is ugly and not an actual fix:
              <div className="blog-post">
                <div></div>
                ## Test heading a paragraph. ## second heading another paragraph
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl py-4">Your Answer</h2>
        <div>
          <div className="h-96 w-full bg-white mb-4">
            <ReactQuill
              value={answer}
              onChange={(value: any) => {
                setAnswer(value);
              }}
              modules={quillModules}
              formats={quillFormats}
              className="w-full h-[89%] mt-4 bg-white rounded-lg text-base"
            />
          </div>
          <button className="button">Post answer</button>
        </div>
        <div className="p-4 rounded-lg border border-orange-300 bg-orange-50 mt-6">
          Thanks for contributing an answer to Stack Overflow! Please be sure to
          answer the question. Provide details and share your research! But
          avoid … Asking for help, clarification, or responding to other
          answers. Making statements based on opinion; back them up with
          references or personal experience. To learn more, see our tips on
          writing great answers.
        </div>
      </div>
      <div className="col-span-3 md:col-span-1">
        <h2 className="text-2xl">Linked</h2>
        <div>
          <Link className="text-blue-500" href="/">
            Is this the correct use of the `section` html5 tag?
          </Link>
        </div>
      </div>
    </div>
  );
}
