import { Link } from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <div className="company-card">
      <Link to={`/companies/${handle}`} className="company-card-link">
        <div className="company-card-header">
          <h3>{name}</h3>
          {logoUrl && <img src={logoUrl} alt={name} className="company-card-logo" />}
        </div>
        <p>{description}</p>
      </Link>
    </div>
  );
};

export default CompanyCard;