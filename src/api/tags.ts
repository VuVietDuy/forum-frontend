import { fetcher } from "./fetcher";

function getAllTags() {
  return fetcher.get("/api/tags");
}

export { getAllTags };
