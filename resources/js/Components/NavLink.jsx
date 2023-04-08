import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-slate-900 focus:border-indigo-700 '
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 focus:text-slate-700 focus:border-slate-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
