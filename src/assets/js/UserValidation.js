import swal from "sweetalert2";
import router from "@/router";

var user_id = localStorage.getItem('userId');


export default function UserValidate(action) {
    if (user_id == null) {
        swal.fire({
            width: 300,
            height: 100,
            text: "برای دسترسی به این قسمت ابتدا باید ثبت نام کنید",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D40061',
            cancelButtonColor: '#8b002e',
            confirmButtonText: 'ثبت نام',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push({name: 'LoginPhone'})
            }
        })
    } else {
        router.push({name: action});
    }
}
