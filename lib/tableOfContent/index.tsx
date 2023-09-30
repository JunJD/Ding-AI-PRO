import * as Tooltip from '@radix-ui/react-tooltip';
import { Editor } from '@tiptap/core';
import { MouseEvent, useEffect, useState } from 'react';
import useTableOfContents from '../editor/hooks/useTableOfContents';
export default function TableOfContent({ editor }: {
    editor: Editor
}) {
    const [showTooltipIndex, setShowTooltipIndex] = useState<number>(-1);

    // 生成目录hooks
    const [items, setEditor] = useTableOfContents()

    useEffect(() => {
        editor && setEditor(editor)
    }, [editor])

    const handleMouseEnter = (e: MouseEvent, index: number) => {
        const target = e.target as HTMLDivElement
        const { clientWidth, scrollWidth } = target

        const isTruncated = scrollWidth > clientWidth;
        if (isTruncated) {
            setShowTooltipIndex(index)
        } else {
            setShowTooltipIndex(-1)
        }
    }

    const handleMouseLeave = () => {
        setShowTooltipIndex(-1)
    }

    const scrollToHeading = (event: MouseEvent, id: string) => {
        event.stopPropagation(); // 停止事件的传播
        const targetElement = document.querySelector('#' + id); // 获取目标元素
        targetElement && targetElement!.scrollIntoView({ behavior: "smooth" }); // 平滑滚动到目标元素
    };

    return (
        <div className="w-64 mr-4">
            <div className="border-b py-3 mb-3">目录</div>
            <div >
                {items.map((item, index) => {
                    return (
                        <Tooltip.Provider key={item.id + index}>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <div
                                        onClick={(event) => scrollToHeading(event, item.id)}
                                        onMouseEnter={(e) => handleMouseEnter(e, index)}
                                        onMouseLeave={handleMouseLeave}
                                        className="select-none cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis hover:bg-gray-300 hover:text-gray-700 rounded"
                                        style={{ paddingLeft: `${12 * (item.level-1)}px` }}
                                    >{item.text}</div>
                                </Tooltip.Trigger>
                                {showTooltipIndex === index && <Tooltip.Portal>
                                    <Tooltip.Content side='top' collisionPadding={16} className="data-[state=delayed-open]:data-[side=top]:animate-slideUpAndFade text-white rounded bg-gray-800 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
                                        <span>{item.text}</span>
                                        <Tooltip.Arrow className="fill-black" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>}
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    )
                })}

            </div>
        </div>
    )
}

