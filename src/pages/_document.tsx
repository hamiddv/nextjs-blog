import {Html, Head, Main, NextScript} from "next/document";
import {Header} from "@/components/Header";

export default function Document() {
    return (
        <Html lang="en">
            <Head/>
            <body className="bg-[#343541]">
            <Header/>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
