import { useEffect, useState } from "react";
import axios from "axios";

function Events() {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/events"
            );

            setEvents(response.data);
        } catch (error) {
            setMessage("Failed to load events");
        }
    };

    const handleRegister = async (eventId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login first");
                return;
            }

            const response = await axios.post(
                "http://localhost:5000/api/registrations",
                { eventId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>TechFest 2026 Events</h1>

            {message && <p>{message}</p>}

            {events.length === 0 ? (
                <p>No events available</p>
            ) : (
                events.map((event) => (
                    <div key={event._id}>
                        <h2>{event.name}</h2>

                        <p>{event.description}</p>

                        <p>Fee: ₹{event.fee}</p>

                        <button onClick={() => handleRegister(event._id)}>
                            Register
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Events;