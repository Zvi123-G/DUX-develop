import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    tour_name: '',
    pic_url: '',
    language: ''
  });

  const [searchData, setSearchData] = useState({});

  const [jsonData, setData] = useState(null);

  const fetchData = () => {
    fetch('/api/tours')
     .then((response) => response.json())
     .then((jsonData) => {
      setData(jsonData);
     })
     .catch((error) => {
      console.error('Error fetching data:', error);
     });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/submit-tour', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tour_name: formData.tour_name,
        pic_URL: formData.pic_url, // Adjusted key to match server expectation
        language: formData.language,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Reset form data after submission
    setFormData({
      tour_name: '',
      pic_url: '',
      language: ''
    });
  };

  
  const handleSearchSubmit = (e) => {
    console.log('searchData:', searchData.language);
    e.preventDefault();
    fetch(`/api/tours/${searchData.language}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const boxStyle = {
    backgroundColor: '#11c1ff',
    border: '2px solid #ccc',
    padding: '20px',
    textAlign: 'center',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    boxSizing: 'border-box',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };
  
  const imgStyle = {
    width: '100%',
    height: '50%',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '10px',
  };

  // Dynamically render the tour boxes
  const renderTourBoxes = () => {
    if (!jsonData) {
      return <p>Loading...</p>;
    }
    if (jsonData.length === 0) {
      return <p>No tours available.</p>;
    }
    console.log(jsonData);
    // Map through the jsonData and create a box for each tour
    return jsonData[0].map((tour) => (
      <div key={tour.id} className="box" style={boxStyle}>
        <img 
          src={tour.pic_url} 
          alt={tour.tour_name} 
          style={imgStyle} 
        />
        <h3>Tour: {tour.tour_name}</h3>
        <p>Language: {tour.language}</p>
      </div>
    ));
  };

  return (
    <div className="container" style={{
      display: 'flex',
      height: '100vh',
      margin: 0,
      padding: 0
    }}>
      <div className="left" style={{
        flex: 6,
        backgroundColor: '#3feff0',
        padding: '20px'
      }}>
        <h1 style={{ textAlign: 'center' }} >DUX Travel</h1> <br/>
        <form onSubmit={handleSearchSubmit}>
           <select
              name="language"
              value={searchData.language}
              onChange={handleSearchChange}>
              <option> Search by language </option>
              <option value="Hebrew">Hebrew</option>
              <option value="Arabic">Arabic</option>
              <option value="Russian">Russian</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Amharic">Amharic</option>
              <option value="Yiddish">Yiddish</option>
              <option value="Spanish">Spanish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Persian">Persian (Farsi)</option>
              <option value="German">German</option>
              <option value="Hindi">Hindi</option>
              <option value="Chinese">Chinese (Mandarin)</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Turkish">Turkish</option>
              <option value="Italian">Italian</option>
            </select>
          <button style={{ margin: "5px" }} type="submit">Search</button>
        </form>
        <h2 style={{ textAlign: 'left', marginLeft: '30px' }}>Tours</h2>
        <br />
        <div className="Tours boxes" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          padding: '10px',
        }}>
          {renderTourBoxes()}
        </div>
      </div>

      <div className="right" style={{
        flex: 1,
        backgroundColor: '#d2e0ff',
        padding: '20px'
      }}>
        <div className="Tours-website"  style={{ margin: '80px 0px 0px 0px' }}>
          <h2>Add Tour</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="tour_name"
              placeholder="Enter tour"
              value={formData.tour_name}
              onChange={handleChange}
            /><br /><br />

            <input
              type="url"
              name="pic_url"
              placeholder="Enter image URL"
              value={formData.pic_url}
              onChange={handleChange}
            /><br /><br />

            <label htmlFor="language">Tour language:</label><br />
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}>
              <option> Select a language </option>
              <option value="Hebrew">Hebrew</option>
              <option value="Arabic">Arabic</option>
              <option value="Russian">Russian</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Amharic">Amharic</option>
              <option value="Yiddish">Yiddish</option>
              <option value="Spanish">Spanish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Persian">Persian (Farsi)</option>
              <option value="German">German</option>
              <option value="Hindi">Hindi</option>
              <option value="Chinese">Chinese (Mandarin)</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Turkish">Turkish</option>
              <option value="Italian">Italian</option>
            </select><br /><br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default App;

