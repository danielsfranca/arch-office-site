"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const PDFFlipbook = dynamic(() => import("../../components/PDFFlipbook"), { ssr: false });

export default function PortfolioPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black">
            <PDFFlipbook
                file="/portfolio.pdf"
                onClose={() => router.push("/?view=about")}
            />
        </div>
    );
}
