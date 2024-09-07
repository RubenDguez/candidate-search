import { useCallback, useEffect, useMemo, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

import { FaPlay } from 'react-icons/fa';
import { IoMdRefresh, IoMdRemoveCircle } from 'react-icons/io';
import { IoAddCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Candidate, GithubUser, Response } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [response, setResponse] = useState<Array<Response>>([]);
  const [responseId, setResponseId] = useState(0);
  const [candidate, setCandidate] = useState<Candidate | null>();
  const [savedCandidates, setSavedCandidates] = useState<Array<Candidate>>([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setResponseId((candidate) => candidate + 1);
  };

  const handleRefreshPage = () => {
    navigate(0);
  };

  const hasNext = useMemo(() => {
    return response.length > responseId;
  }, [response, responseId]);

  const handleUserInformation = useCallback(async () => {
    if (hasNext) {
      const user: GithubUser = await searchGithubUser(response[responseId].login);

      if (Object.keys(user).length === 0) {
        setCandidate(null);
        return;
      }

      setCandidate({
        html_url: user.html_url,
        login: user.login,
        id: user.id,
        bio: user.bio || '',
        company: user.company || '',
        email: user.email || '',
        img: user.avatar_url,
        location: user.location || '',
        name: user.name || '',
        meta: `*${user.name?.toLowerCase()}*${user.login.toLowerCase()}*${user.location?.toLowerCase()}*${user.email?.toLowerCase()}*${user.html_url.toLowerCase()}*${user.company?.toLowerCase()}*${user.bio?.toLowerCase()}*`,
      });
    }
  }, [response, responseId, hasNext]);

  const handleSaveCandidate = useCallback(() => {
    if (candidate) {
      setSavedCandidates((sc) => [...sc, candidate]);
    }
    handleButtonClick();
  }, [candidate]);

  useEffect(() => {
    async function getData() {
      const response: Array<Response> = await searchGithub();
      const data = response.filter((f) => f.type === 'User' && f.login !== '');
      if (data) {
        setResponse(data);
      }
    }

    if (localStorage.getItem('candidates')) {
      setSavedCandidates(JSON.parse(localStorage.getItem('candidates')!));
    }

    getData();
  }, []);

  useEffect(() => {
    if (response.length) {
      handleUserInformation();
    }
  }, [response, handleUserInformation]);

  useEffect(() => {
    if (savedCandidates) {
      localStorage.setItem('candidates', JSON.stringify(savedCandidates));
    }
  }, [savedCandidates]);

  if (!hasNext) {
    return (
      <>
        <h2>No more candidates to display</h2>
        <p>Please refresh the page to load more candidates.</p>
        <div>
          <div onClick={() => handleRefreshPage()}>
            <IoMdRefresh className='button refresh-button' />
          </div>
        </div>
      </>
    );
  }

  if (candidate === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="main">
      <h1>Candidate Search</h1>
      <div className="candidate">
        <div className="candidate-photo" style={{ backgroundImage: `url(${candidate?.img || 'https://placeholder.antonshell.me/img'})` }}></div>
        <div className="candidate-details">
          {candidate !== null ? (
            <CandidateDetails {...candidate} />
          ) : (
            <div style={{ padding: '2rem' }}>
              This is not on us, the candidate with url: <span style={{ color: 'blue' }}>https://api.github.com/users/{response[responseId].login}</span> was not found and GitHub
              returned an empty user, please continue...
            </div>
          )}
        </div>
        <div className="candidate-buttons">
          {candidate !== null ? (
            <>
              <div onClick={handleButtonClick}>
                <IoMdRemoveCircle className="button remove-button" />
              </div>
              <div onClick={handleSaveCandidate}>
                <IoAddCircleSharp className="button add-button" />
              </div>
            </>
          ) : (
            <div className="candidate-buttons" onClick={handleButtonClick}>
              <FaPlay className="button play-button" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CandidateDetails = ({ name, location, email, company, bio, login, html_url }: Candidate) => {
  return (
    <>
      {
        <h3>
          {name} <span style={{ fontStyle: 'oblique' }}>({login})</span>
        </h3>
      }

      <p>
        <span>Location: </span>
        <span>{location}</span>
      </p>
      <p>
        <span>Email: </span>
        <a href={`mailto: ${email}`}>{email}</a>
      </p>
      <p>
        <span>Company: </span>
        <span>{company}</span>
      </p>
      <p>
        <span>Url: </span>
        <a href={html_url} target="_blank">
          {html_url}
        </a>
      </p>
      <p>
        <span>Bio: </span>
        <span>{bio}</span>
      </p>
    </>
  );
};

export default CandidateSearch;
