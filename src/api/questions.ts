import { fetcher } from "./fetcher";

function getListQuestions() {
  return fetcher.get("/api/questions");
}

async function getQuestionById(id: any) {
  return fetcher.get(`/api/questions/${id}`);
}

export { getListQuestions, getQuestionById };
