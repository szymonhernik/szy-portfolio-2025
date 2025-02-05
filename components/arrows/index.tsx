export function ArrowLeft({ width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 95.05 79.16"
      width={width}
      height={height}
      className=""
    >
      <path
        className="arrow-path "
        d="M42.32,79.16h-12.28L0,39.58,30.04,0h12.28l-20.08,26.29c-1.73,2.31-2.6,4.09-2.6,5.34,0,2.12,1.35,3.18,4.04,3.18h71.36v9.53H23.69c-2.69,0-4.04,1.06-4.04,3.18,0,1.44.87,3.23,2.6,5.34l20.08,26.29Z"
      />
    </svg>
  );
}

export function ArrowRight({ width = 24, height = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className=""
      viewBox="0 0 95.05 79.16"
      width={width}
      height={height}
    >
      <path
        className="arrow-path "
        d="M52.72,0h12.28l30.04,39.58-30.04,39.58h-12.28l20.08-26.29c1.73-2.31,2.6-4.09,2.6-5.34,0-2.12-1.35-3.18-4.04-3.18H0v-9.53h71.36c2.69,0,4.04-1.06,4.04-3.18,0-1.44-.87-3.23-2.6-5.34L52.72,0Z"
      />
    </svg>
  );
}
