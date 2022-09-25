import Layout from "../layouts/layout";
import { ReactElement, useEffect } from "react";
import HttpClient from "../utils/http-client";
import useAuth from "../hooks/useAuth";
const httpClient = new HttpClient();
export default function Home() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    async function getProfile() {
      const response = await httpClient.get("/auth/profile");
      setAuth((prev: any) => {
        return { ...prev, ...response };
      });
    }

    getProfile();
  }, []);

  return (
    <div className="hero h-500 bg-base-200">
      {JSON.stringify(auth, null, 2)}

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
