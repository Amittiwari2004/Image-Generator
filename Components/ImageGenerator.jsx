import React, { useState, useRef } from 'react';
import '../Components/ImageGenrator.css';
import DefaultImage from "../src/assets/Default_Image.svg";
import axios from 'axios';
  // Renamed the variable to follow camelCase convention

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");  // Changed variable name for clarity
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (!inputRef.current.value) {
      return;
    }

    const apiKey = 'YOUR_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/image-generations';

    try {
      const response = await axios.post(apiUrl,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'Chrome',
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      const generatedImageUrl = data.data[0].url;
      setImageUrl(generatedImageUrl);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="Header">Ai Image <span>Generator</span></div>
      <div className="loading">
        <div className="Image">
          <img
            src={imageUrl === "/" ? DefaultImage : imageUrl}  // Updated variable name
            style={{ width: "300px", height: "300px" }}
            alt="Generated Image"
          />
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} placeholder="Search..." className="search-input" />
        <div className="generate-btn" onClick={imageGenerator}>Generate</div>  {/* Removed unnecessary arrow function */}
      </div>
    </div>
  );
};

export default ImageGenerator;
