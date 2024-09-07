import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdRemoveCircle } from 'react-icons/io';
import { Candidate } from '../interfaces/Candidate.interface';

type SortBy = 'name' | 'location' | 'email' | 'company' | 'bio' | 'login' | 'html_url';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  const [search, setSearch] = useState('');
  const [asc, setAsc] = useState(true);

  const nameRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const html_urlRef = useRef<HTMLDivElement>(null);

  /**
   * Handle Reject Candidate
   * @param {number} id
   * @return {void}
   * @description Remove a candidate from the list of potential candidates
   */
  const handleRejectCandidate = (id: number): void => {
    setCandidates((candidates) => candidates.filter((candidate) => candidate.id !== id));
  };

  /**
   * Handle Active Sorting
   * @param {SortBy} by
   * @return {void}
   * @description Change the active sorting column classes
   */
  const handleActiveSorting = useCallback(
    (by: SortBy) => {
      [nameRef, locationRef, emailRef, companyRef, bioRef, loginRef, html_urlRef].forEach((ref) => {
        ref.current?.classList.remove('sort-active', 'ascending', 'descending');
        if (ref.current?.id === by) ref.current.classList.add('sort-active', asc ? 'ascending' : 'descending');
      });
    },
    [asc],
  );

  /**
   * Handle Sort Candidates
   * @param {SortBy} by
   * @return {void}
   * @description Sort the list of potential candidates by a given property
   */
  const handleSortCandidates = useCallback(
    (by: SortBy): void => {
      function sortAlgorithm(a: Candidate, b: Candidate, by: SortBy) {
        if (a[by] < b[by]) {
          return asc ? -1 : 1;
        }

        if (a[by] > b[by]) {
          return asc ? 1 : -1;
        }

        return 0;
      }

      const sortedCandidates = candidates.sort((a, b) => sortAlgorithm(a, b, by));
      setCandidates([...sortedCandidates]);

      handleActiveSorting(by);

      // toggles the asc state
      setAsc((asc) => !asc);
    },
    [candidates, asc, handleActiveSorting],
  );

  useEffect(() => {
    if (localStorage.getItem('candidates')) {
      setCandidates(JSON.parse(localStorage.getItem('candidates')!));
    }
  }, []);

  useEffect(() => {
    if (candidates) {
      localStorage.setItem('candidates', JSON.stringify(candidates));
    }
  }, [candidates]);

  // Add a conditional to check if the candidates array is empty
  if (candidates.length === 0) {
    return (
      <>
        <h2>No candidates have been accepted...</h2>
      </>
    );
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <div className="potential-candidate">
        <p className="table-notes">Table sortable and searchable by: Name, Username, Location, Email, GitHub Url, Company and Bio</p>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          className="search-candidate"
          type="text"
          placeholder="Candidate Search"
          name="search"
          id="search"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                <div ref={nameRef} id="name" className="sortable" onClick={() => handleSortCandidates('name')}>
                  Name
                </div>
              </th>
              <th>
                <div ref={loginRef} id="login" className="sortable" onClick={() => handleSortCandidates('login')}>
                  Username
                </div>
              </th>
              <th>
                <div ref={locationRef} id="location" className="sortable" onClick={() => handleSortCandidates('location')}>
                  Location
                </div>
              </th>
              <th>
                <div ref={emailRef} id="email" className="sortable" onClick={() => handleSortCandidates('email')}>
                  Email
                </div>
              </th>
              <th>
                <div ref={html_urlRef} id="html_url" className="sortable" onClick={() => handleSortCandidates('html_url')}>
                  GitHub URL
                </div>
              </th>
              <th>
                <div ref={companyRef} id="company" className="sortable" onClick={() => handleSortCandidates('company')}>
                  Company
                </div>
              </th>
              <th>
                <div ref={bioRef} id="bio" className="sortable" onClick={() => handleSortCandidates('bio')}>
                  Bio
                </div>
              </th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 && search !== ''
              ? candidates
                  .filter((filter) => filter.meta.toLowerCase().includes(search.toLowerCase()))
                  .map((candidate, index) => (
                    <CandidateRow
                      html_url={candidate.html_url}
                      login={candidate.login}
                      id={candidate.id}
                      key={candidate.name || '' + index}
                      bio={candidate.bio}
                      company={candidate.company}
                      email={candidate.email}
                      img={candidate.img}
                      location={candidate.location}
                      name={candidate.name}
                      rejectCandidate={handleRejectCandidate}
                    />
                  ))
              : candidates.map((candidate, index) => (
                  <CandidateRow
                    html_url={candidate.html_url}
                    login={candidate.login}
                    id={candidate.id}
                    key={candidate.name || '' + index}
                    bio={candidate.bio}
                    company={candidate.company}
                    email={candidate.email}
                    img={candidate.img}
                    location={candidate.location}
                    name={candidate.name}
                    rejectCandidate={handleRejectCandidate}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const CandidateRow = ({ id, bio, company, email, img, location, name, login, html_url, rejectCandidate }: Omit<Candidate, 'meta'> & { rejectCandidate: (id: number) => void }) => {
  return (
    <tr>
      <td>
        <div className="table-img" style={{ backgroundImage: `url(${img || 'https://placeholder.antonshell.me/img'})` }}></div>
      </td>
      <td>{name}</td>
      <td>{login}</td>
      <td>{location}</td>
      <td>{email}</td>
      <td><a href={html_url} target='_blank'>{html_url}</a></td>
      <td>{company}</td>
      <td>{bio && bio.length > 120 ? bio.substring(0, 120).concat('...') : bio}</td>
      <td className="table-action">
        <div onClick={() => rejectCandidate(id)}>
          <IoMdRemoveCircle className="button remove-button" />
        </div>
      </td>
    </tr>
  );
};

export default SavedCandidates;
