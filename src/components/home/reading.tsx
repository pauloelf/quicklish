import { motion } from "motion/react";
import { cards } from "@/cards-data";
import { Card } from "@/components/card";

const cardsVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function Reading() {
  return (
    <section id="reading">
      <motion.ul
        variants={cardsVariants}
        initial="hidden"
        animate="show"
        className="cards"
        aria-label="Lista de Cards"
      >
        {cards.map((card) => (
          <Card
            href={card.href}
            title={card.title}
            description={card.description}
            type="reading"
            key={card.id}
          />
        ))}
      </motion.ul>
    </section>
  );
}
