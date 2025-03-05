import React, { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as dealService from '../../services/dealService'
import { AuthedUserContext } from "../../App";

const DealDetails = ({ handleDeleteDeal }) => {
  const { dealId } = useParams();
  const user = useContext(AuthedUserContext)
  const [deal, setDeal] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDeal = async () => {
        const dealData = await dealService.show(dealId)
        setDeal(dealData.deal)
    }
    fetchDeal()
  }, [dealId])

  
  
  return (
    <main>
        {deal ? (
        <div key={deal.id}>
          <div>{deal.name}</div>
          <div>{deal.address}</div>
          <div>{deal.stories}</div>
          <div>{deal.square_feet}</div>
          <div>{deal.rate_type}</div>
          <div>{deal.minimum_rate}%</div>
          <div>{deal.maximum_rate}%</div>
          {deal.developers.map((developer) => (
            <div>{developer.name}</div>
          ))}
          <div>{deal.loan_amount}</div>
          <div>{deal.deal_type}</div>
          <div>{deal.asset_class}</div>
          <img src={deal.image_url} alt={`${deal.name} image`}/>
          <div>{deal.description}</div>
          <div>{`Posted on: ${new Date(deal.date).toLocaleDateString()}`}</div>
          <div>
            {deal.username === user.username && (
              <>
              <Link to={`/deals/${dealId}/edit`}>Edit</Link>
              <button onClick={() => handleDeleteDeal(deal.id)}>Delete Deal</button>
              </>
            )}
          </div>
        </div>
        ) : <div>Loading...</div>
    }
    </main>
  ) 
};

export default DealDetails;
