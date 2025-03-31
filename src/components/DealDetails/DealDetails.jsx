import React, { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as dealService from "../../services/dealService";
import { AuthedUserContext } from "../../App";
import "../DealDetails/DealDetails.css";
import DropUpMenu from "./DropUpMenu/DropUpMenu.jsx";
import GoogleMaps from "./GoogleMaps/GoogleMaps.jsx";

const DealDetails = ({ handleDeleteDeal }) => {
  const { dealId } = useParams();
  const user = useContext(AuthedUserContext);
  const [deal, setDeal] = useState(null);
  const navigate = useNavigate();

  console.log(deal);
  useEffect(() => {
    const fetchDeal = async () => {
      const dealData = await dealService.show(dealId);
      setDeal(dealData.deal);
    };
    fetchDeal();
  }, [dealId]);

  return (
    <>
      {deal ? (
        <div key={deal.id} className="deal-details-main">
          <div className="deal-details-heading">
            <div className="dealname-container">
            <div className="deal-details-dealname">{deal.name}
            </div>
            <div>
              {deal.username === user.username && (
                <>
                  <DropUpMenu handleDeleteDeal={handleDeleteDeal} deal={deal} />
                </>
              )}
            </div>
            </div>
            <div className="deal-details-developer">
              {deal.developers.map((developer, index) => (
                <span key={developer.id}>
                  {developer.name}
                  {index < deal.developers.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <div className="deal-details-tophalf">
            <div className="deal-details-info">
              <div className="img-and-information">
                <div className="deal-details-img-container">
                  <img
                    className="deal-details-img"
                    src={deal.image_url}
                    alt={`${deal.name} image`}
                  />
                </div>
                <div className="deal-details-container">

                <div className="deal-details-item">
                    <div className="deal-details-title">Loan Amount</div>
                    <div className="deal-details-value">
                      ${deal.loan_amount.toLocaleString()}
                    </div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Address</div>
                    <div className="deal-details-value">{deal.address}</div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Asset Class</div>
                    <div className="deal-details-value">{deal.asset_class}</div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Units</div>
                    <div className="deal-details-value">{deal.units}</div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Stories</div>
                    <div className="deal-details-value">{deal.stories}</div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Square Feet</div>
                    <div className="deal-details-value">
                      {deal.square_feet.toLocaleString()} SF
                    </div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Rate Type</div>
                    <div className="deal-details-value">{deal.rate_type}</div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Minimum Rate</div>
                    <div className="deal-details-value">
                      {deal.minimum_rate}%
                    </div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Maximum Rate</div>
                    <div className="deal-details-value">
                      {deal.maximum_rate}%
                    </div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Deal Type</div>
                    <div className="deal-details-value">{deal.deal_type}</div>
                  </div>

                  <div className="deal-details-item">
                    <div className="deal-details-title">Posted On</div>
                    <div className="deal-details-value">
                      {new Date(deal.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="deal-detail-map">
                <GoogleMaps deal={deal} />
              </div>
            </div>
            
          </div>
          <div className="deal-details-executive-summary">
            <div className="executive-summary-title">Executive Summary</div>
            <div className="executive-summary-value">{deal.description}</div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default DealDetails;
