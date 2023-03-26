import { useEffect, useState } from "react";

const DurationInterval = ({ selectedService, dayServices }) => {
    const [completeSelectedService, setCompleteSelectedService] = useState("");

    useEffect(() => {
        setCompleteSelectedService(
            dayServices.find((service) => service.id == selectedService)
        );
    }, [selectedService]);

    return (
        <div className="day-container">
            {completeSelectedService
                ? Array.from(
                      {
                          length:
                              completeSelectedService.duration /
                              completeSelectedService.interval,
                      },
                      (_, index) => index + 1
                  ).map((_, index) => {
                      return (
                          <div className="day">
                              {completeSelectedService.interval}
                          </div>
                      );
                  })
                : "hello"}
        </div>
    );
};

export default DurationInterval;
