import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();

type PostTopic = {
  message: string;
  topicId: number;
};

export class EntryService {
  async createEntry({ message, topicId }: PostTopic) {
    return await httpClient.post("/entry", { message, topicId });
  }
}
