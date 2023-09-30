import { Editor } from "@tiptap/core"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"

interface tableOfContentsItem {
    level: number,
    id: string,
    text: string
}
type tableOfContentsType = Array<tableOfContentsItem>

const useTableOfContents = () => {
    const [editor, setEditor] = useState<Editor | null>(null)
    const [items, setItems] = useState<tableOfContentsType>([])

    const handleUpdate = useCallback(() => {
        if (!editor) return
        const headings: tableOfContentsType = []
        const transaction = editor.state.tr

        editor.state.doc.descendants((node, pos) => {
            if (node.type.name === 'heading') {
                const id = `heading-${headings?.length + 1}`
                if (node.attrs.id !== id) {
                    transaction.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        id,
                    })
                }
                headings.push({
                    level: node.attrs.level,
                    text: node.textContent,
                    id,
                })
            }
        })
        transaction.setMeta('addToHistory', false)
        transaction.setMeta('preventUpdate', true)

        editor.view.dispatch(transaction)

        setItems(headings)
    }, [editor])

    useEffect(handleUpdate, [editor])

    useEffect(() => {
        if (!editor) {
            return
        }
        editor.on('update', handleUpdate)
        return () => {
            editor.off('update', handleUpdate)
        }
    }, [editor])

    return [items, setEditor] as [tableOfContentsType, Dispatch<SetStateAction<Editor | null>>]
}

export default useTableOfContents