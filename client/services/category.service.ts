import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();

export class CategoryService {
  async getAllCategories() {
    return await httpClient.get("/category");
  }

  async getCategoryBySlug(slug: string) {
    return await httpClient.get("/category/" + slug);
  }

  async getHomePageCategories() {
    return await httpClient.get("/category/homecategories");
  }
}
