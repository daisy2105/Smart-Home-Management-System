import React from 'react'
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
          className="mb-8 text-blue-600 font-medium hover:underline flex items-center gap-2"
       >
        ← Back
      </button>
    </div>
  )
}

export default BackButton