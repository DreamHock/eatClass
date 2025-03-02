import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
// import Day from '@/Components/Day';
import { useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function SpecialServices({ restaurant, services, auth }) {
    // const [selectedDays, setSelectedDays] = useState([]);
    // const [showDayForm, setShowDayForm] = useState(false);

    // const { data, setData, post, processing, errors } = useForm({
    //     selectedDates: [],
    //     services: [],
    // });

    // const handleDaySelect = (days) => {
    //     setSelectedDays(days);
    //     if (days && days.length > 0) {
    //         setShowDayForm(true);
    //         setData('selectedDates', days.map(day => format(day, 'yyyy-MM-dd')));
    //     }
    // };

    // const handleServicesSubmit = (services) => {
    //     setData('services', services);
    //     post(route('admin.special-services.store', restaurant.id));
    // };

    return (
        <Authenticated auth={auth}>
            <div className="container mx-auto p-4">
                {/* <h1 className="text-2xl font-bold mb-4">
                Special Services for {restaurant.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <DayPicker
                        mode="multiple"
                        selected={selectedDays}
                        onSelect={handleDaySelect}
                        className="border-0"
                    />
                </div>

                {showDayForm && (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <Day 
                            onSubmit={handleServicesSubmit}
                            initialServices={[]}
                        />
                    </div>
                )}
            </div> */}

                {/* Display existing special services */}
                {/* <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Existing Special Services</h2>
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-4 rounded-lg shadow mb-2">
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-gray-600">
                            Date: {format(new Date(service.date), 'PPP')}
                        </p>
                        <p className="text-sm text-gray-600">
                            Time: {service.from} - {service.to}
                        </p>
                    </div>
                ))}
            </div> */}
            </div>
        </Authenticated>
    );
}
