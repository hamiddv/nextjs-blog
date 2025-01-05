import {router} from "next/client";
import {BlogType} from "@/types/BlogType";

type BlogListProps = {
    blogs: BlogType[]
}

export const BlogList = ({blogs}: BlogListProps) => {
    return (
        <div className={"mt-8"}>
            {
                blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className={"border py-2 px-4 hover:bg-gray-500"}
                        onClick={() => {
                            router.push(`blog/${blog.id}`)
                        }}
                    >
                        <h3 className={"text-2xl mb-2"}>{blog.title}</h3>
                        <div className="max-w-full break-words">
                            {
                                blog.content.length > 200
                                    ? `${blog.content.slice(0, 200)} ...`
                                    : blog.content
                            }
                        </div>
                    </div>

                ))
            }
        </div>
    );
};