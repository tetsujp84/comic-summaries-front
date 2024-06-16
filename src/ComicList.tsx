import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";
import LogoImage from "./assets/logo.png";

interface Comic {
  id: string;
  title: string;
  synopsis: string;
  attraction: string;
  conclusion: string;
  genre: string;
  characters: string;
  author: string;
  image_path: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ComicList: React.FC = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [totalComics, setTotalComics] = useState(0);
  const page = parseInt(useQuery().get("page") || "1");
  const itemPerPage = 10;
  const totalPages = Math.ceil(totalComics / itemPerPage);
  const maxPageNumbers = 10;
  const startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  const [query, setQuery] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("タイトルを検索");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/summaries?page=${page}`
        );
        setComics(response.data.comics);
        console.log("fetched", response.data);
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    const fetchTotalComics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/count`
        );
        setTotalComics(response.data.count);
      } catch (error) {
        console.error("Error fetching total comics:", error);
      }
    };

    fetchComics();
    fetchTotalComics();
  }, [page]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (query.trim() === "") {
      setPlaceholder("検索ワードが未入力");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/search`,
        {
          params: { title: query },
        }
      );
      setComics(response.data);
      if (response.data.length === 0) {
        setError("検索結果が見つかりませんでした。");
      }
    } catch (error) {
      setError("検索中にエラーが発生しました。");
      console.error("Error searching comics:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a className="flex items-center" href="/">
            <img src={LogoImage} alt="Logo" className="h-10" />
          </a>
          <div className="flex space-x-4">
            <Link className="text-gray-300 hover:text-white" to="/about">
              このサイトについて
            </Link>
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded text-black"
                onFocus={() => setPlaceholder("タイトルを検索")}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                検索
              </button>
            </form>
          </div>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">漫画のあらすじ一覧</h1>
            <div className="w-full max-w-2xl mx-auto">
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <ul className="divide-y divide-gray-200">
                {comics.map((comic) => (
                  <li
                    className="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
                    key={comic.id}
                  >
                    <img
                      className="w-full md:w-40 h-atuo object-cover"
                      src={comic.image_path}
                      alt={comic.title}
                      loading="lazy"
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
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/?page=${Math.max(1, page - 1)}`}
                className={`px-4 py-2 ${page === 1? "text-gray-400 cursor-not-allowed": "bg-blue-500 text-white rounded"
                }`}
              >
                ＜
              </Link>
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
                <Link
                  key={pageNumber}
                  to={`/?page=${pageNumber}`}
                  className={`px-4 py-2 ${pageNumber === page? "bg-blue-700 text-white": "bg-blue-500 text-white"
                  }`}
                >
                  {pageNumber}
                </Link>
              ))}
              <Link
                to={`/?page=${Math.min(totalPages, page + 1)}`}
                className={`px-4 py-2 ${page === totalPages? "text-gray-400 cursor-not-allowed": "bg-blue-500 text-white rounded"
                }`}
              >
                ＞
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComicList;
