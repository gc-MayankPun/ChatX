import { useNavigate, useParams } from "react-router-dom";
import policyData from "../api/policyData.json";
import legalData from "../api/termsData.json";
import Loader from "../components/ui/Loader";
import { useEffect, useState } from "react";
import "../stylesheets/legal-info.css";

const legalAndPrivacy = () => {
  console.log("Privacy")
  const { info } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (info === "terms") setData(legalData);
      else if (info === "privacy") setData(policyData);
      else setData(null);

      setLoading(false);
    }, 1000);
  }, [info]);

  if (loading) return <Loader />;

  if (!data) return <InfoFallback />;

  return <InfoContainer data={data} />;
};

const InfoContainer = ({ data }) => {
  const { header, content, footer } = data;
  const navigate = useNavigate();

  return (
    <div className="legal__wrapper">
      <div className="legal__overlay">
        <h1>{header.title}</h1>
        <p className="legal__subhead">{header?.subheading}</p>
        <div className="legal__list-overlay">
          <p className="legal-list__head">{header?.listHead} </p>
          <ul className="legal__list">
            {content.map((paragraph, index) => {
              if (typeof paragraph.body === "object") {
                return (
                  <li key={`${index} = ${Math.random()}`}>
                    <strong>{paragraph.title}</strong>
                    <ol>
                      {Object.keys(paragraph.body).map((bodyKey, index) => {
                        return (
                          <li key={`${index} - ${Math.random()}`}>
                            {paragraph.body[bodyKey]}
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                );
              }
              return (
                <li key={`${index} = ${Math.random()}`}>
                  <strong>{paragraph.title}</strong>
                  {paragraph.body}
                </li>
              );
            })}
          </ul>
          <div className="legal__footer">
            {footer.title && <p>{footer.title}</p>}
            <p>{footer.body}</p>
          </div>
        </div>
      </div>
      <div className="legal__go-back">
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

const InfoFallback = () => {
  const navigate = useNavigate();

  return (
    <div className="info-fallback__wrapper">
      <div className="info-fallback">
        <h1>Well, well, look who's poking around…</h1>
        <p>
          You really wanna dive into the legal jungle? Terms of Service and
          Privacy Policy didn't give you enough drama?
        </p>
        <p>
          I gotta say, most people just scroll past this stuff… but hey, you do
          you. Just don't get lost in the fine print maze! 😏
        </p>
        <p>Wanna turn back before it gets too wild?</p>
        <button onClick={() => navigate(-1)}>Take Me Back</button>
      </div>
    </div>
  );
};

export default legalAndPrivacy;
