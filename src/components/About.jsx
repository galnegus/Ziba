import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import img10 from '../assets/10.png';
import imgHorizontal from '../assets/horizontal.png';
import imgPicOfMapping from '../assets/pic-of-mapping.png';
import imgDaniel from '../assets/daniel1.png';
import imgEmmeli from '../assets/emmeli1.png';
import imgLeif from '../assets/leif1.png';
import imgLinnea from '../assets/linnea1.png';
import imgPournami from '../assets/pournami1.png';
import imgSarah from '../assets/sarah1.png';
import imgSihan from '../assets/sihan1.png';
import imgTobias from '../assets/tobias1.png';

import '../assets/css/bootstrap.min.css';
import './About.css';

function About() {
  return (
    <div class="about-wrapper">
      <div className="container1">
        <div className="container">
          <div className="row header" id="top">
            <div className="col-md-6">
              <img
                src={imgHorizontal}
                alt="The Global Goals - Behind the Scenes"
                className="header__image"
              />
            </div>
            <div className="col-md-6 header__navbar" id="navbar">
              <p font color="black">
                <a href="#demo">Get Started</a> |
                <a href="#description">Description</a> |
                <a href="#team">Our Team </a>
              </p>
            </div>
          </div>
        </div>
        <div id="background1">
          <div className="video-container">
            <div className="container">
              <div className="row text-center" id="video">
                <div className="col-md-12">
                  <div className="embed-container">
                    <iframe
                      title="Ziba Video"
                      src="https://www.youtube.com/embed/1xaSKNqOZJo"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="demo" id="demo">
            <h2>Try the demo!</h2>
            <h4>
              <a className="btn btn-primary btn-lg" href="https://galnegus.github.io/ziba/" target="view_window">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                https://galnegus.github.io/ziba/
              </a>
            </h4>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row" id="description">
          <div className="col-sm-1" />
          <div className="col-sm-12">
            <h1 className="description-title">Description</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-5">
            <img className="image-background" alt="The 17 Agenda 2020 goals" src={img10} />
          </div>
          <div className="col-sm-5 paragraph" id="background">
            <h3><br />Background</h3>
            <p>
              This project was proposed by the Stockholm Environmental Institute (SEI).
              SEI is an international non-profit research organization working on environment and sustainable development issues.
              This visualization is based on the data collected and compiled by the SEI about the United Nations Sustainable Development Goals.
              The main purpose of this data is to make it possible to analyze the interactions between different Sustainable Development Goals.
              Our visualization of this data set is intended to help researchers identify important connections and interactions between these goals.
            </p>
          </div>
          <div className="col-sm-1" />
        </div>
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-6 paragraph">
            <h3>Mapping</h3>
            <p>
              Our visualization features two main views, the overview and the detailed view.
            </p>
            <p>
              The overview shows all the goals we have interaction data for.
              The interactions between goals are shown as lines, where the color of the line shows how positive or negative the interaction is.
            </p>
            <p>
              The detailed view is activated when the user selects a single goal and shows a breakdown of what the consequences of investing in that goal would be for other goals.
              This view also shows higher-order influences by taking into account how the selected goal indirectly impacts other goals.
              Each order of influence is visualized as a circle, with the thickness of the circle showing the total impact of the selected goal.
              Each circle is then further split up into segments, with each segment representing one goal.
              The size of each goal segment shows the total influence the previous order goals had on that goal, and the color shows how positive or negative the influence is.
            </p>
          </div>
          <div className="col-sm-5">
            <img className="image-mapping" alt="Visual structures used" src={imgPicOfMapping} />
          </div>
        </div>
        <div className="row team">
          <div className="col-sm-1" />
          <div className="col-sm-10" id="team">
            <h1>Our Team</h1>
            <div className="row">
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgDaniel} alt="daniel" id="profilePic" />
                </div>
                <p className="team__name">Daniel Isheden</p>
                <p className="team__email"><a href="mailto:danielis@kth.se">danielis@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Company liaison</li>
                  <li>Mockup creation</li>
                  <li>Brainstorming</li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgEmmeli} alt="emmeli" id="profilePic" />
                </div>
                <p className="team__name">Emmeli Hansson</p>
                <p className="team__email"><a href="mailto:emmelih@kth.se">emmelih@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Coordination</li>
                  <li>Brainstorming</li>
                  <li>Video making</li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgLeif} alt="leif" id="profilePic" />
                </div>
                <p className="team__name">Leif Tysell Sundkvist</p>
                <p className="team__email"><a href="mailto:leifsun@kth.se">leifsun@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Web design</li>
                  <li>Visualization design</li>
                  <li>Mockup creation</li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgLinnea} alt="linnea" id="profilePic" />
                </div>
                <p className="team__name">Linnéa Granlund</p>
                <p className="team__email"><a href="mailto:lingra@kth.se">lingra@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Web coding</li>
                  <li>Visualization design</li>
                  <li>Research</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgPournami} alt="pournami" id="profilePic" />
                </div>
                <p className="team__name">Pournami Krishnakumari</p>
                <p className="team__email"><a href="mailto:pkkr@kth.se">pkkr@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Brainstorming</li>
                  <li>Research</li>
                  <li>User-testing</li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgSarah} alt="sarak" id="profilePic" />
                </div>
                <p className="team__name">Sarah Berenji Ardestani</p>
                <p className="team__email"><a href="mailto:sarahba@kth.se">sarahba@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Programming</li>
                  <li>Research</li>
                  <li>Brainstorming</li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgSihan} alt="sihan" id="profilePic" />
                </div>
                <p className="team__name">Sihan Yuan</p>
                <p className="team__email"><a href="mailto:sihany@kth.se">sihany@kth.se</a></p>
                <ul className="team__contributions">
                  <li>Website</li>
                  <li>Research</li>
                  <li>User-testing</li>
                </ul>
              </div>
              <div className="col-sm-3">
                <div className="team__img-container">
                  <img src={imgTobias} alt="tobias" id="profilePic" />
                </div>
                <p className="team__name">Tobias Hindersson</p>
                <p className="team__email"><a href="mailto:thi@kth.se">thi@kth.se</a></p>
                <ul className="team__contributions">
                  <li>d3 Programming</li>
                  <li>Tech research</li>
                  <li>Webmaster</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
