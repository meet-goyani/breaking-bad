import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Episode from "./Episode";
import { InfinitySpin } from "react-loader-spinner";
import Loading from "./Loading";

const AllEpisode = () => {
  const [Items, setItems] = useState([]);
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const offset = currentPage * perPage;

  const fetchData = async () => {
    setIsLoading(true);
    const getResult = await axios.get(
      `https://www.breakingbadapi.com/api/episodes/`
    );
    setItems(getResult.data);
    console.log(getResult.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="seasons_main_wrapper mt-5">
                <div className="episode_card_main">
                  <div className="row all_episode_card">
                    <h1 className="text-center my-3 text-white">
                      All Episodes :{" "}
                    </h1>
                    {Items.slice(offset, offset + perPage).map((item, index) =>
                      item.series === "Breaking Bad" ? (
                        <Episode
                          key={index}
                          episode_id={item.episode_id}
                          episode={item.episode}
                          title={item.title}
                          air_date={item.air_date}
                          season={item.season}
                        />
                      ) : null
                    )}
                  </div>
                  <div className="text-center" style={{}}>
                    <button
                      className="prev-btn btn btn-success btn-lg mb-4 me-2 mt-2"
                      onClick={() =>
                        setCurrentPage((prevState) =>
                          Math.max(prevState - 1, 0)
                        )
                      }
                    >
                      Prev Page
                    </button>
                    <button
                      className="next-btn btn btn-success btn-lg mb-4 mt-2"
                      onClick={() =>
                        setCurrentPage((prevState) => prevState + 1)
                      }
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllEpisode;
