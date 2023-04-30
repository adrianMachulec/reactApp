export default function LoadingButton(props) {

    const className = props.className || 'btn-primary'

    const buttonProps = {...props}
    delete buttonProps.loading

  return props.loading ? (
    <button className={`btn ${className}`} type="button" disabled>
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only visually-hidden">Loading...</span>
      </div>
    </button>
  ) : (
    <button {...buttonProps} className={`btn ${className} mt-2`}>{props.children}</button>
  );
}
