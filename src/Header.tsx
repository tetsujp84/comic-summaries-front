import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import LogoImage from "./assets/logo.png";

const Header: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("タイトルを検索");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() === "") {
      setPlaceholder("検索ワードが未入力");
      return;
    }
    navigate(`/search?title=${query}`);
  };

    const handleLogoClick = () => {
    setQuery("");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link className="flex items-center" to="/" onClick={handleLogoClick}>
          <img src={LogoImage} alt="Logo" className="h-10" />
        </Link>
        <div className="flex space-x-4">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="p-2 border border-gray-300 rounded text-black"
              onFocus={() => setPlaceholder("タイトルを検索")}
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
              検索
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
