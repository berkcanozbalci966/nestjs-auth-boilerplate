import TopicService from "../services/topic.service";
import { Topic } from "../types/topic.type";
import { AxiosResponse } from "axios";
import { CategoryService } from "../services/category.service";

type GetTopicWithCategorySlug = (
  slug?: string
) => Promise<AxiosResponse<Topic>>;

const topicService = new TopicService();

const categoryService = new CategoryService();

const getTopics: GetTopicWithCategorySlug = async (slug) => {
  if (slug) {
    return await categoryService.getCategoryBySlug(slug);
  }
  return await topicService.getTopics();
};

export default getTopics;
