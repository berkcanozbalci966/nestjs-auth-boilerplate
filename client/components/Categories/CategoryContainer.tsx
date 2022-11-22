import { useRouter } from "next/router";
import Category from "./Category";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
  categoryList: Category[];
};

const CategoryContainer = ({ categoryList }: Props) => {
  const router = useRouter();
  const currentCategorySlug = router.query["category"];

  return (
    <div className="flex flex-row justify-center mb-3 bg-primary">
      {categoryList?.map((category: Category) => {
        return (
          <Category
            key={category.id}
            name={category.name}
            slug={category.slug}
            isActive={currentCategorySlug == category.slug}
          />
        );
      })}
    </div>
  );
};

export default CategoryContainer;
