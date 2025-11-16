import useToastStore from '../stores/useToastStore';

function Toast() {
    const toasts = useToastStore(state => state.toasts);

    return (
        <div className="toast toast-bottom toast-end">
            {
                toasts.map((toast) => {
                    const { id, message, type } = toast;
                    return (
                        <div role={ type } className={ `alert alert-${ type } alert-soft` } key={ id }>
                            <span>{ message }</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Toast;