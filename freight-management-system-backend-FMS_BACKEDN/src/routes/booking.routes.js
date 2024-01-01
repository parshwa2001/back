const  express = require("express");
const { createBooking  , getAllBookings , getBookingById , updateBookingById , deleteBookingById} = require("../controller/bookings/bookingController");

const   router = express.Router();



router.post("/" , createBooking)
router.get("/" , getAllBookings)
router.get('/:id', getBookingById)
router.put('/:id', updateBookingById)
router.delete('/:id', deleteBookingById)

module.exports = router;
