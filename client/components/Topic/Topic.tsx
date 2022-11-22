import Link from "next/link";

type Prop = { title: string; slug: string };

const Topic = ({ title, slug }: Prop) => {
  return (
    <div className="mt-2 bg-primary">
      <Link href={`/${slug}`}>{title}</Link>
    </div>
  );
};

export default Topic;
