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
  context: string[];
}
export interface AnswerModel {
  answer: string;
  chat_history_ids: number[];
}

export interface DalotModel {
  question: string;
  context: string[];
}

export interface FlanT5ModelParams {
  question: string;
}

export interface FlanT5ModelReturn {
  question: string;
  answer: string;
}

export interface MistralModelParams {
  question: string;
  messages: any[];
}
