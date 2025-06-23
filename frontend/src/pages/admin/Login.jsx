import React from "react";

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full">
        <div className="bg-primary rounded-lg shadow-xl overflow-hidden mx-4">
          <div className="p-8">
            <h2 className="text-center text-2xl font-extrabold text-white">
              Admin Zahra Cake & Cookies
            </h2>
            <p className="mt-4 text-center text-white">
              Masuk untuk melanjutkan
            </p>
            <form method="POST" action="#" className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" for="email">
                    Email
                  </label>
                  <input
                    placeholder="Email"
                    className="appearance-none relative block w-full px-3 py-3 border bg-amber-50 rounded-md focus:outline-none focus:ring-none focus:border-amber-300 focus:z-10 sm:text-sm"
                    required=""
                    autocomplete="email"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" for="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border bg-amber-50 rounded-md focus:outline-none focus:ring-none focus:border-amber-300 focus:z-10 sm:text-sm"
                    required=""
                    autocomplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>

              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-secondary focus:outline-none focus:ring-2 cursor-pointer"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-accent text-center">
            <p className="text-slate-100">&copy; 2025 Zahra Cake & Cookies</p>
          </div>
        </div>
      </div>
    </div>
  );
};
