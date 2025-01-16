import React, { useEffect, useState } from "react";
import axios from "axios";

function EditProfile(){
    const [info, setInfo] = useState({}); // Store user info
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode

    useEffect(() => {
        handleUserInfo();
    }, []);

    const handleUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:3000/CupnCrave/profile/user-info", {
                withCredentials: true,
            });
            setInfo(response.data.user);
        } catch (error) {
            console.error("Error fetching Info:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSave = async () => {
        try {
            await axios.put("http://localhost:3000/CupnCrave/profile/user-info", info, {
                withCredentials: true,
            });
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return(
        <div className="profile-info">
            <div className="profile-heading">
                <img src="../images/profile-info.png" alt="profile-icon" />
                <h1>Profile Information</h1>
            </div>
            <div className="profile-content">
                <p>
                    <strong>Name:</strong>{" "}
                    <input
                        type="text"
                        name="name"
                        value={info.name || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="type1"
                    />
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    <input
                        type="email"
                        name="email"
                        value={info.email || ""}
                        className="type1"
                        disabled // Email is always disabled
                    />
                </p>
                <p>
                    <strong>Phone:</strong>{" "}
                    <input
                        type="text"
                        name="number"
                        value={info.number || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="type1"
                    />
                </p>
                <p>
                    <strong>Gender:</strong>{" "}
                    <input
                        type="text"
                        name="gender"
                        value={info.gender || ""}
                        onChange={handleInputChange}
                        disabled
                        className="type1"
                    />
                </p>
                <p>
                    <strong>DOB:</strong>{" "}
                    <input
                        type="text"
                        name="dob"
                        value="8 Oct,2003" // Example value; replace with actual state value if needed
                        disabled
                        className="type1"
                    />
                </p>
                <p>
                    <strong>Address:</strong>{" "}
                    <input
                        type="text"
                        name="address"
                        value={info.address || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="type1"
                    />
                </p>
                
            </div>

            {/* Edit and Save Buttons */}
            <div className="profile-buttons">
                {isEditing ? (<>
                    <button onClick={toggleEdit} >Cancel</button>
                    <button onClick={handleSave} className="saveEdit">Save</button>
                    </>
                ) : (
                    <button onClick={toggleEdit}>Update Profile</button>
                )}
            </div>
            
        </div>
    )
}

export default EditProfile;