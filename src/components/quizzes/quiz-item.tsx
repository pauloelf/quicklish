import type { QuizType } from "@/types/quiz";
import { ArrowRight, SquareArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { QuizProgress, ShowResults } from "./";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

interface IQuizItem {
  data: QuizType[] | null;
}

export function QuizItem({ data }: IQuizItem) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const labelsRef = useRef<HTMLLabelElement[]>([]);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const totalQuestions = data?.length || 10;

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const current = document.activeElement;
      const index = labelsRef.current.findIndex((el) => el === current);

      if (index === -1) return;

      if (["ArrowDown", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const next = (index + 1) % labelsRef.current.length;
        labelsRef.current[next].focus();
        inputsRef.current[next].checked = true;
        setSelectedOption(next);
      }

      if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        const prev =
          (index - 1 + labelsRef.current.length) % labelsRef.current.length;
        labelsRef.current[prev].focus();
        inputsRef.current[prev].checked = true;
        setSelectedOption(prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleContinue = () => {
    if (currentQuestion < 10) {
      setConfirmed(false);
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
    handleCalculateCorrectAnswers();
  };

  const handleCalculateCorrectAnswers = () => {
    if (data) {
      const { answer } = data[currentQuestion - 1];
      const option = data[currentQuestion - 1].options[selectedOption!];

      if (answer === option) {
        setCorrectAnswers((prev) => prev + 1);
      }
    }
  };

  const reset = () => {
    setCorrectAnswers(0);
    setCurrentQuestion(1);
    setSelectedOption(null);
    setShowResults(false);
    setConfirmed(false);
  };

  if (!data) return;
  return (
    <motion.article
      variants={variants}
      initial="hidden"
      animate="show"
      className="quiz-item"
      aria-label={`Card de quiz sobre: ${id}`}
    >
      <motion.button
        className="button-back"
        aria-label="Voltar para página principal"
        onClick={() => navigate("/")}
      >
        <SquareArrowLeft size={40} />
      </motion.button>
      <motion.section
        variants={subVariants}
        className="quiz-item-info"
        aria-label={`Progressão do quiz: questão ${currentQuestion} de ${totalQuestions}`}
      >
        <QuizProgress progress={currentQuestion} />
        <span className="quiz-item-badge" aria-hidden aria-atomic role="status">
          {currentQuestion} de {totalQuestions}
        </span>
      </motion.section>
      {data.map((question, index) => {
        if (currentQuestion !== index + 1) return;

        if (showResults) {
          return (
            <ShowResults
              key={question.answer}
              result={correctAnswers}
              reset={reset}
            />
          );
        }
        return (
          <motion.section
            key={question.question}
            variants={subVariants}
            className="quiz-item-question"
            aria-labelledby="quiz-question"
          >
            <h1 id="quiz-question">{question.question}</h1>
            <motion.ul
              variants={variants}
              className="quiz-item-options"
              aria-label="Lista de opções"
            >
              {question.options.map((option, i) => (
                <motion.li
                  key={option}
                  variants={itemVariants}
                  className="quiz-item-option"
                >
                  <input
                    id={option}
                    type="radio"
                    value={option}
                    checked={!confirmed && selectedOption == i}
                    onChange={() => !confirmed && setSelectedOption(i)}
                    name="option"
                    data-option={
                      confirmed && option === question.answer
                        ? "correct"
                        : confirmed &&
                          option === question.options[selectedOption!]
                        ? "incorrect"
                        : confirmed && "null"
                    }
                    aria-selected={selectedOption == i ? "true" : "false"}
                    ref={(el) => {
                      if (el) inputsRef.current[i] = el;
                    }}
                  />
                  <label
                    htmlFor={option}
                    ref={(el) => {
                      if (el) labelsRef.current[i] = el;
                    }}
                    tabIndex={confirmed ? undefined : 0}
                    onClick={() => !confirmed && setSelectedOption(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedOption(i);
                      }
                    }}
                    aria-label={option}
                  >
                    {option}
                  </label>
                </motion.li>
              ))}
            </motion.ul>
            {confirmed ? (
              <button className="quiz-item-btn-next" onClick={handleContinue}>
                <span>{currentQuestion < 10 ? "Próxima" : "Resultado"}</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                className="quiz-item-btn-confirm"
                onClick={() => setConfirmed(true)}
                disabled={selectedOption === null}
              >
                Confirmar
              </button>
            )}
          </motion.section>
        );
      })}
    </motion.article>
  );
}
