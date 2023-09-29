import { MouseEventHandler } from "react";

export default function Toolbar({ className, children, onClick }: { className?: string, children?: React.ReactNode, onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button onClick={onClick} className={`flex items-center justify-center cursor-pointer rounded-lg h-8 w-8 bg-white text-gray-700 border-none shadow active:shadow-active ${className ?? ''}`}>
            {children}
        </button>
    )
}