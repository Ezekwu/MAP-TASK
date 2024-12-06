import IconProps from '@/types/IconProps';

export default function MealIcon(props: IconProps) {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.04625 3.77703C3.73161 2.42768 5.387 2.05558 6.74366 2.94592C8.10032 3.83626 8.31372 6.30317 10.3333 7.16322C8.17816 9.47183 5.48998 8.63839 4.26175 7.83234C2.90509 6.94201 2.36089 5.12638 3.04625 3.77703Z"
        fill={props.fillColor}
      />
      <path
        d="M5.66667 6.17008C4.07087 5.30548 2.38704 3.80944 1 1.33325M6.74366 2.94592C5.387 2.05558 3.73161 2.42768 3.04625 3.77703C2.36089 5.12638 2.90509 6.94201 4.26175 7.83234C5.48998 8.63839 8.17816 9.47183 10.3333 7.16322C8.31372 6.30317 8.10032 3.83626 6.74366 2.94592Z"
        stroke={props.strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66667 7.33325C1.24062 7.64716 1 8.00351 1 8.38125C1 9.64341 3.68629 10.6666 7 10.6666C10.3137 10.6666 13 9.64341 13 8.38125C13 8.00351 12.7594 7.64716 12.3333 7.33325"
        stroke={props.strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 8.6665C13 11.0509 11.3291 13.143 9.53009 14.3213C9.16016 14.5636 8.72027 14.6665 8.27805 14.6665H5.72195C5.27973 14.6665 4.83984 14.5636 4.46991 14.3213C2.67093 13.143 1 11.0509 1 8.6665"
        stroke={props.strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
