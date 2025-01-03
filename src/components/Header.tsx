import useToken from "@/hooks/useToken";
import Link from "next/link";

export const Header = () => {
    const token = useToken();
    return (
        <header className={"py-4"}>
            <div className={"container mx-auto"}>
                <div className={"flex items-center justify-between gap-4 text-xl"}>
                    {
                        token ? (
                            <>
                                <div>
                                    <button>
                                        <Link href={"/profile"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>Profile</Link>
                                    </button>
                                </div>

                                <div>
                                    <button>
                                        <Link href={"/createBlog"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>Create Blog</Link>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={"flex gap-2 "}>
                                <div>
                                    <button>
                                        <Link href={"/login"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>Login</Link>
                                    </button>
                                </div>
                                <div>
                                    <button>
                                        <Link href={"/signup"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>SignUp</Link>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );
};
