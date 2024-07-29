import { ReactNode } from "react"
import { Outlet } from "react-router-dom";

export default function RootLayout(props: { children?: ReactNode }) {
    return <>
        <header>
            <h2 className="text-3xl font-bold">Frontend.</h2>
        </header>
        <main className="py-5">
            {props.children}
            <Outlet />
        </main>
    </>
}