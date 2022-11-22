import HttpClient from "./../utils/http-client";

const httpClient = new HttpClient();

export type CreateTopic = {
  categoryId: number;
  name: string;
  message: string;
};

class TopicService {
  async getTopics() {
    return await httpClient.get("/topic");
  }

  async getTopic(slug: string) {
    return await httpClient.get(`/topic/${slug}`);
  }

  async createTopic({ categoryId, name, message }: CreateTopic): Promise<any> {
    return await httpClient.post("/topic", { categoryId, name, message });
  }
}

export default TopicService;
