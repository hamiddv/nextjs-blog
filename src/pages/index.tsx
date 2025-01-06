// Import necessary modules
import {Header} from "@/components/Header";
import {BlogList} from "@/components/BlogList";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import {BlogType} from "@/types/BlogType";
import Link from "next/link";


export async function getServerSideProps() {
    await connectToDatabase();
    const blogs = await Blog.find().limit(5);

    return {
        props: {
            blogs: JSON.parse(JSON.stringify(blogs)),
        },
    };
}


export default function Home({blogs}: { blogs: BlogType[] }) {
    return (
        <>
            <section>
                <div className={"container mx-auto text-white"}>
                    <h2 className={"text-3xl text-center mt-8"}>
                        Last Published Blogs
                    </h2>
                    <BlogList blogs={blogs}/>
                    <div className={"text-center mt-8"}>
                        <Link className={"border py-2 px-4 rounded-lg"} href={"/blogs"}>see more ...</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
