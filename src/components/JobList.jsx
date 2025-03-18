import { useState, useEffect } from 'react';
import JoblyApi from '../services/api';
import JobCard from './JobCard';
import './JobList.css';

const JobList = ({applyToJob}) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await JoblyApi.request('jobs', searchTerm ? { title: searchTerm } : {});
        setJobs(res.jobs);
      } catch (err) {
        console.error("Error loading jobs", err);
      }
    }
    fetchJobs();
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="job-list">
      <form>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleChange}
          className="job-search"
        />
        <button className="job-search-button">Search</button>
      </form>

      {jobs.length ? (
        jobs.map(job => (
          <JobCard key={job.id} {...job} applyToJob={applyToJob} />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;