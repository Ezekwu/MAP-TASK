import { useMemo } from 'react';

interface Props {
  img?: string | null;
  children?: null;
}
export default function UiImagePreview(props: Props) {
  const baseStyle = useMemo(() => {
    if (!props.img)
      return 'bg-tertiary-100 min-h-[128px] h-full border-dashed border border-tertiary-700 rounded w-full';

    return '';
  }, [props.img]);

  return (
    <div className={baseStyle}>
      {props.img && <img src={props.img} className="rounded h-60 w-full" />}
    </div>
  );
}
