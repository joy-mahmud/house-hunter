
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    const { user,setUser,setLoading } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'


    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        const status = 'loggedIn'
        const authInfo = { email, password,status }
        axiosPublic.post('/login', authInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.authorization === 'ok') {

                   if (res.data.token) {
                                localStorage.setItem('access-token', res.data.token)
                                
                                setLoading(false)
                                setUser(res.data)
                                navigate(from, { replace: true })
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "You logged in successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                    // axiosPublic.post('/jwt', { email })
                    //     .then(result => {
                    //         // console.log(res.data.token)
                    //         if (result.data.token) {
                    //             localStorage.setItem('access-token', res.data.token)
                    //             setLoading(false)
                    //         }
                    //         setUser(res.data)
                    //         navigate(from, { replace: true })
                    //         Swal.fire({
                    //             position: "top-end",
                    //             icon: "success",
                    //             title: "You logged in successfully",
                    //             showConfirmButton: false,
                    //             timer: 1500
                    //         });
                    //     })
                }
               
            })


    }

    return (
        <div className="flex justify-center items-center">

            <div className="w-1/3 mt-28">
                <h1 className="text-4xl text-center mt-5 mb-3 font-bold">Login Now</h1>
                <form onSubmit={handleSubmit} className='space-y-2' >
                    <div>
                        <label>Email</label><br />
                        <input type="email" name="email" placeholder="Your email" className="input input-bordered w-full " />
                    </div>
                    <div>
                        <label>password</label><br />
                        <input type="password" name="password" placeholder="your password" className="input input-bordered w-full " />
                    </div>


                    <div>
                        <button className="bg-[#57B45B] py-2 rounded-lg outline-none text-center text-white w-full">Sign in</button>
                        <p className="mb-5">Dont have an account ? <Link to='/signup' className="text-[#264E99]">Sign up</Link></p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;
