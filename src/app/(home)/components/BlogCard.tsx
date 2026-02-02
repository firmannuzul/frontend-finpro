import Image from "next/image";

const BlogCard = () => {
  return (
    <div className="space-y-2 rounded-xl border p-8">
      <Image src="/globe.svg" alt="thumbnail" width={500} height={300} />
      <p className="w-fit rounded-xl bg-blue-100 px-4 text-sm text-black">
        Category
      </p>
      <h2 className="line-clamp-2 text-lg font-bold">
        Title-Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
        accusamus.
      </h2>
      <p className="text-xs">Date - Author</p>
      <p className="line-clamp-3">
        Description - Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Accusantium illum sit quisquam rem sunt temporibus unde, quo optio
        obcaecati maiores!
      </p>
    </div>
  );
};

export default BlogCard;
