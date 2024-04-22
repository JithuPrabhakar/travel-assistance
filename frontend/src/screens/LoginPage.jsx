import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/userApiSlice";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await login({
        password,
        email,
      }).unwrap();
      navigate("/");
      dispatch(setCredentials({ ...res }));
    } catch (e) {
      alert("Login failed. Enter Valid Details");
    }
  }

  // async function handleLogin(e) {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       "/login",
  //       { email, password },
  //       { withCredentials: true }
  //     );
  //     setUser(data);
  //     alert("Login successful");

  //     setRedirect(true);
  //   } catch (e) {
  //     alert("Login failed");
  //   }
  // }

  // if (redirect) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h2 className="text-4xl text-center mb-4">Login</h2>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?{" "}
            <Link to="/register" className="underline">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
