import type { CardType } from "@/types/cards";
import { motion } from "motion/react";
import { Link } from "react-router";

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function Card({ type, title, description, href }: CardType) {
  return (
    <motion.li
      variants={cardVariants}
      className="card group-card"
      aria-label={`Card do ${title}`}
    >
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
        <p className="card-description" aria-label={description}>
          {description}
        </p>
      </div>
      <Link
        to={type === "reading" ? `${href}/reading` : `${href}/quiz`}
        className="card-button group-card"
      >
        {type === "reading" && "Iniciar Leitura"}
        {type === "quiz" && "Iniciar Exercício"}
      </Link>
    </motion.li>
  );
}
