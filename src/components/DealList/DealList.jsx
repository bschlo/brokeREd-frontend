import React from "react";
import { Link } from "react-router-dom";
import "./DealList.css";
import DealFilters from "./DealFilters/DealFilters";
import SortFilter from "./SortFilter/SortFilter";

const DealList = ({ deals, setDeals, handleFilterChange, filters }) => {
  return (
    <main className="deal-list">
      <div className="deal-list-top">
        <div className="deal-list-title">Posted Deals</div>
        <div className="icons">
          <div className="deal-filter-icon">
            <DealFilters
              handleFilterChange={handleFilterChange}
              filters={filters}
              setDeals={setDeals}
            />
          </div>
          <div className="sort-filter-icon">
            <SortFilter filters={filters} setDeals={setDeals} />
          </div>
        </div>
      </div>
      <div className="deal-list-container">
        <div className="deal-list-elements">
          {deals.length < 1 ? (
            <p className="no-deals-message">No Deals Posted Yet. Create a Deal <Link to='/deals/new'>Here</Link>.</p>
          ) : (
            deals.map((deal) => (
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
                        <div className="deal-address">{deal.address.split(",").slice(1, 3).join(", ").trim()}</div>
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
                          <div className="list-value">
                            {deal.minimum_rate}% - {deal.maximum_rate}% +{" "}
                            {deal.rate_type}
                          </div>
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
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default DealList;
