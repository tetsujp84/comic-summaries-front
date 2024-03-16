import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Comic {
  id: string;
  title: string;
  synopsis: string;
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <h1>漫画のあらすじ一覧</h1>
        <ul className="space-y-4">
          {comics.map((comic) => (
            <li
              className="bg-white shadow-md rounded-lg p-4"
              key={comic.id}
            >
              <Link to={`/summaries/${comic.id}`}>
                <h2 className="text-xl font-bold">{comic.title}</h2>
              </Link>
              <p>{comic.synopsis}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComicList;
