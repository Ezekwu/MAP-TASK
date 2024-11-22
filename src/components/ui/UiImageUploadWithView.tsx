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
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof props.value === 'string' ? props.value : null,
  );

  const validatedValue = useMemo(() => {
    if (typeof props.value === 'string') return null;

    return props.value;
  }, [props.value]);

  return (
    <div className="relative h-full">
      <UiImagePreview img={previewUrl} />

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <UiImageUploader
          name={props.name}
          onSetPreviewUrl={(val) => setPreviewUrl(val)}
          onChange={props.onChange}
          value={validatedValue}
        />
      </div>
    </div>
  );
}
