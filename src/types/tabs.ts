export type TabValues = "reading" | "quiz";

export type TabsType = {
  activeTab: TabValues;
  setActiveTab: React.Dispatch<React.SetStateAction<TabValues>>;
};
