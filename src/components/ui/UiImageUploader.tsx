import React, { useState, useRef, useEffect, useMemo } from 'react';
import UiButton from './UiButton';
import UiField from './UiField';
import UiOrSeperator from './UiOrSeperator';
import UiIcon from './UiIcon';

interface Props {
  name: string;
  label?: string;
  error?: string;
  acceptMultiple?: boolean;
  children?: (props: {
    openFilePicker: () => void;
    imgUrl: string;
  }) => React.ReactNode;
  value: File | File[] | string | string[] | null | undefined;
  onChange: (event: { name: string; value: File | File[] }) => void;
}
export default function UiImageUploader({
  label,
  acceptMultiple,
  error,
  name,
  children,
  onChange,
  value,
}: Props) {
  const [imgUrl, setImgUrl] = useState<string | string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = Array.from(event.dataTransfer.files); // Convert FileList to Array

    if (droppedFiles.length > 0) {
      const updatedFiles = [
        ...(Array.isArray(value) && value.every((item) => item instanceof File)
          ? value
          : []),
        ...droppedFiles,
      ];
      if (updatedFiles.length > 4) {
        return;
      }
      onChange({ name, value: updatedFiles as File[] });
    }
  };

  const handleFilePicker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = event.target.files!;

    if (!pickedFiles || pickedFiles.length === 0) {
      return;
    }
    if (!acceptMultiple) {
      const pickedFile = pickedFiles[0];
      onChange({ name, value: pickedFile });
    } else {
      if (pickedFiles.length > 5) {
        console.log('You cannot upload more than 4 images');

        return;
      }
      const dataToSend = {
        name,
        value: [...pickedFiles],
      };
      onChange(dataToSend);
    }
  };

  async function readFilegpt(file: File): Promise<string | null> {
    const reader = new FileReader();
    return new Promise<string | null>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  async function readFiles(files: File[]): Promise<(string | null)[]> {
    const readFilePromises = files.map((file) => readFilegpt(file));
    return Promise.all(readFilePromises);
  }

  async function readFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let fileUrl: string | null = null;
    return new Promise((resolve) => {
      reader.onload = () => {
        fileUrl = reader.result as string;
        resolve(reader.result);
      };
    }).then(() => {
      return (fileUrl as string) || null;
    });
  }

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const defaultComponent = useMemo(() => {
    return (
      <div>
        <div
          className={`border border-dashed   rounded-lg flex items-center flex-col text-center ${
            !!error
              ? 'bg-danger-50  border-danger-500'
              : `bg-white border-gray-400`
          }`}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          {imgUrl.length > 0 ? (
            <div className="">
              {Array.isArray(imgUrl) ? (
                <div
                  className={`grid ${
                    imgUrl.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {imgUrl.map((url) => (
                    <img
                      className="object-cover w-full h-full"
                      src={url as string}
                      alt=""
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={imgUrl as string}
                  alt=""
                  className="rounded-lg w-full h-full object-cover"
                />
              )}
            </div>
          ) : (
            <div className="p-12 text-center ">
              <div className="flex flex-col justify-center items-center text-center">
                <div className="flex items-center justify-center bg-secondary-100 w-14 h-14 rounded-full mb-4">
                  <UiIcon icon="CloudUpLoad" size="32" />
                </div>
                <div className="text-gray-1000 text-base mt-2 gap-1">
                  <p className="text-sm flex justify-center items-center gap-1 font-medium text-tertiary-600">
                    <button className="text-primary-500">
                      Click to Upload
                    </button>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs text-tertiary-350">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  <div className="mt-6">
                    <UiOrSeperator />
                  </div>
                  <div className="mx-auto w-fit mt-11">
                    <UiButton
                      variant="secondary"
                      onClick={openFilePicker}
                      type="button"
                    >
                      Browse Files
                    </UiButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {imgUrl.length > 0 && (
          <UiButton type="button" onClick={openFilePicker} variant="secondary">
            Change image
          </UiButton>
        )}
      </div>
    );
  }, [handleDrop, openFilePicker, handleDrop, imgUrl, error]);

  useEffect(() => {
    if (value instanceof File) {
      (async () => {
        const file = await readFile(value);
        if (file) setImgUrl(file);
      })();
    } else if (Array.isArray(value)) {
      if (value.every((item) => item instanceof File)) {
        (async () => {
          const file = await readFiles(value as File[]);

          if (file) setImgUrl(file as string[]);
        })();
      } else {
        setImgUrl(value as string[]);
      }
    } else if (typeof value === 'string') {
      setImgUrl(value);
    }
  }, [value]);

  return (
    <UiField label={label} error={error}>
      {(children &&
        children({
          imgUrl: imgUrl as string,
          openFilePicker,
        })) ||
        defaultComponent}
      <input
        ref={fileInputRef}
        type="file"
        id="fileInput"
        accept="image/*"
        max={4}
        style={{ display: 'none' }}
        multiple={acceptMultiple}
        onChange={handleFilePicker}
      />
    </UiField>
  );
}
