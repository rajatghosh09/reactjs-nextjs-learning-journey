import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { QuizQuestion, QuizState } from "../../../typescript/interface/quizTypes";

const initialState: QuizState = {
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    selectedAnswer: null,
    status: "idle",
};

export const fetchQuizData = createAsyncThunk<
    QuizQuestion[],
    void,
    { rejectValue: string }
>(
    "quiz/fetchQuiz",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://the-trivia-api.com/v2/questions?categories=general_knowledge&difficulty=easy&limit=10"
            );

            if (!response.ok) {
                return rejectWithValue("Failed to fetch quiz data");
            }

            const data: QuizQuestion[] = await response.json();
            console.log("quiz data:", data);

            return data;
        } catch (error) {
            console.error("fetch error:", error);
            return rejectWithValue("Network error occurred");
        }
    }
);

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        answerQuestion(state, action) {
            const current = state.questions[state.currentIndex];

            state.selectedAnswer = action.payload;

            const isCorrect = action.payload === current.correctAnswer;

            if (isCorrect) {
                state.score += 1;
            }

            state.answers.push({
                question: current.question.text,
                correctAnswer: current.correctAnswer,
                userAnswer: action.payload,
                isCorrect,
            });
        },

        nextQuestion(state) {
            state.selectedAnswer = null;
            if (state.currentIndex < state.questions.length - 1) {
                state.currentIndex += 1;
            } else {
                state.status = "completed";
            }
        },

        resetQuiz() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchQuizData.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.status = "idle";
            });
    },
});

export const { answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
