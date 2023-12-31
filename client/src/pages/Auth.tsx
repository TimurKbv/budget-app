import { FC, FormEvent, useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalstorage } from "../helper/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const registrationHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthService.registration({ email, password })      
      if (data) {
        toast.success('Successfully registrated')
        setLogin(prev => !prev)
      }
    } catch (error: any ) {
      console.log(error);
      const err = error.response?.data.message
      toast.error(err.toString())
    }
  }
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthService.login({ email, password })
      if (data) {
        setTokenToLocalstorage('token', data.token)
        toast.success('Successfully logged in')
        dispatch(login(data))
        setLogin(prev => !prev)
        navigate('/')
        
      }
    } catch (error: any ) {
      console.log(error);
      const err = error.response?.data.message
      toast.error(err.toString())
    }
  }

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>

      <form 
        className="flex w-1/3 flex-col mx-auto gap-5"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        <input
          type="text"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            onClick={() => setLogin((prev) => !prev)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setLogin((prev) => !prev)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
