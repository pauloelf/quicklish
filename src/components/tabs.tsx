import { motion } from "framer-motion";
import type { TabsType, TabValues } from "@/types/tabs";

const tabs = [
  { id: 1, tab: "Leitura", label: "reading" },
  { id: 2, tab: "Exercícios", label: "quiz" },
] as const;

export function Tabs({ activeTab, setActiveTab }: TabsType) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    tab: TabValues
  ) => {
    if (event.key === "Enter") {
      setActiveTab(tab);
    }
  };

  return (
    <ul className="tablist" aria-label="Tabs de Navegação" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.label;

        return (
          <motion.li
            className="tab"
            key={tab.id}
            tabIndex={0}
            role="tab"
            aria-label={`Tab de Navegação para: ${tab.tab}`}
            onKeyDown={(event) => handleKeyDown(event, tab.label)}
            onClick={() => setActiveTab(tab.label)}
            aria-selected={isActive ? "true" : "false"}
            data-state={isActive ? "active" : "inactive"}
          >
            {isActive && (
              <motion.div
                className="cursor"
                layoutId="active-cursor"
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            {tab.tab}
          </motion.li>
        );
      })}
    </ul>
  );
}
