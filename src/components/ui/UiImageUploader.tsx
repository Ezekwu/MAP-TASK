import { useEffect, useRef } from 'react';

import UiButton from './UiButton';

interface Props {
  name: string;
  value: File | null;
  onChange: (event: { name: string; value: File }) => void;
  onSetPreviewUrl: (src: string | null) => void;
}

export default function UiImageUploader({
  name,
  value,
  onChange,
  onSetPreviewUrl,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      onSetPreviewUrl(null);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || !files.length) return;

    onChange({ name, value: files[0] });
  }

  function getPreviewImage() {
    if (!value) return;

    const imgUrl = URL.createObjectURL(value);

    onSetPreviewUrl(imgUrl);
  }

  useEffect(getPreviewImage, [value]);

  return (
    <>
      <UiButton
        size="lg"
        rounded="sm"
        type="button"
        onClick={openFilePicker}
        variant="tertiary"
      >
        <p className="text-xs">{value ? 'Replace Image' : 'Upload Image'}</p>
      </UiButton>
      <input
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
        accept="image/*"
        type="file"
      />
    </>
  );
}
