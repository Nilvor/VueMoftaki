import swal from "sweetalert2";
import 'animate.css';

export default function (error){
    const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'error',
        iconColor: 'white',
        text: error,
        textColor:'white',
        padding:0,
        background: '#D40061',
        color: 'white',
        position: 'top'
    })
}
