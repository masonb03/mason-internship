import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TopSellers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp placeholder-glow">
                        <span className="placeholder rounded-circle" style={{height: "50px", width: "50px", display: "block"}}></span> 
                        <i className="fa fa-check"></i>
                      </div>
                     
                      <div className="author_list_info placeholder-glow">
                        <span className="placeholder w-75 mb-2" style={{display: "block"}}></span>
                        <span className="placeholder w-25" style={{display: "block"}}></span>
                      </div>
                    </li>
                ))
              ) : (
                data.map((item, index) => (
                  <li key={index}>
                  <div className="author_list_pp" data-aos="fade-up" data-aos-delay="100" data-aos-easing="ease-in-out">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease-in-out">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
