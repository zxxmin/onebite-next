import { ReactNode } from "react"

export default function Layout ({
    children
} : {
    children: ReactNode
}) {
    return <div>
        <div>Seachbar Layout</div>
        {children}
    </div>
}