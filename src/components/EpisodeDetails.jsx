import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import Loading from "./Loading";

const EpisodeDetails = () => {
  const { episodeID } = useParams();

  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImg = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://www.breakingbadapi.com/api/characters`
    );
    setCharacters(res.data);
    setIsLoading(false);
    // console.log(res.data);
  };
  const fetchData = async () => {
    const res = await axios.get(
      `https://www.breakingbadapi.com/api/episodes/${episodeID}`
    );
    setEpisodes(res.data);
    // console.log(res.data);
  };
  useEffect(() => {
    fetchData();
    fetchImg();
  }, [episodeID]);
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 episode_card mt-5">
                <Card>
                  {episodes.map((episode, index) => {
                    return (
                      <>
                        <Card.Body key={index}>
                          <Card.Title>
                            <h2 className="heading">
                              {episode.episode_id}. {episode.title}
                            </h2>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Air Date : {episode.air_date}
                          </Card.Subtitle>
                          <Card.Subtitle className="mb-2 text-muted">
                            Season: {episode.season}
                            <br />
                            Series : {episode.series}
                            <br />
                          </Card.Subtitle>
                        </Card.Body>
                        <div className="character_main mt-5">
                          <h2 className="text-center heading">Characters</h2>
                          <div>
                            <div className="row">
                              {episode.characters.map((character) => {
                                return characters.map((char, index) =>
                                  (char.name === character ||
                                    char.nickname ===
                                      character.substring(0, 4)) &&
                                  episodeID ? (
                                    <div
                                      key={index}
                                      className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-4"
                                    >
                                      <Card>
                                        <Card.Body>
                                          <Link
                                            to={`/character/${char.char_id}`}
                                          >
                                            <img
                                              src={char.img}
                                              alt="character img"
                                            />
                                          </Link>
                                          <Card.Title className="text-center mt-3">
                                            {char.name}
                                          </Card.Title>
                                        </Card.Body>
                                      </Card>
                                    </div>
                                  ) : null
                                );
                              })}
                              <Link
                                to="/allepisode"
                                className="text-center d-inline-block"
                              >
                                <Button
                                  variant="success"
                                  size="lg"
                                  className="mt-5 mb-2"
                                >
                                  All Episode
                                </Button>
                              </Link>
                              <div className="text-center d-inline-block mb-3">
                                <button
                                  onClick={() => navigate(-1)}
                                  className="btn mt-4 btn-success"
                                >
                                  Back
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EpisodeDetails;
