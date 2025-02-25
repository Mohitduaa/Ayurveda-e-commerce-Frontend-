import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Slider from 'react-slick';
import axios from "axios";
import { useEffect, useState } from "react";

const Scroll = () => {
  const [count, setCount] = useState([]);

  const fetchData = async () => {
    try {
      const receive = await axios.get("https://aayurveda-hn8w.onrender.com/home/receiveImg");
      const x = receive.data.map((item) => item.url);
      
      // Sirf index 3 aur 4 ki images filter karna
      setCount(x.slice(3, 5));

    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
  };

  return (
    <div className="overflow-hidden">   
      <div className="px-[.2rem]  overflow-hidden">
        <Slider {...settings}>
          {count.map((item, index) => (
            <img src={item} key={index} alt="img not available" className="rounded-md" />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Scroll;
