export interface QuizQuestion {
  id: string;
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  selectedAnswer: string | null;
  answers: {
    question: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
  status: "idle" | "loading" | "completed";
}
