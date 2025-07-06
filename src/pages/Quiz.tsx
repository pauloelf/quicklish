import { QuizItem } from "@/components/quizzes";
import type { QuizType } from "@/types/quiz";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function QuizPage() {
  const [data, setData] = useState<QuizType[] | null>(null);
  const [error, setError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      fetch(`/data/${id}/quiz.json`, { cache: "force-cache" })
        .then((res) => res.json())
        .then((json) => setData(json.quiz))
        .catch(() => setError(true));
    };
    fetchData();
  }, [id]);

  if (error) navigate("/not-found");
  if (!data) return <p>Carregando...</p>;
  return (
    <main aria-label={`Conteúdo Principal: ${id}`}>
      <QuizItem data={data} />
    </main>
  );
}
