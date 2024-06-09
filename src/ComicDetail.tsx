import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ComicDetail: React.FC = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/summaries/${comicId}`
        );
        setComic(response.data);
      } catch (error) {
        console.error("Error fetching comic detail:", error);
      }
    };

    fetchComicDetail();
  }, [comicId]);

  const handleBack = () => {
    navigate(-1); // 1つ前のページに戻る
  };

  const toggleSpoilers = () => {
    setShowSpoilers(!showSpoilers);
  };

  if (!comic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
            <img
              className="w-64 h-auto rounded-lg"
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${comic.image_path}`}
              alt={comic.title}
            />
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-3xl font-bold mb-4">{comic.title}</h1>
            <p className="text-xl mb-2">作者: {comic.author}</p>
            <p className="text-lg mb-2">ジャンル: {comic.genre}</p>
            <h2 className="text-2xl font-bold mt-4">キャラクター紹介</h2>
            <p className="mb-4">{comic.characters}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mt-4">あらすじ</h2>
          <p className="mb-4">{comic.synopsis}</p>
          <h2 className="text-2xl font-bold mt-4">ネタバレ</h2>
          <button
            onClick={toggleSpoilers}
            className="bg-red-500 text-white rounded px-4 py-2 mb-4"
          >
            {showSpoilers ? "ネタバレを隠す" : "ネタバレを表示"}
          </button>
          {showSpoilers && <p className="mb-4">{comic.spoilers}</p>}
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;
