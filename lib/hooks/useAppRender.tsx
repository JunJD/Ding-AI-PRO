import {atom, useAtom} from "jotai";

type typeRenderAtom = {
    shouldShowSidebar: boolean,
    shouldShowFrame: boolean,
    shouldShowError: boolean
}

const appRenderAtom = atom<typeRenderAtom>({
    shouldShowSidebar: true,
    shouldShowFrame: true,
    shouldShowError: true
})

const useAppRender = () => {
    const [appRender, setAppRender] = useAtom(appRenderAtom);
    return appRender;
}

export default useAppRender;