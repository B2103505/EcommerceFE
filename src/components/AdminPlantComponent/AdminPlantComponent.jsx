import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const AdminPlantComponent = ({children}) => {
    return(
        <div>
            <HeaderComponent />
            {children}
        </div>
    )
}

export default AdminPlantComponent;