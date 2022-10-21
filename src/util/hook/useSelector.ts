import { TypedUseSelectorHook, useSelector as originalUseSelector } from 'react-redux';
import type { ROOTSTATE } from 'Store/index';

export const useSelector: TypedUseSelectorHook<ROOTSTATE> = originalUseSelector;
