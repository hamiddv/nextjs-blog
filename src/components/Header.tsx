import useToken from "@/hooks/useToken";
import Link from "next/link";

export const Header = () => {
    const [token, loaded] = useToken();

    if (!loaded) {
        return (
            <header className={"py-4"}>
                <div className={"container mx-auto"}>
                    <div className={"flex items-center justify-center"}>
                        <div className={"animate-spin rounded-full h-8 w-8 border-t-2 border-white"}></div>
                    </div>
                </div>
            </header>
        )
    }


    return (
        <header className={"py-4 px-2"}>
            <div className={"container mx-auto"}>
                <div className={"flex items-center justify-between gap-4 text-xl"}>
                    {
                        token ? (
                            <>
                                <div className={"flex gap-2"}>
                                    <button>
                                        <Link href={"/profile"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>Profile</Link>
                                    </button>
                                    <button>
                                        <Link href={"/createBlog"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>Create Blog</Link>
                                    </button>
                                </div>

                                <div>
                                    <button>
                                        <Link href={"/"}
                                              className={"border text-white py-2 px-4 rounded-lg"}>Home</Link>
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
