import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import Loading from "./Loading";

const Character = () => {
  const { characterID } = useParams();
  const [character, setCharacter] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const perPage = 8;
  const [next, setNext] = useState(perPage);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setNext(next + perPage);
  };

  const fetchCharacter = async () => {
    setIsLoading(true);
    const getResult = await axios.get(
      `https://www.breakingbadapi.com/api/characters/${characterID}`
    );
    setCharacter(getResult.data);
    setIsLoading(false);
  };

  const fetchEpisodes = async () => {
    setIsLoading(true);
    const getResult = await axios.get(
      `https://www.breakingbadapi.com/api/episodes`
    );
    setEpisodes(getResult.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCharacter();
    fetchEpisodes();
  }, []);
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="character_main mt-5 mb-5">
            <div className="container px-4">
              {character.map((character, index) => {
                return (
                  <div
                    key={index}
                    className="row character_wrapper align-center"
                  >
                    <div className="character_details col-lg-7 col-md-7 col-sm-12 col-xs-12">
                      <h2 className="mb-3 heading">
                        Name: {character.name.toUpperCase()}
                      </h2>
                      <h3 className="mb-1">Nickname : {character.nickname}</h3>
                      <span className="my-0 d-block">
                        Birth : {character.birthday}
                      </span>
                      <span className="my-0 d-block">
                        Status : {character.status}
                      </span>
                      <span className="my-0 d-block">
                        List of occupations : {character.occupation.join(", ")}
                      </span>
                      <span className="my-0 d-block">
                        Portrayed by (Actor) : {character.portrayed}
                      </span>
                      <span className="my-0 d-block">
                        Appearance in Seasons :{" "}
                        <b>{character.appearance.join(", ")}</b>
                      </span>
                      <div>
                        <button
                          className="mt-3 btn btn-success btn-lg"
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                    <div className="character_img col-lg-5 col-md-5 col-sm-12 col-xs-12">
                      <img
                        className="d-block"
                        src={character.img}
                        alt="character img"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container">
            <div className="episode_card_main episode_card_charac_page">
              <h1 className="text-white text-center">
                Appearance In Episodes :
              </h1>
              <div className="row">
                {episodes.slice(0, next).map((episode) => {
                  return episode.characters.map((c) => {
                    return character.map((charc) => {
                      return charc.name === c ||
                        charc.nickname === c.substring(0, 4) ? (
                        <div
                          key={episode}
                          className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-3"
                        >
                          <Card>
                            <Card.Body>
                              <Card.Title className="d-inline-block">
                                {episode.title}.&nbsp;
                              </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                Air Date :{episode.air_date}
                              </Card.Subtitle>
                            </Card.Body>
                          </Card>
                        </div>
                      ) : null;
                    });
                  });
                })}
              </div>
            </div>
            <div className="text-center">
              {next < episodes.length && (
                <Button
                  className="btn btn-success btn-lg mb-4"
                  onClick={handleClick}
                >
                  Load more
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Character;
