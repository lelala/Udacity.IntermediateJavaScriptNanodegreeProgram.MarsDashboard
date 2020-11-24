// data
let marsDashboard = {
    rover: [
        {
            name: "Curiosity"
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
        }
    ]
}

window.addEventListener('load', () => {
    const roverContain = document.getElementById('roverContain');
    const roverList = document.getElementById('roverList');
    $(roverList).empty();
    marsDashboard.rover.forEach((roverObj, index) => {
        const domObj = $(`
                        <a class="nav-link active"
                            href="#">${roverObj.name}</a>
        `);
        domObj.click(() => alert(roverObj.name));
        $(roverList).append(domObj);
        // roverListHTML += `
        //             <a class="nav-link active"
        //                 href="#">${roverObj.name}</a>
        // `;
    });
    // roverList.innerHTML = roverListHTML;


    let html = "";
    const currentRover = marsDashboard.rover.filter((roverObj) => roverObj.name == "Curiosity")[0];
    currentRover.camera.forEach(cameraObj => {
        if (cameraObj.photo.length > 0) {
            const getCarouselItemList = (cameraObj) => {
                return [""].concat(cameraObj.photo || []).reduce((html, photo, index) => html += `
                <div class="carousel-item ${index == 1 ? "active" : ""}">
                    <img src="${photo}"
                        class="d-block w-100"
                        alt="..."
                        style="height: 225px;">
                    <a href="${photo}"
                    target="_blank"
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
                `);
            };
            const cameraDOMID = currentRover.name + "." + cameraObj.name;
            html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card mb-4 mb-sm-5 shadow-sm">
                    <div id="${cameraDOMID}"
                         class="carousel slide card-img-top"
                         data-ride="carousel">
                        <div class="carousel-inner">
                            ${getCarouselItemList(cameraObj)}
                        </div>
                        <a class="carousel-control-prev"
                           href="#${cameraDOMID}"
                           role="button"
                           data-slide="prev">
                            <span class="carousel-control-prev-icon"
                                  aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next"
                           href="#${cameraDOMID}"
                           role="button"
                           data-slide="next">
                            <span class="carousel-control-next-icon"
                                  aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${cameraObj.name}</p>
                    </div>
                </div>
            </div>
            `;
        }
    });
    roverContain.innerHTML = html;
    // active bootstrap carousel
    $('.carousel').carousel();
});
    // const root = document.getElementById('root');
    // root.innerHTML = "";