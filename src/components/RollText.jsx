/** Text that rolls up to a duplicate of itself when its parent link is hovered. */
export default function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll__inner">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  )
}
