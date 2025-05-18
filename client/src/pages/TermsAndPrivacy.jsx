import { useNavigate, useParams } from "react-router-dom";
import legalData from "../api/termsData.json";
import policyData from "../api/policyData.json";
import "../stylesheets/legal-info.css";

const legalAndPrivacy = () => {
  const { info } = useParams();

  if (info === "terms") return <InfoContainer data={legalData} />;

  if (info === "privacy") return <InfoContainer data={policyData} />;

  return <h1>Ohh!! A dog is scooping around here? aye!</h1>
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
              if (paragraph.body[0] === undefined) {
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

export default legalAndPrivacy;
