import React from "react";
import { Link } from "react-router-dom"; // Fixed import
import "./DealList.css";
import DealFilters from "./DealFilters/DealFilters";



const DealList = ({ deals, handleFilterChange, filters }) => {
  return (
    <main className="deal-list">
      
      <DealFilters handleFilterChange={handleFilterChange} filters={filters}/>
      <div className="deal-list-container">
        <div className="deal-list-elements">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-item">
              <div className="deal-image-container">
                <Link to={`/deals/${deal.id}`}>
                  <img
                    className="deal-list-img"
                    src={deal.image_url || "/default-image.jpg"}
                    alt={`${deal.name || "Deal"} image`}
                  />
                  <div className="deal-info-box">
                    <div className="deal-summary">
                      <div className="deal-loan-amount">
                        ${deal.loan_amount?.toLocaleString() || "N/A"}
                      </div>
                      <div className="deal-name">{deal.name}</div>
                      <div className="deal-address">{deal.address}</div>
                    </div>
                    
                    <div className="deal-details">
                      <div className="list-summary">Deal Summary</div>
                      <div className="list-titlevalue">
                        <div className="list-title">Asset Class</div>
                        <div className="list-value">{deal.asset_class}</div>
                      </div>

                      <div className="list-titlevalue">
                        <div className="list-title">Units</div>
                        <div className="list-value">{deal.units}</div>
                      </div>

                      <div className="list-titlevalue">
                        <div className="list-title">Deal Type</div>
                        <div className="list-value">{deal.deal_type}</div>
                      </div>

                      <div className="list-titlevalue">
                        <div className="list-title">Spread</div>
                        <div className="list-value">{deal.minimum_rate}% - {deal.maximum_rate}% + {deal.rate_type}</div>
                      </div>

                      <div className="list-titlevalue">
                        <div className="list-title">Developer</div>
                        <div className="list-value">
                          <div className="developerinfo-container">
                            {deal.developers?.map((developer) => (
                              <div
                                key={developer.id}
                                className="developer-image-container"
                              >
                                <img
                                  src={
                                    developer.image_url ||
                                    "/default-developer.jpg"
                                  }
                                  className="developer-image"
                                  alt={developer.name || "Developer"}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="list-user">
                        {`${deal.user?.username || "Unknown"} posted on ${
                          deal.date
                            ? new Date(deal.date).toLocaleDateString()
                            : "N/A"
                        }`}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </main>
  );
};

export default DealList;
