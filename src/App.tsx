import React, { Component } from "react";
import { Container, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { StyledButtonTrue, StyledButtonFalse } from "./style";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { IStore } from "./reducers";
import { getQuizListItem, giveAnswer } from "./actions/quiz";
import { IQuizListItem } from "./models";
import { getCurrentQuizListItem } from "./selectors/quiz";


interface OwnProps {

}

interface StateProps {
  currentQuizItem?: IQuizListItem;
  currentQuizItemIndex: number;
  quizListLength: number;
  score: number;

}

interface DispatchProps {
  getQuizListItem : typeof getQuizListItem
  giveAnswer: typeof giveAnswer

} 

type Props = StateProps & DispatchProps & OwnProps

export class App extends Component <Props>{

  componentDidMount(){
this.props.getQuizListItem(10, "easy")
  }

  private renderHeader = () => {
    return (<Grid container direction="row" justify="space-between" alignItems="flex-start">
      <Box mt={10} fontWeight="fontWeightBold" fontSize={40} >
        <div style={{ color: "#e55fff" }}>Easy</div>
        <div style={{ color: "#2858fb" }} >Quizy</div>
      </Box>
      <Box mt={10} fontSize={20} className="txt"> Score : {this.props.score} / {this.props.quizListLength}</Box>
    </Grid>)
  }

  private renderQuestionInfo = () => {
const {quizListLength, currentQuizItem, currentQuizItemIndex} = this.props

    return (<Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '40vh' }}>
      <div className="txt question_number">Question N° {currentQuizItemIndex + 1} / {quizListLength} </div>
      <div className="txt question_number"> Category {currentQuizItem!.category} </div>
      <div className="txt" dangerouslySetInnerHTML={{__html: currentQuizItem!.question}}></div>
    </Grid>)
  }

private answerQuestion = (answer: "True" | "False") => () => {
  const isCorrectAnswer = this.props.currentQuizItem!.correct_answer === answer
  this.props.giveAnswer(isCorrectAnswer, this.props.currentQuizItemIndex === this.props.quizListLength - 1)
}
  private renderButton = () => {
    return (
      <Grid container direction="row" alignItems="center" justify="space-evenly" >
        <StyledButtonTrue onClick={this.answerQuestion("True")}>TRUE</StyledButtonTrue>
        <StyledButtonFalse onClick={this.answerQuestion("False")}>FALSE</StyledButtonFalse>
      </Grid>
    )
  }

  render() {
    return (
      <Container maxWidth="lg" >
        {this.renderHeader()}
        {this.props.currentQuizItem && this.renderQuestionInfo()}
        {this.renderButton()}
      </Container >
    );
  }
}

const mapStateToProps = (state: IStore): StateProps => {

  return {
    currentQuizItem: getCurrentQuizListItem(state),
    currentQuizItemIndex: state.quiz.currentQuizItemIndex,
    quizListLength: state.quiz.quizListItem.length,
    score: state.quiz.score
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getQuizListItem: (questionAmount: number, difficulty: "easy" | "medium" | "hard") => dispatch(getQuizListItem(questionAmount, difficulty)),
    giveAnswer: (isCorrectAnswer: boolean, isLastQuestion: boolean)  => dispatch(giveAnswer(isCorrectAnswer, isLastQuestion)),

  }
}

// const mapDispatchToProps:any = {
//   getQuizListItem
// }


export default connect<StateProps, DispatchProps, OwnProps, IStore>(mapStateToProps, mapDispatchToProps)  (App)

