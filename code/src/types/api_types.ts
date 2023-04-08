export interface IChoice {
  id: string;
  title: string;
}

export interface IQuestion {
  id: string;
  title: string;
}

export interface IBodyContent {
  questionId: string,
  questionName: String,
  choiceList: IChoice[]
}
