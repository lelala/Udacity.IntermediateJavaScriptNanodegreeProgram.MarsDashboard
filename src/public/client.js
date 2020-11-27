// data
let marsDashboard = {
    rover: [
        {
            name: "Curiosity"
            , isActive: true
            , description:"Curiosity is a car-sized Mars rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory (MSL) mission. Curiosity was launched from Cape Canaveral on November 26, 2011, at 15:02 UTC and landed on Aeolis Palus inside Gale on Mars on August 6, 2012, 05:17 UTC. The Bradbury Landing site was less than 2.4 km (1.5 mi) from the center of the rover's touchdown target after a 560 million km (350 million mi) journey. The rover's goals include an investigation of the Martian climate and geology, assessment of whether the selected field siteinside Gale has ever offered environmental conditions favorable for microbial life (including investigation of the role of water), and planetary habitability studies in preparation for human exploration."
            , camera: [
                {
                    name: "FHAZ"
                    , photo: [
                        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG"
                        , "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG"
                    ]
                }
                , {
                    name: "RHAZ"
                    , photo: [
                        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/rcam/RLB_486265291EDR_F0481570RHAZ00323M_.JPG"
                        , "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/rcam/RRB_486265291EDR_F0481570RHAZ00323M_.JPG"
                    ]
                }
                , {
                    name: "NAVCAM"
                    , photo: [
                        "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/ncam/NLB_486272784EDR_F0481570NCAM00415M_.JPG"
                        , "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/ncam/NLB_486271176EDR_F0481570NCAM00322M_.JPG"
                    ]
                }
            ]
        }
        , {
            name: "TWO"
            , isActive: false
            , camera: []
        }
    ]
}
const setRover = (index) => {
    marsDashboard.rover.forEach((roverObj, i) => roverObj.isActive = index == i);
    draw(marsDashboard);
};

const draw = (() => {
    // check if data really changed
    let checkData;
    return (newData) => {
        if (Immutable.Map({}).mergeDeep(newData).equals(checkData))
            return;
        checkData = Immutable.Map({}).mergeDeep(newData);
        // draw 
        const currentRover = marsDashboard.rover.find(roverObj => roverObj.isActive);
        if (currentRover) {
            document.querySelector("body").innerHTML = `
    <div class="container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header class="">
            <div class="clearfix">
                <h3 class="float-md-left text-white">Mars Dashboard</h3>
                <ul class="nav float-md-right justify-content-center">
                    ${["", ...marsDashboard.rover].reduce((html, roverObj, index) => html += `
                    <li class="nav-item ">
                        <a class="nav-link text-light pb-1 ${roverObj.isActive ? "border-bottom border-light" : ""}" 
                           onclick="setRover(${index - 1})"
                           href="javascript:void(0)">
                            ${roverObj.name}
                        </a>
                    </li>
                    `)}
                </ul>
            </div>
            <section class="jumbotron py-4">
                <h4 class="text-center">${currentRover.name}</h4>
                <p class="text-left text-muted">${currentRover.description}</p>
            </section>
        </header>

        <main role="main"
              class="row">
            ${["", ...currentRover.camera].reduce((html, cameraObj, index) => html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card bg-secondary text-light mb-4 mb-sm-5 shadow-sm">
                    <div class="carousel slide card-img-top"
                        data-ride="carousel">
                        <div class="carousel-inner">
                        ${["", ...cameraObj.photo].reduce((html, photo, index) => html += `
                            <div class="carousel-item ${index == 1 ? "active" : ""}">
                                <img src="${photo}"
                                    class="d-block w-100"
                                    alt="..."
                                    style="height: 225px;">
                                <a href="${photo}"
                                    target="_blank"
                                    class="text-white"
                                    style="position: absolute; right:5px; bottom:5px;z-index:2;">
                                    <svg width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        class="bi bi-box-arrow-in-up-right"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z" />
                                        <path fill-rule="evenodd"
                                            d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z" />
                                    </svg>
                                </a>
                            </div>
                        `)}
                        </div>
                        <a class="carousel-control-prev"
                            role="button"
                            data-slide="prev">
                            <span class="carousel-control-prev-icon"
                                    aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next"
                            role="button"
                            data-slide="next">
                            <span class="carousel-control-next-icon"
                                    aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Camera: ${cameraObj.name}</p>
                    </div>
                </div>
            </div>
            `)}
        </main>

        <footer class="mt-auto text-white">
            <p>Power by
                <a class="text-white"
                    href="https://api.nasa.gov/"
                    target="_blank">NASA
                </a>.
            </p>
        </footer>
    </div>
            `;
        }

        // active bootstrap carousel
        // $('.carousel').carousel();
        $('.carousel').each((index, carouselObj) => {
            carouselObj = $(carouselObj);
            carouselObj.carousel({
                interval: 3000
                , pause:false
            });
            carouselObj.find('.carousel-control-prev').click(() => {
                carouselObj.carousel('prev')
            });
            carouselObj.find('.carousel-control-next').click(() => {
                carouselObj.carousel('next')
            });
        });
    };
})();

window.addEventListener('load', () => {
    draw(marsDashboard);
});