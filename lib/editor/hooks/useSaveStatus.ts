import { atom, useAtom } from "jotai";

type typeSaveStatusEnum = 'Saved' | 'Saving...' | 'Unsaved'

const editorSaveStatusAtom = atom<typeSaveStatusEnum>("Saved")

const useSaveStatus = () => {
    const [saveStatus, setSaveStatus] = useAtom(editorSaveStatusAtom);
    return { saveStatus, setSaveStatus };
}

export default useSaveStatus;