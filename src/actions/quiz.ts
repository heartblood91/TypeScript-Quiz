import { TYPES} from './action-types'
import axios from 'axios'
import {IQuizList} from '../models/index'

export const getQuizListItem = (questionAmount: number, difficulty: "easy" | "medium" | "hard") => {
return async (dispatch:any) => {
    const r = await axios.get<IQuizList>(`https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${difficulty}&type=boolean`)
    dispatch({type: TYPES.getQuizListItems, payload: r.data.results})
}
}