import React, { useEffect, useState } from 'react'
import ClaimItem from './ClaimItem'
import claimService from '../../services/claims';


function ClaimsList() {

  const [claims, setClaims] = useState([]);

  useEffect(() => {
    claimService.list()
      .then((claims) => {
        setClaims(claims)
      })
  }
  ,[])

  return (
    <>
      {claims.map((claim) => 
        <ClaimItem claim={claim}/>
      )}
      
    </>
  )
}

export default ClaimsList