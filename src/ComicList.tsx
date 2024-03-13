import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/summaries`);
            setComics(response.data);
            console.log('fetched', response.data);
          } catch (error) {
            console.error('Error fetching comics:', error);
          }
        };
    
        fetchComics();
      }, []);

    return (
        <div>
            <h1>漫画のあらすじ一覧</h1>
            <ul>
                {comics.map(comic => (
                    <li key={comic.id}>
                        <h2>{comic.title}</h2>
                        <p>{comic.synopsis}</p>
                        <p>aaaa</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComicList;
