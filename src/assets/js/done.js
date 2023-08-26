import swal from "sweetalert2";
import 'animate.css';


export default function (message){

    swal.fire({
        width:250,
        height:50,
        background: '#009a8d',
        iconColor: 'white',
        color: 'white',
        position: 'top',
        icon: 'success',
        text: message,
        showConfirmButton: true,
        confirmButtonColor: '#447676',
        confirmButtonText: 'تایید',
        padding:0
    }).then((result) => {
        if (result.isConfirmed) {
           window.location.reload()
        }
    })

}
