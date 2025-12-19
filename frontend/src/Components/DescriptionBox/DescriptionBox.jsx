import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorum
          itaque deserunt, obcaecati sequi dicta non dolorem! Deleniti inventore
          quibusdam perspiciatis minus. Nam, laboriosam quasi. Aut possimus
          temporibus tempora maxime!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          excepturi dolorem quibusdam temporibus, deserunt eveniet enim
          necessitatibus id nulla sunt, esse perferendis soluta laudantium sed
          alias blanditiis mollitia, eius quos.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
