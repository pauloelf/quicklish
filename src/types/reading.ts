export type ExampleType = {
  sentence: string;
  translation: string;
};

export type TopicType = {
  title: string;
  summary: string;
  structure: Record<string, { singular: string; plural: string } | string>;
  usage: string[];
  examples: ExampleType[];
};
