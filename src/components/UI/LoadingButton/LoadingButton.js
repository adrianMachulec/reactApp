export default function LoadingButton(props) {

    const className = props.className || 'btn-primary'

  return props.loading === 'true' ? (
    <button className={`btn ${className}`} type="button" disabled>
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only visually-hidden">Loading...</span>
      </div>
    </button>
  ) : (
    <button {...props} className={`btn ${className} mt-2`}>{props.children}</button>
  );
}
