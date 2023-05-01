import React from "react";
import PrimaryButton from "./PrimaryButton";

function UserInfoPopUp({
    toggleUserInfoPopUp,
    data,
    setData,
    handleSubmit,
    processing,
}) {
    return (
        <>
            <form className="px-2 py-2" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="mb-2 text-xl font-medium text-slate-800 dark:text-white">
                    Enter your information
                </h3>

                <div className="mb-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-800 dark:text-white"
                    >
                        Full name
                    </label>
                    <input
                        type="text"
                        className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="thomas shelby"
                        required
                        onChange={(e) => setData("name", e.target.value)}
                        value={data.name}
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-800 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@email.com"
                        required
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-800 dark:text-white"
                    >
                        Phone number{" "}
                        <span className=" text-green-500">
                            (For confirmation)
                        </span>
                    </label>

                    <input
                        placeholder="0(6/7)XXXXXXXX"
                        pattern="0[67][0-9]{8}"
                        type="tel"
                        className="bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        onChange={(e) => setData("phone", e.target.value)}
                        value={data.phone}
                    />
                </div>

                <div className="flex gap-2">
                    <PrimaryButton
                        type="button"
                        onClick={toggleUserInfoPopUp}
                        color="slate"
                        className="w-1/2 h-1/2 self-end"
                    >
                        Back
                    </PrimaryButton>
                    <PrimaryButton
                        disabled={processing}
                        type="submit"
                        color="sky"
                        className="focus:ring-4 focus:outline-none active:ring-sky-300 w-full"
                    >
                        Apply
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

export default UserInfoPopUp;
