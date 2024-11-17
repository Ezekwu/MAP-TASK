import { useEffect, useRef } from 'react';
import UiButton from './UiButton';

interface Props {
  name: string;
  value: File | null;
  onChange: (event: { name: string; value: File }) => void;
  setPreviewUrl: (src: string | null) => void;
}

export default function UiImageUploader({
  name,
  value,
  onChange,
  setPreviewUrl,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || !files.length) return;

    onChange({ name, value: files[0] });
  }

  function previewImage() {
    if (!value) return;

    const imgUrl = URL.createObjectURL(value);

    setPreviewUrl(imgUrl);
  }

  useEffect(previewImage, [value]);

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
