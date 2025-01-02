import Link from "next/link";

export const Header = () => {
    return (
        <header className={"py-4"}>
            <div className={"container mx-auto"}>
                <div className={"flex gap-4 text-xl"}>
                    <div>
                        <button>
                            <Link href={"/login"} className={"border text-white py-2 px-4 rounded-lg"}>Login</Link>
                        </button>
                    </div>
                    <div>
                        <button>
                            <Link href={"/signup"} className={"border text-white py-2 px-4 rounded-lg"}>SignUp</Link>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};