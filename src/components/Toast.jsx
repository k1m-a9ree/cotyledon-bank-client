import useToastStore from '../stores/useToastStore';

function Toast() {
    const toasts = useToastStore(state => state.toasts);

    return (
        <div className="toast toast-bottom toast-end">
            {
                toasts.map((toast) => {
                    const { id, message, type } = toast;
                    return (
                        type == 'success' ? (
                            <div role={type} className={`alert alert-success alert-soft`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : type == 'error' ? (
                            <div role={type} className={`alert alert-error alert-soft`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : type == 'warning' ? (
                            <div role={type} className={`alert alert-warning alert-soft`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : type == 'info' ? (
                            <div role={type} className={`alert alert-info alert-soft`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : (
                            <div role={type} className={`alert alert-soft`} key={id}>
                                <span>{message}</span>
                            </div>
                        )
                    )
                })
            }
        </div>
    )
}
export default Toast;