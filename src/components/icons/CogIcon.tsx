import IconProps from '@/types/IconProps';

export default function CogIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.692 8.50605C14.2303 8.27923 14.4995 8.16581 14.5829 8.04014C14.6663 7.91446 14.6663 7.71341 14.6663 7.31132V6.68891C14.6663 6.28677 14.6663 6.08571 14.5829 5.96002C14.4995 5.83434 14.2303 5.72096 13.692 5.49421C12.6828 5.06912 12.0477 4.0095 12.1672 2.93298C12.2332 2.33889 12.2661 2.04184 12.198 1.90834C12.1299 1.77484 11.955 1.67559 11.6054 1.47707L11.0354 1.15345C10.6893 0.956923 10.5162 0.858661 10.3663 0.868804C10.2163 0.878948 9.98775 1.05326 9.53057 1.40188C8.63551 2.08441 7.36489 2.08438 6.46983 1.40182C6.01266 1.0532 5.78408 0.878883 5.63414 0.868738C5.48421 0.858592 5.31114 0.956856 4.965 1.15338L4.395 1.47701C4.04541 1.6755 3.87061 1.77474 3.80247 1.90821C3.73433 2.04168 3.76725 2.33877 3.83309 2.93294C3.95238 4.00951 3.31683 5.06918 2.30738 5.49425C1.76907 5.72092 1.49992 5.83426 1.41646 5.95995C1.33301 6.08565 1.33301 6.28673 1.33301 6.68891V7.31132C1.33301 7.71345 1.33301 7.91452 1.41645 8.0402C1.49989 8.16589 1.76904 8.27926 2.30736 8.50601C3.31655 8.9311 3.95161 9.99073 3.83212 11.0672C3.76619 11.6613 3.73322 11.9584 3.80135 12.0919C3.86949 12.2254 4.04431 12.3246 4.39395 12.5232L4.96394 12.8468C5.31013 13.0433 5.48322 13.1416 5.63318 13.1314C5.78314 13.1213 6.01166 12.9469 6.46871 12.5983C7.36435 11.915 8.63605 11.915 9.53169 12.5982C9.98875 12.9469 10.2173 13.1212 10.3672 13.1314C10.5172 13.1415 10.6903 13.0433 11.0365 12.8467L11.6065 12.5231C11.9561 12.3246 12.131 12.2253 12.1991 12.0918C12.2673 11.9582 12.2342 11.6612 12.1682 11.0672C12.0485 9.99074 12.6831 8.93116 13.692 8.50605Z"
        fill={props.fillColor}
        stroke={props.strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.3327 7.00008C10.3327 8.28875 9.28801 9.33341 7.99935 9.33341C6.71068 9.33341 5.66602 8.28875 5.66602 7.00008C5.66602 5.71142 6.71068 4.66675 7.99935 4.66675C9.28801 4.66675 10.3327 5.71142 10.3327 7.00008Z"
        stroke={props.strokeColor}
        strokeWidth="1.5"
      />
    </svg>
  );
}