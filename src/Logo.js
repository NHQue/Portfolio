export default function Logo({
  onClick,
  transform = 'translate(40, 45) scale(0.4)',
}) {
  return (
    <g
      transform={transform}
      style={onClick ? { cursor: 'pointer', pointerEvents: 'all' } : {}}
      onClick={onClick}
    >
      <rect x="29" width="50" height="50" fill="#E8B059" />
      <rect x="83" width="18" height="18" fill="#E8B059" />
      <rect y="25" width="25" height="25" fill="#E8B059" />
    </g>
    // <g>
    //   <path
    //     fill="#E8B059"
    //     d="M50.5 61h9v9h-9zM50.5 50.5h9v9h-9zM40 50.5h9v9h-9z"
    //   />
    //   <path
    //     fillRule="evenodd"
    //     clipRule="evenodd"
    //     d="M61 40H50.5v9H61v10.5h9V40h-9z"
    //     fill="#E8B059"
    //   />
    // </g>
  )
}
