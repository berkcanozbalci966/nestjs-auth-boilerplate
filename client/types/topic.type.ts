export type Topic = {
  categoryId: number;
  id: number;
  name: string;
  slug: string;
};

export type EntryType = {
  created_at: string;
  message: string;
  user: { username: string };
};

export type TopicDetailType = {
  name: string;
  id: number;
  Entrys: EntryType[];
};
