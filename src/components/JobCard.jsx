import { useContext } from 'react';
import './JobCard.css';
import UserContext from '../UserContext';

const JobCard = ({ id, title, salary, equity, applyToJob }) => {
  const {currentUser} = useContext(UserContext);
  const hasApplied = currentUser.applications.includes(id);

  async function handleApply(evt) {
    evt.preventDefault();
    if (!hasApplied) {
      await applyToJob(id);
    }
  }

  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p><strong>Salary:</strong> {salary ? `$${salary.toLocaleString()}` : 'N/A'}</p>
      <p><strong>Equity:</strong> {equity || 'N/A'}</p>
      {hasApplied ? (
        <button className="applied-button" disabled>
          Applied
        </button>
      ) : (
      <button 
        className="apply-button"
        onClick={handleApply}
        disabled={hasApplied}>
        {hasApplied ? "Applied" : "Apply"}
      </button>)}
    </div>
  );
};

export default JobCard;