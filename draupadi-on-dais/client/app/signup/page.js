"use client"
import { useRouter } from 'next/navigation';

import { useState } from 'react'; // Import useState hook from React
import Link from 'next/link';

export default function SignUp() {
 
  const router = useRouter();
 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    phoneNo: '',
    website: '',
    linkedIn: '',
    instagram: '',
    twitter: '',
    industry: '',
    organisation: '',
    // role: 'user',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3001/api/v1/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        // Handle success
        
        console.log('User registered successfully');
        router.push('/speakers');
      } else {
        // Handle error
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              If you are a speaker, panellist, thought leader, or knowledge
              expert in your field, sign up to help event organisers find and
              invite you to leadership-level panels and conferences.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="input input-bordered"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="input input-bordered"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  placeholder="Enter your phone number"
                  className="input input-bordered"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Website</span>
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="Enter your website"
                  className="input input-bordered"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">LinkedIn</span>
                </label>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="Enter your LinkedIn profile URL"
                  className="input input-bordered"
                  value={formData.linkedIn}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Instagram</span>
                </label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Enter your Instagram username"
                  className="input input-bordered"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Twitter</span>
                </label>
                <input
                  type="text"
                  name="twitter"
                  placeholder="Enter your Twitter username"
                  className="input input-bordered"
                  value={formData.twitter}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Industry</span>
                </label>
                <input
                  type="text"
                  name="industry"
                  placeholder="Enter your industry"
                  className="input input-bordered"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Organisation</span>
                </label>
                <input
                  type="text"
                  name="organisation"
                  placeholder="Enter your organisation"
                  className="input input-bordered"
                  value={formData.organisation}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-control">
                 <label className="label">
               <span className="label-text">Role</span>
             </label>
               <select
                 name="role"
                 className="select select-bordered"
                  value={formData.role}
                 onChange={handleChange}
                  >             
                 <option value="user">User</option>
                 <option value="speaker">Speaker</option>
                 </select>
                </div> */}

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  SignUp
                </button>
                <div className="divider">OR</div>
                <Link href="/login" className="btn btn-outline">Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


