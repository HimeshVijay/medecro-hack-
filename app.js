// Importing Express and Path
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT;


let hospitals = [
{ id: 1, name: 'Sahara', location: 'MURAD NAGAR', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 10,occupiedbeds:87, patients: [] },
{ id: 2, name: 'Subhash Hospital', location: 'MURAD NAGAR', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 10,occupiedbeds:87, patients: [] },
{ id: 3, name: 'Healing Care Center', location: 'MURAD NAGAR', opdPatients: 140, generalWard: 38, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 4, name: 'Murad Nagar Health Hub', location: 'MURAD NAGAR', opdPatients: 130, generalWard: 45, emergencyWard: 25, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },
{ id: 5, name: 'New Life Hospital', location: 'MURAD NAGAR', opdPatients: 120, generalWard: 40, emergencyWard: 20, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 6, name: 'Care Center Hospital', location: 'MURAD NAGAR', opdPatients: 145, generalWard: 50, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
{ id: 7, name: 'Hope Clinic', location: 'MURAD NAGAR', opdPatients: 160, generalWard: 48, emergencyWard: 34, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:87, patients: [] },
{ id: 8, name: 'Healthy Life Medical Center', location: 'MURAD NAGAR', opdPatients: 130, generalWard: 42, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },

{ id: 9, name: 'ABC Hospital', location: 'GHAZIABAD', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 10, name: 'Hospital City', location: 'GHAZIABAD', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 11, name: 'Wellness Hospital', location: 'GHAZIABAD', opdPatients: 160, generalWard: 48, emergencyWard: 35, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 12, name: 'Hope Health Clinic', location: 'GHAZIABAD', opdPatients: 130, generalWard: 38, emergencyWard: 29, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },
{ id: 13, name: 'Prime Care Hospital', location: 'GHAZIABAD', opdPatients: 155, generalWard: 45, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 14, name: 'Medilife Hospital', location: 'GHAZIABAD', opdPatients: 140, generalWard: 40, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
{ id: 15, name: 'Royal Care Hospital', location: 'GHAZIABAD', opdPatients: 145, generalWard: 44, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 16, name: 'Healthy Life Hospital', location: 'GHAZIABAD', opdPatients: 135, generalWard: 42, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },

{ id: 17, name: 'KIET Hospital', location: 'NEW YORK', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 18, name: 'State Hospital', location: 'NEW YORK', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 19, name: 'Wellness Medical Center', location: 'NEW YORK', opdPatients: 155, generalWard: 42, emergencyWard: 35, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:87, patients: [] },
{ id: 20, name: 'City Health Clinic', location: 'NEW YORK', opdPatients: 130, generalWard: 38, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },
{ id: 21, name: 'New York General Hospital', location: 'NEW YORK', opdPatients: 160, generalWard: 50, emergencyWard: 40, totalbedsavailable: 100,bedsVacant: 10,occupiedbeds:87, patients: [] },
{ id: 22, name: 'Hopewell Hospital', location: 'NEW YORK', opdPatients: 140, generalWard: 45, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
{ id: 23, name: 'Life Care Hospital', location: 'NEW YORK', opdPatients: 135, generalWard: 38, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 24, name: 'Health First Clinic', location: 'NEW YORK', opdPatients: 145, generalWard: 40, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },

{ id: 25, name: 'Apollo Hospital', location: 'DELHI', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 26, name: 'Kaykalp Hospital', location: 'DELHI', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
{ id: 27, name: 'Medanta Hospital', location: 'DELHI', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87 ,patients: [] },
{ id: 28, name: 'Divine Hospital', location: 'DELHI', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 29, name: 'Life Line Hospital', location: 'DELHI', opdPatients: 155, generalWard: 45, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },
{ id: 30, name: 'Star Multispeciality', location: 'DELHI', opdPatients: 135, generalWard: 43, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 31, name: 'Greenfield Hospital', location: 'DELHI', opdPatients: 140, generalWard: 44, emergencyWard: 31, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:87 ,patients: [] },
{ id: 32, name: 'Shanti Healthcare', location: 'DELHI', opdPatients: 145, generalWard: 46, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87 ,patients: [] },

{ id: 33, name: 'Sunshine Hospital', location: 'MUMBAI', opdPatients: 160, generalWard: 50, emergencyWard: 35, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:87 ,patients: [] },
{ id: 34, name: 'Lotus Medical Center', location: 'MUMBAI', opdPatients: 145, generalWard: 46, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
{ id: 35, name: 'Victory Hospital', location: 'MUMBAI', opdPatients: 170, generalWard: 55, emergencyWard: 38, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },
{ id: 36, name: 'Healing Hands Clinic', location: 'MUMBAI', opdPatients: 135, generalWard: 44, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 37, name: 'Care and Cure Hospital', location: 'MUMBAI', opdPatients: 150, generalWard: 45, emergencyWard: 31, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 38, name: 'City Hope Hospital', location: 'MUMBAI', opdPatients: 160, generalWard: 50, emergencyWard: 33, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:87, patients: [] },
{ id: 39, name: 'Hope Multispeciality', location: 'MUMBAI', opdPatients: 155, generalWard: 48, emergencyWard: 34, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
    { id: 40, name: 'Bright Vision Hospital', location: 'MUMBAI', opdPatients: 165, generalWard: 52, emergencyWard: 38, totalbedsavailable: 100,bedsVacant: 10,occupiedbeds:87, patients: [] },
{ id: 41, name: 'Silverline Hospital', location: 'BANGALORE', opdPatients: 160, generalWard: 50, emergencyWard: 35, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 42, name: 'Global Health Clinic', location: 'BANGALORE', opdPatients: 145, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:87, patients: [] },
{ id: 43, name: 'City Heart Hospital', location: 'BANGALORE', opdPatients: 150, generalWard: 42, emergencyWard: 33, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87 ,patients: [] },
{ id: 44, name: 'Hopewell Hospital', location: 'BANGALORE', opdPatients: 140, generalWard: 38, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:87, patients: [] },
{ id: 45, name: 'Green Valley Medical Center', location: 'BANGALORE', opdPatients: 160, generalWard: 48, emergencyWard: 34, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:87, patients: [] },
{ id: 46, name: 'Life Care Hospital', location: 'BANGALORE', opdPatients: 155, generalWard: 44, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:87, patients: [] },
{ id: 47, name: 'Unity Hospital', location: 'BANGALORE', opdPatients: 135, generalWard: 40, emergencyWard: 29, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:87, patients: [] },
{ id: 48, name: 'Bright Vision Hospital', location: 'BANGALORE', opdPatients: 170, generalWard: 50, emergencyWard: 38, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:94, patients: [] },

{ id: 49, name: 'Sunrise Hospital', location: 'CHENNAI', opdPatients: 160, generalWard: 50, emergencyWard: 36, totalbedsavailable: 100,bedsVacant: 10,occupiedbeds:87, patients: [] },
{ id: 50, name: 'Fortis Medical Center', location: 'CHENNAI', opdPatients: 150, generalWard: 40, emergencyWard: 30, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:93, patients: [] },
{ id: 51, name: 'Wellness Care Clinic', location: 'CHENNAI', opdPatients: 145, generalWard: 38, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:94, patients: [] },
{ id: 52, name: 'Cityline Hospital', location: 'CHENNAI', opdPatients: 155, generalWard: 42, emergencyWard: 33, totalbedsavailable: 100,bedsVacant: 8,occupiedbeds:92, patients: [] },
{ id: 53, name: 'Hope Multispeciality', location: 'CHENNAI', opdPatients: 135, generalWard: 40, emergencyWard: 28, totalbedsavailable: 100,bedsVacant: 5,occupiedbeds:95, patients: [] },
{ id: 54, name: 'Prime Care Clinic', location: 'CHENNAI', opdPatients: 150, generalWard: 45, emergencyWard: 32, totalbedsavailable: 100,bedsVacant: 7,occupiedbeds:93, patients: [] },
{ id: 55, name: 'Golden Health Clinic', location: 'CHENNAI', opdPatients: 165, generalWard: 52, emergencyWard: 38, totalbedsavailable: 100,bedsVacant: 9,occupiedbeds:91, patients: [] },
{ id: 56, name: 'Medicare Center', location: 'CHENNAI', opdPatients: 130, generalWard: 38, emergencyWard: 27, totalbedsavailable: 100,bedsVacant: 6,occupiedbeds:94, patients: [] },

{ id: 57, name: 'Care Plus Hospital', location: 'HYDERABAD', opdPatients: 155, generalWard: 46, emergencyWard: 32, bedsAvailable: 7, patients: [] },
{ id: 58, name: 'Serene Healthcare', location: 'HYDERABAD', opdPatients: 160, generalWard: 50, emergencyWard: 38, bedsAvailable: 9, patients: [] },
{ id: 59, name: 'Royal Hospital', location: 'HYDERABAD', opdPatients: 150, generalWard: 40, emergencyWard: 30, bedsAvailable: 8, patients: [] },
{ id: 60, name: 'Victory Medical Center', location: 'HYDERABAD', opdPatients: 165, generalWard: 48, emergencyWard: 35, bedsAvailable: 6, patients: [] },
{ id: 61, name: 'LifeCare Hospital', location: 'HYDERABAD', opdPatients: 140, generalWard: 45, emergencyWard: 33, bedsAvailable: 7, patients: [] },
{ id: 62, name: 'Green Valley Clinic', location: 'HYDERABAD', opdPatients: 130, generalWard: 38, emergencyWard: 28, bedsAvailable: 5, patients: [] },
{ id: 63, name: 'Silverline Multispeciality', location: 'HYDERABAD', opdPatients: 145, generalWard: 42, emergencyWard: 30, bedsAvailable: 6, patients: [] },
{ id: 64, name: 'Bright Vision Clinic', location: 'HYDERABAD', opdPatients: 170, generalWard: 50, emergencyWard: 38, bedsAvailable: 8, patients: [] },

{ id: 65, name: 'Sunshine Hospital', location: 'KOLKATA', opdPatients: 160, generalWard: 50, emergencyWard: 36, bedsAvailable: 10, patients: [] },
{ id: 66, name: 'Fortis Medical Center', location: 'KOLKATA', opdPatients: 150, generalWard: 40, emergencyWard: 30, bedsAvailable: 7, patients: [] },
{ id: 67, name: 'Wellness Care Clinic', location: 'KOLKATA', opdPatients: 145, generalWard: 38, emergencyWard: 32, bedsAvailable: 6, patients: [] },
{ id: 68, name: 'Cityline Hospital', location: 'KOLKATA', opdPatients: 155, generalWard: 42, emergencyWard: 33, bedsAvailable: 8, patients: [] },
{ id: 69, name: 'Hope Multispeciality', location: 'KOLKATA', opdPatients: 135, generalWard: 40, emergencyWard: 28, bedsAvailable: 5, patients: [] },
{ id: 70, name: 'Prime Care Clinic', location: 'KOLKATA', opdPatients: 150, generalWard: 45, emergencyWard: 32, bedsAvailable: 7, patients: [] },
{ id: 71, name: 'Golden Health Clinic', location: 'KOLKATA', opdPatients: 165, generalWard: 52, emergencyWard: 38, bedsAvailable: 9, patients: [] },
{ id: 72, name: 'Medicare Center', location: 'KOLKATA', opdPatients: 130, generalWard: 38, emergencyWard: 27, bedsAvailable: 6, patients: [] }


];
 //Sample users with their credentials and associated patients
 const statusUsers = {
     admin: { username: 'admin', password: 'hello', patients: ['ramesh'] },
     user1: { username: 'user1', password: 'password1', patients: ['suresh'] },
   //Add more users as needed
 };
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true,
}));

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Middleware to handle sessions and data parsing
 app.use(session({
     secret: 'your_secret_key', // Strong secret key
     resave: false,
     saveUninitialized: true,
 }));

// Route to get hospitals by location
app.get('/api/hospitals', (req, res) => {
    const { location } = req.query;
    const filteredHospitals = hospitals.filter(h => h.location.toLowerCase().includes(location.toLowerCase()));
    res.json(filteredHospitals);
});

// Admit patient route
app.post('/admit', (req, res) => {
    const { hospitalId, patientName, age, illness } = req.body;
    const hospital = hospitals.find(h => h.id == hospitalId);

    if (hospital && hospital.bedsAvailable > 0) {
        hospital.patients.push({ patientName, age, illness });
        hospital.bedsAvailable -= 1;
        res.json({ success: true, message: 'Patient admitted successfully!' });
    } else {
        res.json({ success: false, message: 'No beds available or hospital not found' });
    }
});

// Serve the admit page
app.get('/admit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admit.html'));
});

// // Handle login for patient status
app.post('/status-login', (req, res) => {
    const { username, password } = req.body;

//     // Authenticate user
    const user = Object.values(statusUsers).find(user => user.username === username && user.password === password);

    if (user) {
        req.session.authenticated = true;
        req.session.username = username;
        req.session.patients = user.patients; // Store user-specific patients
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

// // API endpoint to get patient status (protected)
app.get('/api/status', (req, res) => {
    if (req.session.authenticated) {
        // Filter hospitals based on user-specific patients
        const userPatients = req.session.patients;
        const patientData = hospitals.map(hospital => ({
            hospital: hospital.name,
            location: hospital.location,
            patients: hospital.patients.filter(patient => userPatients.includes(patient.patientName))
        }));
        res.json({ success: true, data: patientData });
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




