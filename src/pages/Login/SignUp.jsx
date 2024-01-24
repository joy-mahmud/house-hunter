
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Signup = () => {
    const { user, loading, setLoading, setUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {

  
            const currentDate = new Date()
            const day = currentDate.getDate()
            const month = currentDate.getMonth() + 1
            const year = currentDate.getFullYear()
            const userInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                signUpDate: `${year}-${month}-${day}`
            }
            console.log(userInfo)
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {           
                                 console.log(res.data.token)
                                if (res.data.token) {
                                    localStorage.setItem('access-token', res.data.token)
                                    setLoading(false)
                                }
                                setUser(userInfo)

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You registered successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/')
                    }
                })


        

    }


    return (
        <div className="flex justify-center flex-row-reverse items-center">

            <div className="w-1/3 mt-28">
                <h1 className="text-4xl text-center mt-5 mb-3 font-bold">Signup Now</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2' >
                    <div>
                        <label>Name</label><br />
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Your name" className="input input-bordered w-full " />
                        {errors.name && <span className='text-red-600'>Name is required</span>}
                    </div>
                    <div>
                        <label>Email</label><br />
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="Your email" className="input input-bordered w-full " />
                        {errors.email && <span className='text-red-600'>Email is required</span>}
                    </div>
                    <div>
                        <label>password</label><br />
                        <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/ })} name="password" placeholder="your password" className="input input-bordered w-full " />
                        {errors.password?.type === "required" && (
                            <p className='text-red-600'>password is required</p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className='text-red-600'>password must have one uppercase,one lowercase, one special character and one numeric value</p>
                        )}
                    </div>
                    <div>
                        <select defaultValue={'select'} {...register("role", { required: true })} className="select select-bordered w-full ">
                            <option disabled value={'select'}>Register as?</option>
                            <option value={'house_owner'}>House owner</option>
                            <option value={'house_renter'}>House renter</option>
                        </select>

                    </div>


                    <div>
                        <button className="bg-[#57B45B] py-2 rounded-lg outline-none text-center text-white w-full">Sign up</button>
                        <p className="mb-5">Already have an account ? <Link to='/login' className="text-[#264E99]">Login</Link></p>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;