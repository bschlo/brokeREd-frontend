import React, { useState, useEffect } from "react";
import * as dealService from "../../services/dealService";
import "../Dashboard/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [topLoans, setTopLoans] = useState([]);
  const [bottomLoans, setBottomLoans] = useState([]);
  const [topRates, setTopRates] = useState([]);
  const [bottomRates, setBottomRates] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await dealService.getTopAndBottomDeals();
        setTopLoans(data.top_5_loans);
        setBottomLoans(data.bottom_5_loans);
        setTopRates(data.top_5_rates);
        setBottomRates(data.bottom_5_rates);
      } catch (error) {
        console.error("Failed to fetch deals", error);
      }
    };

    fetchDeals();
  }, []);


  return (
    <div className="dashboard-main">
      <div className="dashboard-tophalf">
        <div className="welcome-message-container">
          <div className="welcome-message">Welcome to brokeREd,  {user}.</div>
        </div>
        <div className="dashboard-description">
          View today's lowest loan amounts, highest loan amounts, lowest
          spreads, and highest spreads.
        </div>
      </div>

      <div className="dashboard-bottomhalf">
        {/* Lowest Loan Amounts Section */}
        <div className="dashboard-deal-container">
          <div className="bottomhalf-title">
            Top 5 Lowest Loan Amounts Today
          </div>
          <div className="bottomhalf-value">

            {bottomLoans.map((deal) => (
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
            ))}
          </div>
        </div>

        <div className="dashboard-deal-container">
          <div className="bottomhalf-title">
            Top 5 Highest Loan Amounts Today
          </div>
          <div className="bottomhalf-value">

            {topLoans.map((deal) => (
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
            ))}
          </div>
        </div>

        <div className="dashboard-deal-container">
          <div className="bottomhalf-title">
            Top 5 Highest Rates Today
          </div>
          <div className="bottomhalf-value">

            {topRates.map((deal) => (
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
            ))}
          </div>
        </div>


        <div className="dashboard-deal-container">
          <div className="bottomhalf-title">
            Top 5 Lowest Rates Today
          </div>
          <div className="bottomhalf-value">

            {topLoans.map((deal) => (
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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
