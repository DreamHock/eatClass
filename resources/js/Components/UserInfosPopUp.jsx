import React from "react";

function UserInfoPopUp({ toggleUserInfoPopUp}) {
    return (
        <>
            <div className={`px-2 py-2`}>
                <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                    Enter you information
                </h3>
                <form className="" action="#">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@email.com"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleUserInfoPopUp}
                            className=" border border-slate-800 text-slate-800 bg-slate-200 hover:bg-slate-300 py-2 rounded flex justify-center items-center w-1/2 h-1/2 self-end"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-full text-sky-800 bg-sky-200 hover:bg-sky-300 border border-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UserInfoPopUp;
