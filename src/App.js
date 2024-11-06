import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const App = () => {
  // Reference to the webcam component
  const webcamRef = React.useRef(null);

  // State for storing captured image and detected recipes
  const [capturedImage, setCapturedImage] = useState(null);
  const [recipes, setRecipes] = useState([]);

  // Function to capture a snapshot from the webcam feed
  const captureImage = () => {
    // Capture the screenshot from the webcam feed
    const imageSrc = webcamRef.current.getScreenshot();
    
    // Set the captured image in the state
    setCapturedImage(imageSrc);

    // Call the API to detect food items in the captured image
    detectFood(imageSrc);
  };

  // Function to send captured image to the backend for food detection
  const detectFood = async (imageSrc) => {
    try {
      const response = await axios.post('https://api-endpoint.com/detect', { image: imageSrc });
      
      // Set the recipes received from the backend response
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error detecting food:", error);
    }
  };

  return (
    <div className="App">
      <h2>Food Recognition App</h2>
      
      {/* Display the live webcam feed */}
      <Webcam 
        ref={webcamRef} 
        screenshotFormat="image/jpeg" 
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "environment" // Use back camera if available
        }}
      />

      {/* Button to capture a snapshot from the live feed */}
      <button onClick={captureImage}>Take Snapshot</button>

      {/* Display the captured snapshot */}
      {capturedImage && (
        <div>
          <h3>Captured Image</h3>
          <img src={capturedImage} alt="Snapshot" style={{ width: "300px", marginTop: "10px" }} />
        </div>
      )}

      {/* Display detected recipes from the API */}
      <div>
        <h3>Recipes</h3>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => <p key={index}>{recipe}</p>)
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
