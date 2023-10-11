import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

function SignIn() {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { error, loading } = useSelector((state) => state.user);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const receiveData = await res.json({});
      if (receiveData.success === false) {
        // setLoading(false);
        // setError(receiveData.message);
        dispatch(signInFailure(receiveData.message));
        return;
      }
      // setLoading(false);
      dispatch(signInSuccess(receiveData));
      navigate("/");
    } catch (error) {
      // setError(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  const changehandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="p-3 text-center max-w-lg mx-auto border-2 border-[#345225] rounded-lg mt-[50px]">
      <h1 className="font-semibold text-3xl text-center my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          name="email"
          value={data.email}
          onChange={changehandler}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          name="password"
          value={data.password}
          onChange={changehandler}
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg p-3 uppercase hover:opacity-90 bg-[#345225] text-white"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have a account? </p>
        <Link to="/sign-up">
          <span className="text-[#6f8165]">Sign-Up</span>
        </Link>
      </div>
      {error && <h2 className="text-red-500 mt-5">{error}</h2>}
    </div>
  );
}

export default SignIn;
