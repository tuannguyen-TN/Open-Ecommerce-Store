import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { StateType } from '../redux/store/store'

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
