
import Toolbar from "@/components/Toolbar"
import RightToolbars from "@/lib/rightToolbars/RightToolbars"
export default function Header() {

    return (
        <div className="flex justify-between items-center w-full z-10">
            <div className="flex gap-2">
                <Toolbar />
                <Toolbar />
                <Toolbar />
            </div>

            <RightToolbars/>

        </div>
    )
}