import { useMemo, useState } from 'react';
import UiImageUploader from './UiImageUploader';
import UiImagePreview from './UiImageView';
import OnChangeParams from '@/types/OnChangeParams';

interface Props {
  value: File | string | null;
  name: string;
  onChange: (params: OnChangeParams) => void;
}
export default function UiImageUploadWithView(props: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validatedValue = useMemo(() => {
    if (typeof props.value === 'string') return null;

    return props.value;
  }, [props.value]);

  return (
    <div className="flex gap-4 items-end">
      <div className="w-full">
        <UiImagePreview img={previewUrl} />
      </div>

      <UiImageUploader
        name={props.name}
        setPreviewUrl={(val) => setPreviewUrl(val)}
        onChange={props.onChange}
        value={validatedValue}
      />
    </div>
  );
}
