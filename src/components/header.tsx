import type { TabsType } from "@/types/tabs";
import { Tabs } from "./tabs";

export function Header({ activeTab, setActiveTab }: TabsType) {
  return (
    <header className="header" aria-label="Cabeçalho">
      <nav aria-label="Menu de navegação">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </nav>
    </header>
  );
}
