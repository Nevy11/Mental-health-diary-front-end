export interface AiDisplay {
  question: string;
}
export interface AiDisplayReturn {
  success: boolean;
  message: string;
  question: string;
  answer: string;
}

export interface ModelAI {
  success: boolean;
  message: string;
  id: number;
  question: string;
  context: string;
}
