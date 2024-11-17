import { useMemo } from 'react';

interface Props {
  img?: string | null;
  children?: null;
}
export default function UiImagePreview(props: Props) {
  // TODO: restyle this when design is out.
  const baseStyle = useMemo(() => {
    if (!props.img)
      return 'bg-tertiary-100 h-32  border-dashed border border-tertiary-700 rounded w-full';

    return '';
  }, [props.img]);

  return (
    <div className={baseStyle}>
      {/* TODO: style this for different rounded variants */}
      {props.img && <img src={props.img} className="rounded h-60 w-full"></img>}
    </div>
  );
}
