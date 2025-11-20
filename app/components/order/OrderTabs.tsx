'use client';

interface OrderTabsProps {
  activeTab: 'all' | 'ongoing' | 'completed';
  onTabChange: (tab: 'all' | 'ongoing' | 'completed') => void;
  allCount: number;
  ongoingCount: number;
  completedCount: number;
}

export default function OrderTabs({
  activeTab,
  onTabChange,
  allCount,
  ongoingCount,
  completedCount,
}: OrderTabsProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => onTabChange('all')}
        className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
          activeTab === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-150'
        }`}
      >
        All Orders
      </button>

      <button
        onClick={() => onTabChange('ongoing')}
        className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
          activeTab === 'ongoing'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-150'
        }`}
      >
        Ongoing ({ongoingCount})
      </button>

      <button
        onClick={() => onTabChange('completed')}
        className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
          activeTab === 'completed'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-150'
        }`}
      >
        Completed
      </button>
    </div>
  );
}
