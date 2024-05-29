"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useContext } from "react";
// import Auth
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { user, login, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userdata = {
      username,
      email,
      password
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userdata),
      });

      const data = await response.json();
      
      if (response.ok) {
        login("losign time data", data);
        localStorage.setItem("user", JSON.stringify(data.data))
        
        console.log('User loggedIn successfully');
        router.push('/speakers');
      } else {
        console.error('Failed to login user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  useEffect(()=> {
    
  })

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              If you are a speaker, panellist, thought leader or knowledge
              expert in your field, sign up to help event organisers find and
              invite you to leadership-level panels and conferences.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="username"
                  placeholder="username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                <div className="divider">OR</div>
                <Link href={"/signup"} className="btn btn-outline">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
