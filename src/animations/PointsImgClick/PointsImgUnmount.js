import React from "react"
function usePointsImgUnmount() {
    const handleOnClick = (pointsImgRef,pointsNum)=>{
        pointsImgRef.current.updateGeometry(pointsNum)
    }
    return handleOnClick
}

export default usePointsImgUnmount
