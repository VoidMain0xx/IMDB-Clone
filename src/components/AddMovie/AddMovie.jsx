import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Image } from 'lucide-react';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    rating: '',
    imageUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/imdb/');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/imdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchMovies();
        setFormData({ title: '', director: '', year: '', rating: '', imageUrl: '' });
      } else {
        console.error('Error response:', await response.json());
      }
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/imdb/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchMovies();
        setFormData({ title: '', director: '', year: '', rating: '', imageUrl: '' });
        setIsEditing(false);
        setEditId(null);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/imdb/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMovies();
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setEditId(movie.id);
    setFormData({
      title: movie.title,
      director: movie.director,
      year: movie.year,
      rating: movie.rating,
      imageUrl: movie.imageUrl,
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded mb-6 p-4">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate} className="space-y-4">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Movie poster preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/320';
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Image className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="url"
            name="imageUrl"
            placeholder="Movie Poster URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-10)"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="1"
            max="10"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Movie' : 'Add Movie'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow rounded overflow-hidden">
            <div className="w-full h-48 bg-gray-100">
              {movie.imageUrl ? (
                <img
                  src={movie.imageUrl}
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/400/320';
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{movie.title}</h3>
              <p className="text-gray-600">Director: {movie.director}</p>
              <p className="text-gray-600">Year: {movie.year}</p>
              <p className="text-gray-600">Rating: {movie.rating}/10</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(movie)}
                  className="flex-1 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                >
                  <Edit2 className="inline-block mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="flex-1 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  <Trash2 className="inline-block mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieApp;
