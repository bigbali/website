import { useDispatch as originalUseDispatch } from 'react-redux';
import type { DISPATCH } from 'Store/index';

export const useDispatch = () => originalUseDispatch<DISPATCH>();
