const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// REGISTER FOR AN EVENT
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({
                message: "Event ID is required"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existingRegistration = await Registration.findOne({
            user: req.user.id,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        const registration = new Registration({
            user: req.user.id,
            event: eventId
        });

        await registration.save();

        res.status(201).json({
            message: "Successfully registered for the event",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
// GET MY REGISTRATIONS
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const registrations = await Registration.find({
            user: req.user.id
        }).populate("event");

        res.status(200).json(registrations);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;
