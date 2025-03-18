import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../services/api';
import JobCard from './JobCard';
import './CompanyDetail.css';

const CompanyDetail = ({applyToJob}) => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  // Fetch correct company clicked on by user
  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await JoblyApi.request(`companies/${handle}`);
        setCompany(res.company);
      } catch (err) {
        console.error("Error loading company details", err);
      }
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="company-detail">
      <h2>{company.name}</h2>
      {company.logoUrl && <img src={company.logoUrl} alt={company.name} />}
      <p>{company.description}</p>
      <p><strong>Employees:</strong> {company.numEmployees}</p>
      
      <h3>Jobs at {company.name}</h3>
      {company.jobs.length ? (
        company.jobs.map(job => (
          <JobCard key={job.id} {...job} applyToJob={applyToJob} />
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default CompanyDetail;