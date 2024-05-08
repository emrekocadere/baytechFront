import React from 'react';
import res3 from './ellipse-1.png';

const Sidebar = (props) => {
    console.log(props);
    return (
        <div className="overlap">
            <div className="div">
              <img className="ellipse" src={res3} />
              <div className="ellipse-2"></div>
            </div>
            <div className="eva-message-circle"><div class="rectangle"></div></div>
            <img className="vector" src="img/vector.svg" />
            <img className="codicon-home" src="img/codicon-home.svg" />
            <img className="ci-settings" src="img/ci-settings.svg" />
            <img className="bx-bell" src="img/bx-bell.svg" />
            <img className="majesticons-door" src="img/majesticons-door-exit.svg" />
            <div className="rectangle-2"></div>
          </div>
    )
}

export default Sidebar;