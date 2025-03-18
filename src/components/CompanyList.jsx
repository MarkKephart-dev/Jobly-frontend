import { useState, useEffect } from 'react';
import JoblyApi from '../services/api';
import CompanyCard from './CompanyCard';
import './CompanyList.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await JoblyApi.request('companies', searchTerm ? { name: searchTerm } : {});
        setCompanies(res.companies);
      } catch (err) {
        console.error("Error loading companies", err);
      }
    }
    fetchCompanies();
  }, [searchTerm]); // Trigger new request when searchTerm changes

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="company-list">
      <form>
        <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={handleChange}
            className="company-search"
        />
        <button className='company-search-button'>Search</button>
      </form>
      {companies.length ? (
        companies.map(company => (
          <CompanyCard key={company.handle} {...company} />
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompanyList;