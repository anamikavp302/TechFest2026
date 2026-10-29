import { useEffect, useState } from "react";
import axios from "axios";

function MyRegistrations() {
    const [registrations, setRegistrations] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/registrations/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRegistrations(response.data);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to load registrations"
            );
        }
    };

    return (
        <div>
            <h1>My Registrations</h1>

            {message && <p>{message}</p>}

            {registrations.length === 0 ? (
                <p>You have not registered for any events.</p>
            ) : (
                registrations.map((registration) => (
                    <div key={registration._id}>
                        {registration.event ? (
                            <>
                                <h2>{registration.event.name}</h2>

                                <p>
                                    Category: {registration.event.category}
                                </p>

                                <p>
                                    Fee: ₹{registration.event.fee}
                                </p>

                                <p>
                                    Seats: {registration.event.seats}
                                </p>

                                <p>
                                    Date:{" "}
                                    {new Date(
                                        registration.event.date
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    Registered on:{" "}
                                    {new Date(
                                        registration.registrationDate
                                    ).toLocaleDateString()}
                                </p>
                            </>
                        ) : (
                            <p>Event no longer available.</p>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default MyRegistrations;