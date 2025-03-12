import React from "react";
import { Link } from "react-router";
import "./DealList.css";

const DealList = ({ deals }) => {
  return (
    <main className="deal-list">
      <div className="deal-list-container">
        <div className="deal-list-elements">
          {deals.map((deal) => (
            <Link to={`/deals/${deal.id}`}>
            <div key={deal.id} className="deal-item">
              <div className="deal-image-container">
                <img className="deal-list-img" src={deal.image_url} alt={`${deal.name} image`} />
                <div className="deal-info-box">
                  <div className="deal-summary">
                    <div className="deal-name">{deal.name}</div>
                    <div className="deal-address">{deal.address}</div>
                    <div className="deal-loan-amount">${deal.loan_amount.toLocaleString()}</div>
                  </div>
                  <div className="deal-details">
                    <div>{deal.deal_type}</div>
                    <div>{deal.asset_class}</div>
                    <div>{`Posted on: ${new Date(deal.date).toLocaleDateString()}`}</div>
                    {deal.developers.map((developer) => (
                      <div key={developer.id}>{developer.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DealList;
