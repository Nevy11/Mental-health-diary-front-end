export interface Ai {
  username: string;
  question: string;
  answer: string;
}
export interface AiUsernameUpdate {
  username: string;
  new_value: string;
}

export interface AIQAUpdate {
  username: string;
  old_value: string;
  new_value: string;
}

export interface AIReadOne {
  username: string;
}

export interface AiReturn {
  id: string;
  username: string;
  question: string;
  answer: string;
}

export interface ReturnAiReadOne {
  data: AiReturn[];
  success: boolean;
  question: string;
  answer: string;
}

export interface ReturnAi {
  username: string;
  question: string;
  answer: string;
  success: string;
  message: string;
  add_message: string;
}

export interface QuestionModel {
  question: string;
}
export interface AnswerModel {
  answer: string;
}
