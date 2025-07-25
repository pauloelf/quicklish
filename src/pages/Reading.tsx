import type { TopicType } from "@/types/reading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ReadingItem, ReadingProgress } from "@/components/reading";

export default function ReadingPage() {
  const [data, setData] = useState<TopicType | null>(null);
  const [error, setError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      fetch(`/data/${id}/text.json`, { cache: "force-cache" })
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch(() => setError(true));
    };
    fetchData();
  }, [id]);

  if (error) navigate("/not-found");
  if (!data) return <p>Carregando...</p>;
  return (
    <main aria-label={`Conteúdo Principal: ${data?.title}`}>
      <ReadingProgress />
      <ReadingItem data={data} />
    </main>
  );
}
