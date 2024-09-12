import Link from "next/link";
import { ReactNode } from "react";
import style from './global-layout.module.css'

export default function GlobalLayout ({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className={style.container}>
            <header>
                <Link href={'/'}>ONEBITE CINEMA</Link>
            </header>
            <main>{children}</main>
        </div>
    )
}