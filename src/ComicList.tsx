import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SampleComicImage from "./assets/comic_sample_image.svg";

interface Comic {
  id: string;
  title: string;
  synopsis: string;
  attraction: string;
  conclusion: string;
  genre: string;
  characters: string;
  author: string;
}

const ComicList: React.FC = () => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        // axiosを使用してPOSTリクエストを送信
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/summaries`
        );
        setComics(response.data);
        console.log("fetched", response.data);
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">漫画のあらすじ一覧</h1>
      <div className="w-full max-w-2xl mx-auto">
        <ul className="divide-y divide-gray-200">
          {comics.map((comic) => (
            <li
              className="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
              key={comic.id}
            >
              <img
                className="w-full md:w-48 h-60 object-cover" // md:w-48 は画面が中サイズ以上のときの画像の幅
                src={SampleComicImage}
                alt={comic.title}
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <Link to={`/summaries/${comic.id}`}>
                    <h2 className="font-bold text-xl mb-2 text-gray-800">
                      {comic.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm">{comic.author}</p>
                  <span className="text-xs font-semibold px-2 py-1 mt-2 inline-block rounded bg-blue-200 text-blue-800">
                    {comic.genre}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-4 line-clamp-3">
                  {comic.synopsis}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComicList;
