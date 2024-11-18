import { useEffect, useRef } from 'react';
import UiButton from './UiButton';

interface Props {
  name: string;
  value: File | null;
  onChange: (event: { name: string; value: File }) => void;
  onSetImgSrc: (src: string | null) => void;
}

export default function UiImageUploader({
  name,
  value,
  onChange,
  onSetImgSrc,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      onSetImgSrc(null);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files;

    if (!selectedFile) return;

    onChange({ name, value: selectedFile[0] });
  }

  function previewImage() {
    if (!value) return;

    const imgUrl = URL.createObjectURL(value);
    onSetImgSrc(imgUrl);
  }

  useEffect(previewImage, [value]);

  return (
    <div>
      <UiButton
        size="lg"
        rounded="md"
        type="button"
        onClick={openFilePicker}
        variant="tertiary"
        block={false}
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
    </div>
  );
}
