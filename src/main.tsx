import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App";
import "@/App.css";
import QuizPage from "./pages/Quiz";
import ReadingPage from "./pages/Reading";
import NotFoundPage from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<App />} />
        <Route path="/:id/reading" element={<ReadingPage />} />
        <Route path="/:id/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
