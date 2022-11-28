export type QuestionType = 'SINGLE' | 'MULTIPLE' | 'TEXT';

export interface SingleOption {
  ans: string;
  value: string;
}

export interface MultipleOption extends SingleOption {}

export type TextOption = string;

export interface Question {
  _id: string;
  content: string;
  options: SingleOption[] | MultipleOption[] | TextOption[];
  type: QuestionType;
  value: string;
}
