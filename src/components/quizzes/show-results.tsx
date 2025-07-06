import { motion } from "motion/react";
import { Link } from "react-router";

const subVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export function ShowResults({
  result,
  reset,
}: {
  result: number;
  reset: () => void;
}) {
  return (
    <motion.article
      variants={subVariants}
      className="result-container"
      aria-labelledby="result-title"
    >
      <h1 id="result-title">Resultado do Quiz</h1>
      <section className="score-section" aria-labelledby="score-title">
        <h2
          id="score-title"
          style={{
            color:
              result < 4
                ? "var(--incorrect)"
                : result < 7
                ? "var(--secondary)"
                : "var(--correct)",
          }}
          aria-label={`Sua pontuação: ${result} de 10`}
        >
          Sua pontuação
        </h2>
        <div id="score-display" className="score-display" aria-hidden>
          <span id="correct-answers" aria-hidden>
            {result}/
          </span>
          <span id="total-questions" aria-hidden>
            10
          </span>
        </div>
      </section>
      <div className="result-buttons">
        <button onClick={reset}>Tentar Novamente</button>
        <Link to={`/`}>Voltar Ao Menu</Link>
      </div>
    </motion.article>
  );
}
