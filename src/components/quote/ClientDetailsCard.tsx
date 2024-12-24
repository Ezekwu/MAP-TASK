import { QuoteClient } from '@/types/Quote';

import UiInitialsAvatar from '../ui/UiInitialsAvatar';
import UiIcon from '../ui/UiIcon';

interface Props {
  client: QuoteClient;
}

export default function ClientDetailsCard({ client }: Props) {
  const companyNameFirstWord = client.name.split('')[0];
  return (
    <article className="p-4 border border-tertiary-300 rounded-[10px] w-[352px] h-fit">
      <div className="flex gap-2 items-center mb-2">
        <UiIcon icon="Building" />
        <p className="text-xs">Client</p>
      </div>
      <div className="flex items-center gap-3">
        <UiInitialsAvatar size="sm" name={companyNameFirstWord} />
        <div>
          <h3 className="text-sm font-medium text-tertiary-900">
            {client.name}
          </h3>
          <p className="text-xs text-tertiary-600">{client.address}</p>
        </div>
      </div>
    </article>
  );
}
