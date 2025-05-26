import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav className="fixed w-full flex h-16 p-4 gap-4 items-center justify-center bg-primary-foreground">
                <Link href="/"><Button variant="link">Home</Button></Link>
                <Link href="/admin/projects"><Button variant="link">Projects</Button></Link>
                <Link href="/admin/skills"><Button variant="link">Skills</Button></Link>
            </nav>
            <div className="pt-16">
                {children}
            </div>
        </div>
    )
}