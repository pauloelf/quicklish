import { motion } from "motion/react";
import { useNavigate } from "react-router";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className="not-found"
    >
      <motion.h1 variants={subVariants} className="title">
        404
      </motion.h1>
      <motion.p variants={subVariants} className="sub-title">
        Algo está faltando.
      </motion.p>
      <motion.p variants={subVariants} className="description">
        Desculpe, não conseguimos encontrar essa página. Você encontrará muito o
        que explorar na página inicial.
      </motion.p>
      <motion.button
        variants={subVariants}
        className="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Voltar à página inicial
      </motion.button>
    </motion.div>
  );
}
