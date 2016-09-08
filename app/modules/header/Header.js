import React from 'react';
import './Header.css';

const Header = ({
}) => {
  return (
    <div className="catan-header row" style={{
      marginBottom: '0px',
    }}>
      <div className="col s3" style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100%",
        fontSize: "24px",
      }}>
        Catan
      </div>
      
    </div>
  )
}

export default Header;
