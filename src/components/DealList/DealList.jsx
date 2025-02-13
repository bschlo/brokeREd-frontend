import React from "react";
import './DealList.css'

const DealList = ({ deals }) => {
  return (
    <main className="deal-list-container">
      {deals.map((deal) => (
        <div key={deal.id}>
          <div>{deal.name}</div>
          <div>{deal.address}</div>
          <div>{deal.stories}</div>
          <div>{deal.square_feet}</div>
          <div>{deal.rate_type}</div>
          <div>{deal.minimum_rate}%</div>
          <div>{deal.maximum_rate}%</div>
          {deal.developers.map((developer) => (
            <div> {developer.name}</div>
          ))}
          <div>{deal.loan_amount}</div>
          <div>{deal.deal_type}</div>
          <div>{deal.asset_class}</div>
          <img src={deal.image_url} alt={`${deal.name} image`}/>
          <div>{deal.description}</div>
          <div>{new Date(deal.date).toLocaleDateString('en-US')}</div>
          <div>{new Date(`1970-01-01T${deal.time}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
        </div>
      ))}
    </main>
  );
};

export default DealList;
