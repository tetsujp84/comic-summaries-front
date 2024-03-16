import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Comic {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  // その他のプロパティ
}

const ComicDetail: React.FC = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
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

  if (!comic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <h1>{comic.title}</h1>
        <p>{comic.synopsis}</p>
        <p>ジャンル: {comic.genre}</p>
        {/* その他の情報を表示 */}
        <button onClick={handleBack}>戻る</button> {/* 戻るボタン */}
      </div>
    </div>
  );
};

export default ComicDetail;
