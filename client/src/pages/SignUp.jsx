import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const receiveData = await res.json({});
      if (receiveData.success === false) {
        setLoading(false);
        setError(receiveData.message);
        return;
      }
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          name="username"
          value={data.username}
          onChange={changehandler}
        />
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
        <p>Have a account? </p>
        <Link to="/sign-in">
          <span className="text-[#6f8165]">Sign-In</span>
        </Link>
      </div>
      {error && <h2 className="text-red-500 mt-5">{error}</h2>}
    </div>
  );
}

export default SignUp;
