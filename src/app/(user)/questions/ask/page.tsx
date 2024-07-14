"use client";
import { fetcher } from "@/api/fetcher";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Ask() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [expecting, setExpecting] = useState("");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");

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

  const handleSubmit = () => {
    console.log(title);
    console.log(detail);
    console.log(expecting);
    console.log(tags);
    fetcher
      .post("/api/questions", {
        title: title,
        detail: detail,
        expecting: expecting,
        tags: tags,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Ask a public question</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border border-blue-400 bg-blue-50 col-span-3 md:col-span-2 mb-6">
          <h2 className="text-xl font-medium ">Writing a good question</h2>
          <p>
            You’re ready to ask a programming-related question and this form
            will help guide you through the process. Looking to ask a
            non-programming question? See the topics here to find a relevant
            site.
          </p>
          <h3>Steps</h3>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>
            Add “tags” which help surface your question to members of the
            community.
          </li>
          <li> Review your question and post it to the site.</li>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-white col-span-3 md:col-span-2 mb-6">
          <h2 className="text-xl font-medium ">Title</h2>
          <p>
            Be specific and imagine you’re asking a question to another person.
          </p>
          <input
            className="input mb-4"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onFocus={() => {
              setNote("title");
            }}
            type="text"
          />
        </div>
        {note === "title" ? (
          <div className="col-span-3 md:col-span-1 mb-6 relative">
            <div className="md:absolute md:top-0 md:left-0 md:right-0 h-fit border rounded-lg">
              <div className="bg-gray-100 border-b p-4">
                <h2>Writing a good title</h2>
              </div>
              <div className="p-4">
                <p>Your title should summarize the problem.</p>
                <p>
                  You might find that you have a better idea of your title after
                  writing out the rest of the question.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-white col-span-3 md:col-span-2 mb-6">
          <h2 className="text-xl font-medium ">
            What are the details of your problem?
          </h2>
          <p>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
          <div className="h-96 w-full">
            <ReactQuill
              value={detail}
              onChange={(value: any) => {
                setDetail(value);
              }}
              onFocus={() => {
                setNote("detail");
              }}
              modules={quillModules}
              formats={quillFormats}
              className="w-full h-[85%] mt-4 bg-white rounded-lg text-base"
            />
          </div>
        </div>
        {note === "detail" ? (
          <div className="col-span-3 md:col-span-1 mb-6 relative">
            <div className="md:absolute md:top-0 md:left-0 md:right-0 h-fit border rounded-lg">
              <div className="bg-gray-100 border-b p-4">
                <h2>Writing a good title</h2>
              </div>
              <div className="p-4">
                <p>Your title should summarize the problem.</p>
                <p>
                  You might find that you have a better idea of your title after
                  writing out the rest of the question.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-white col-span-3 md:col-span-2 mb-6">
          <h2 className="text-xl font-medium ">
            What did you try and what were you expecting?
          </h2>
          <p>
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 20 characters.
          </p>
          <div className="h-96 w-full">
            <ReactQuill
              value={expecting}
              onChange={(value: any) => {
                setExpecting(value);
              }}
              onFocus={() => {
                setNote("expecting");
              }}
              modules={quillModules}
              formats={quillFormats}
              className="w-full h-[85%] mt-4 bg-white rounded-lg text-base"
            />
          </div>
        </div>
        {note === "expecting" ? (
          <div className="col-span-3 md:col-span-1 mb-6 relative">
            <div className="md:absolute md:top-0 md:left-0 md:right-0 h-fit border rounded-lg">
              <div className="bg-gray-100 border-b p-4">
                <h2>Writing a good title</h2>
              </div>
              <div className="p-4">
                <p>Your title should summarize the problem.</p>
                <p>
                  You might find that you have a better idea of your title after
                  writing out the rest of the question.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-white col-span-3 md:col-span-2 mb-6">
          <h2 className="text-xl font-medium ">Tags</h2>
          <p>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </p>
          <input
            className="input mb-4"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onFocus={() => {
              setNote("tags");
            }}
            type="text"
          />
          <div className="flex flex-wrap">
            {tags &&
              tags.split(" ").map((tag) => {
                if (tag) return <span className="tag mr-2 mb-2">{tag}</span>;
              })}
          </div>
        </div>
        {note === "tags" ? (
          <div className="col-span-3 md:col-span-1 mb-6 relative">
            <div className="md:absolute md:top-0 md:left-0 md:right-0 h-fit border rounded-lg">
              <div className="bg-gray-100 border-b p-4">
                <h2>Adding tags</h2>
              </div>
              <div className="p-4">
                <p>
                  Tags help ensure that your question will get attention from
                  the right people.
                </p>
                <p>
                  Tag things in more than one way so people can find them more
                  easily. Add tags for product lines, projects, teams, and the
                  specific technologies or languages used.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex">
        <button onClick={handleSubmit} className="button mr-4">
          Post your question
        </button>
        <button className="button bg-gray-100 hover:bg-red-100 text-black">
          Save draft
        </button>
      </div>
    </div>
  );
}
