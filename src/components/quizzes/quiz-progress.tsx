import { motion } from "motion/react";

export function QuizProgress({ progress }: { progress: number }) {
  if (!progress) return;
  return (
    <div>
      <motion.div
        id="progress-indicator"
        animate={{ width: progress + "0%" }}
        style={{
          borderRadius: ".125rem",
          height: 10,
          width: progress + "0%",
          backgroundColor: "var(--ring)",
          originX: 0,
        }}
      />
    </div>
  );
}
