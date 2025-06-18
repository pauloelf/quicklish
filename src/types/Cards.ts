export type CardType = {
  id?: number;
  type?: "reading" | "quiz";
  title: string;
  description: string;
  href: string;
};
