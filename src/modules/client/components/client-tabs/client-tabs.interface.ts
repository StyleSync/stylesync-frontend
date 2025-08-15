type TabKey = 'booking' | 'about';

export type ClientTabsProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};
