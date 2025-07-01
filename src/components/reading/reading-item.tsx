import { Link, useNavigate, useParams } from "react-router";
import { ArrowRight, SquareArrowLeft } from "lucide-react";
import type { TopicType } from "@/types/reading";

interface IReadingItem {
  data: TopicType | null;
}

export function ReadingItem({ data }: IReadingItem) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!data) return;
  return (
    <article
      className="reading-item"
      aria-label={`Card de leitura sobre: ${data.title}`}
    >
      <button
        className="button-back"
        aria-label="Voltar para página principal"
        onClick={() => navigate("/")}
      >
        <SquareArrowLeft size={40} />
      </button>
      <section className="reading-item-info" aria-labelledby="reading-info">
        <h1 id="reading-info">{data.title}</h1>
        <p aria-label={data.summary}>{data.summary}</p>
      </section>
      <section
        className="reading-item-structure"
        aria-labelledby="reading-structure"
      >
        <h3 id="reading-structure">Estrutura</h3>
        <div className="reading-item-structure-items">
          {Object.entries(data.structure).map(([key, value]) => {
            if (value instanceof Object) {
              const { singular, plural } = value;

              return (
                <article key={key} aria-label={key}>
                  <p className="reading-item-structure-key" aria-label={key}>
                    {key}
                  </p>
                  <h4>Singular</h4>
                  <p
                    className="reading-item-structure-value"
                    aria-label={singular}
                  >
                    {singular}
                  </p>
                  <h4>Plural</h4>
                  <p
                    className="reading-item-structure-value"
                    aria-label={plural}
                  >
                    {plural}
                  </p>
                </article>
              );
            }

            return (
              <article key={key} aria-label={key}>
                <p className="reading-item-structure-key" aria-label={key}>
                  {key}
                </p>
                <p className="reading-item-structure-value" aria-label={value}>
                  {value}
                </p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="reading-item-usage" aria-labelledby="reading-usage">
        <h3 id="reading-usage">Como Usar</h3>
        <ul
          className="reading-item-usage-items"
          aria-label={`Lista de exemplos de uso com ${data.title}`}
        >
          {data.usage.map((value, index) => (
            <li key={index}>
              <article aria-label={`Exemplo de uso ${index + 1}`}>
                <span className="reading-item-usage-badge" aria-hidden>
                  {index + 1}
                </span>
                <p>{value}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section
        className="reading-item-examples"
        aria-labelledby="reading-examples"
      >
        <h3 id="reading-examples">Exemplos</h3>
        <ul
          className="reading-item-examples-items"
          aria-label={`Lista de exemplos com ${data.title}`}
        >
          {data.examples.map(({ sentence, translation }, index) => (
            <li key={sentence}>
              <article aria-label={`Exemplo ${index + 1}`}>
                <div role="group" aria-labelledby="reading-item-example-en">
                  <span
                    id="reading-item-example-en"
                    className="reading-item-example-badge"
                    aria-hidden
                  >
                    EN
                  </span>
                  <p className="reading-item-example-sentence">{sentence}</p>
                </div>
                <div role="group" aria-labelledby="reading-item-example-pt">
                  <span
                    id="reading-item-example-pt"
                    className="reading-item-example-badge"
                    aria-hidden
                  >
                    PT
                  </span>
                  <p className="reading-item-example-sentence">{translation}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <Link to={`/${id}/quiz`} className="btn-to-quiz">
        <span>Iniciar Exercício</span>
        <ArrowRight size={20} />
      </Link>
    </article>
  );
}
