'use client'

import { atom } from "jotai";

type typeSaveStatusEnum = 'Saved' | 'Saving...' | 'Unsaved'

export const editorSaveStatusAtom = atom<typeSaveStatusEnum>("Saved")