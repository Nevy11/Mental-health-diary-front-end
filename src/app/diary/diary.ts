import { Interface } from 'readline';

export interface Diary {
  username: string;
  content: string;
}

export interface DiaryUpdate {
  username: string;
  field: string;
  new_value: string;
}

export interface DiaryReturn {
  username: string;
  content: string;
  message: string;
  success: boolean;
}

export interface DiaryOneData {
  username: string;
}

export interface DiaryExists {
  exists: boolean;
  message: string;
  success: boolean;
}

export interface Date_diary {
  date: string;
}
