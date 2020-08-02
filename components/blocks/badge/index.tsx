import {MdStars} from "react-icons/md";
import React from "react";

const Badge = ({ stars }) => {
    if (stars <= 50) return <MdStars size={16} color="#cd7f32" />;
    if (stars >= 100 && stars < 500) return <MdStars size={16} color="silver" />;
    if (stars >= 500) return <MdStars size={16} color="gold" />;
    return null;
};

export default Badge;
