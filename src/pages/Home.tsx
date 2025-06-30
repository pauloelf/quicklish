import { useState } from "react";
import { Reading } from "@/components/reading";
import { Header } from "@/components/header";
import type { TabValues } from "@/types/tabs";
import { Quizzes } from "@/components/quizzes";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabValues>("reading");

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main
        aria-label={`Conteúdo Principal: ${
          activeTab === "reading" ? "Leitura" : "Exercícios"
        }`}
      >
        {activeTab === "reading" ? <Reading /> : <Quizzes />}
      </main>
    </>
  );
}
