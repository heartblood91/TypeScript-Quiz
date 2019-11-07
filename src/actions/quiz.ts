import { TYPES} from './action-types'
import axios from 'axios'
import {IQuizList} from '../models/index'
import {ThunkDispatch} from "redux-thunk"
import { AnyAction } from 'redux';

export const getQuizListItem = (questionAmount: number, difficulty: "easy" | "medium" | "hard") => {
    return async (dispatch:ThunkDispatch<{},{}, AnyAction>) => {
        const r = await axios.get<IQuizList>(`https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${difficulty}&type=boolean`)
        dispatch({type: TYPES.getQuizListItems, payload: r.data.results})
    }
}

export const giveAnswer = (isCorrectAnswer: boolean, isLastQuestion: boolean) => {
    return async (dispatch:ThunkDispatch<{},{}, AnyAction>) => {
        if (isCorrectAnswer) {
            dispatch({type: TYPES.incrementScore})
        }

        if (!isLastQuestion) {
            dispatch({type: TYPES.setNextQuestion})
        }
    }
}

export const restart = () => {
    return async (dispatch:ThunkDispatch<{},{}, AnyAction>) => {
        dispatch({type: TYPES.restart})
        dispatch(getQuizListItem(10, "easy"))
    }
    }