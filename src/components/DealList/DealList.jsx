import React from "react";
import { Link } from "react-router";
import "./DealList.css";

const DealList = ({ deals }) => {
  return (
    <main className="deal-list-container">
      {deals.map((deal) => (
        <div key={deal.id}>
          <Link key={deal.id} to={`/deals/${deal.id}`}>
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
            <img src={deal.image_url} alt={`${deal.name} image`} />
            <div>{deal.description}</div>
            <div>{`Posted on: ${new Date(deal.date).toLocaleDateString()}`}
            </div>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default DealList;
