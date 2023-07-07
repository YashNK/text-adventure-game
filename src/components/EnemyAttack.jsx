import React from "react";

const EnemyAttack = (props) => {
    return (
      <div className="absolute text-white">
        <div className="popup">
          <p>The enemy is coming to attack you!</p>
          <button onClick={() => props.setIsAttacked(false)}>OK</button>
        </div>
      </div>
    );
  };
  export default EnemyAttack