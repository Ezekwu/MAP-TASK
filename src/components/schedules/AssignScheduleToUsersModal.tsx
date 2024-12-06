import { useTranslation } from 'react-i18next';
import UiModal from '../ui/UiModal';
import UiSearchInput from '../ui/UiSearchInput';
import { useMemo, useState } from 'react';
import { useUsersQuery } from '@/api/query/useUsersQuery';
import UiScrollableTabs from '../ui/UiScrollableTabs';
import Plans from '@/types/enums/Plans';
import UiIconCheckMark from '../ui/UiIconCheckmark';

// ---

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function AssignScheduleToUsersModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string | null>('');
  const [selectedCategory, setSelectedCategory] = useState<Plans | null>(null);

  const {} = useUsersQuery();

  const planOptions = useMemo(() => {
    return Object.values(Plans).map((plan) => ({
      label: (
        <div className="flex gap-3">
          <span>{t(`plans.${plan}`)}</span>
          <UiIconCheckMark value={plan === selectedCategory} />
        </div>
      ),
      value: plan,
    }));
  }, [selectedCategory]);

  return (
    <UiModal
      isOpen={isOpen}
      title={t('modals.assign-users-to-schedule.title')}
      onClose={onClose}
    >
      <div className="p-4 border-b border-[#E3E3E8]">
        <UiSearchInput
          placeholder={t('placeholders.search-users')}
          onSearch={setSearchQuery}
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm text-[#585B5A] mb-4">
          {t('titles.user-groups')}
        </h2>
        <UiScrollableTabs
          items={planOptions}
          onSelect={(selected) => setSelectedCategory(selected as Plans)}
        />
      </div>
    </UiModal>
  );
}
