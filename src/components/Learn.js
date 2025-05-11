
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import '../styles/Learn.css';
import Footer from "../components/Footer.js";
import logo from "../assets/privafit-logo.png"
import { Link } from 'react-router-dom';



// listing video categories with search queries


const categories = [
  { label: "Abs", query: "how to get abs fast gym tutorial" },
  { label: "Biceps", query: "bicep workout gym short tutorial" },
  { label: "Fat Loss", query: "how to lose weight in gym" },
  { label: "Back", query: "back exercises gym tutorial" },
  { label: "Legs", query: "leg workout for gym beginners" },
  { label: "Chest", query: "chest workout short tutorial" },
];

const Learn = () => {
  //listing the yotube vids
  const [videos, setVideos] = useState([]); 
  //the current playing video
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  //seelcted category
  const [activeCategory, setActiveCategory] = useState(categories[0].label); 
  //refreshing / moving next page
  const [nextPageToken, setNextPageToken] = useState(null); 
  const [currentQuery, setCurrentQuery] = useState(categories[0].query); 

  

  // Fetching videos from  the YouTube API
  const fetchVideos = async (query, pageToken = '') => {
    try {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(
          query
        )}&type=video&pageToken=${pageToken}&key=${apiKey}`
      );
      const data = await res.json();

      // updating the state with results found
      setVideos(data.items || []);
      setNextPageToken(data.nextPageToken || null);
      //clears the player
      setSelectedVideoId(null);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Load default videos on initial render
  useEffect(() => {
    document.title = `Results for ${currentQuery}`;
    fetchVideos(currentQuery);
  }, [currentQuery]);
  
  

  // Handle category button click
  const handleCategoryClick = (label, query) => {
    // Highlight selected category
    setActiveCategory(label);     
    //updates the query term
    setCurrentQuery(query);
    //fetches videos within the categroty
    fetchVideos(query);          
  };

  // Handle "Refresh" — load next page of results (if available)
  const handleRefresh = () => {
    if (nextPageToken) {
      fetchVideos(currentQuery, nextPageToken);
    } else {
      fetchVideos(currentQuery); // fallback to initial page if no token
    }
  };

  return (
    <div className="learn-container">
      <Link to="/profile">
        <img src={logo} alt="PRIVAFIT logo" className="log-sign-logo" />
      </Link>
      <h2>Fitness Tutorials</h2>
      
      {/* Category selection bar */}
      <div className="category-bar">

        {categories.map((cat) => (
          //fetches video
          <button
            key={cat.label}
            className={`category-btn ${activeCategory === cat.label ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat.label, cat.query)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleRefresh} className="refresh-btn">
           Refresh Videos
        </button>
      </div>
      <br></br>
      {/* Video player appears only when a video is selected */}
      {selectedVideoId && (
        <div className="video-player">
          <YouTube videoId={selectedVideoId} opts={{ width: "100%", height: "390" }} />
        </div>
      )}

      {/* Video list grid */}
      <div className="video-list">
        {videos.map((video) => (
          <div
          //render each video with their thumbnail and title
            key={video.id.videoId}
            className="video-item"
            //click video and sets as the main video
            onClick={() => setSelectedVideoId(video.id.videoId)}
          >
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Learn;
