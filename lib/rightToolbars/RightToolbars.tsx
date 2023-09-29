"use client"
import { ChatBubbleIcon, DotsHorizontalIcon, FaceIcon, ImageIcon, ResetIcon, SunIcon } from '@radix-ui/react-icons'
import useSaveStatus from '../editor/hooks/useSaveStatus';

export default function RightToolbars() {
    const { saveStatus } = useSaveStatus();
    return (
        <div className='flex' style={{ gap: '18px' }}>
            <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
                {saveStatus}
            </div>
            {/* <ResetIcon width={24} height={24} className="text-stone-400 cursor-pointer hover:text-stone-800 active:text-stone-600" />
            <ResetIcon width={24} height={24} className="transform scale-x-[-1] text-stone-400 cursor-pointer hover:text-stone-800 active:text-stone-600" /> */}
            <div className='w-auto text-base font-medium cursor-pointer hover:bg-stone-200 p-1 rounded text-center'>Share</div>
            <ChatBubbleIcon width={32} height={32} className='stroke-2 cursor-pointer hover:bg-stone-200 p-1 rounded' />
            <DotsHorizontalIcon width={32} height={32} className='stroke-2 cursor-pointer hover:bg-stone-200 p-1 rounded' />
        </div>
    )
}