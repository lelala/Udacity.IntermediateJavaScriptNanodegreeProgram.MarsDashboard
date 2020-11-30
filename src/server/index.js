require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
app.get('/api/mars_dashboard', async (req, res) => {
    console.log(`${new Date()} /api/mars_dashboard`);
    const roverResouce = [
        {
            name: "Curiosity"
            , wikiUrl: "https://en.wikipedia.org/wiki/Curiosity_(rover)"
            , description: `Curiosity is a car-sized Mars rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory (MSL) mission. Curiosity was launched from Cape Canaveral on November 26, 2011, at 15:02 UTC and landed on Aeolis Palus inside Gale on Mars on August 6, 2012, 05:17 UTC. The Bradbury Landing site was less than 2.4 km (1.5 mi) from the center of the rover's touchdown target after a 560 million km (350 million mi) journey. The rover's goals include an investigation of the Martian climate and geology, assessment of whether the selected field siteinside Gale has ever offered environmental conditions favorable for microbial life (including investigation of the role of water), and planetary habitability studies in preparation for human exploration.`
        }
        , {
            name: "Opportunity"
            , wikiUrl: "https://en.wikipedia.org/wiki/Opportunity_(rover)"
            , description: `Opportunity, also known as MER-B (Mars Exploration Rover – B) or MER-1, and nicknamed "Oppy", is a robotic rover that was active on Mars from 2004 until the middle of 2018. Launched on July 7, 2003, as part of NASA's Mars Exploration Rover program, it landed in Meridiani Planum on January 25, 2004, three weeks after its twin Spirit (MER-A) touched down on the other side of the planet. With a planned 90-sol duration of activity (slightly less than 92.5 Earth days), Spirit functioned until it got stuck in 2009 and ceased communications in 2010, while Opportunity was able to stay operational for 5111 sols after landing, maintaining its power and key systems through continual recharging of its batteries using solar power, and hibernating during events such as dust storms to save power. This careful operation allowed Opportunity to exceed its operating plan by 14 years, 46 days (in Earth time), 55 times its designed lifespan. By June 10, 2018, when it last contacted NASA, the rover had traveled a distance of 45.16 kilometers (28.06 miles).`
        }
        , {
            name: "Spirit"
            , wikiUrl: "https://en.wikipedia.org/wiki/Spirit_(rover)"
            , description: `Spirit, also known as MER-A (Mars Exploration Rover – A) or MER-2, is a robotic rover on Mars, active from 2004 to 2010. It was one of two rovers of NASA's Mars Exploration Rover Mission. It landed successfully within the impact crater Gusev on Mars at 04:35 Ground UTC on January 4, 2004, three weeks before its twin, Opportunity (MER-B), which landed on the other side of the planet. Its name was chosen through a NASA-sponsored student essay competition. The rover became stuck in a "sand trap" in late 2009 at an angle that hampered recharging of its batteries; its last communication with Earth was sent on March 22, 2010.`
        }
    ];
    const roverList = roverResouce.map(roverObj => roverObj.name);

    let marsDashboard = { rover: [] };
    Promise.all(roverList.map(roverName => fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${process.env.API_KEY || "DEMO_KEY"}`).then(rsp => rsp.json())))
        .then(manifestRsps => {
            console.log(`${new Date()} all manifest responsed.`);
            Promise.all(manifestRsps.map((manifestRsp, index) => {
                //append to marsDashboard.rover
                {
                    let roverObj = Object.assign(
                        {
                            name: ""
                            , wikiUrl: ""
                            , description: ""
                            , launch_date: ""
                            , landing_date: ""
                            , status: ""
                            , max_sol: 0
                            , max_date: ""
                            , camera: []
                        }
                        , roverResouce.find(obj => obj.name == roverList[index])
                        , {
                            launch_date: manifestRsp.photo_manifest.launch_date
                            , landing_date: manifestRsp.photo_manifest.landing_date
                            , status: manifestRsp.photo_manifest.status
                            , max_sol: manifestRsp.photo_manifest.max_sol
                            , max_date: manifestRsp.photo_manifest.max_date
                        }
                    );
                    marsDashboard.rover.push(roverObj);
                }
                // get last photo.
                return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverList[index]}/photos?sol=${manifestRsp.photo_manifest.max_sol}&api_key=${process.env.API_KEY || "DEMO_KEY"}`).then(rsp => rsp.json());
            }))
                .then(photoRsps => {
                    console.log(`${new Date()} all photo responsed.`);
                    photoRsps.forEach((photoRsp, index) => {
                        marsDashboard.rover[index].camera = [[], ...photoRsp.photos].reduce((list, photoObj) => {
                            let cameraObj = list.find(cam => cam.name == photoObj.camera.name);
                            if (!cameraObj) {
                                cameraObj = {
                                    name: photoObj.camera.name
                                    , full_name: photoObj.camera.full_name
                                    , photo: []
                                };
                                list.push(cameraObj);
                            }
                            cameraObj.photo.push(photoObj.img_src);
                            return list;
                        }).sort((obj1, obj2) => {
                            const nameSort = [
                                "FHAZ"
                                , "RHAZ"
                                , "MAST"
                                , "CHEMCAM"
                                , "MAHLI"
                                , "MARDI"
                                , "NAVCAM"
                                , "PANCAM"
                                , "MINITES"
                            ];
                            return nameSort.indexOf(obj1) == nameSort.indexOf(obj2) ? 0 : nameSort.indexOf(obj1) - nameSort.indexOf(obj2);
                        });
                    });
                    // response
                    res.send(marsDashboard);
                })
                .catch(error => console.log(`${new Date()} get photo error: ${error}`));
        })
        .catch(error => console.log(`${new Date()} get manifest error: ${error}`));
});


// example API call
// app.get('/apod', async (req, res) => {
//     try {
//         let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY || "DEMO_KEY"}`)
//             .then(res => res.json())
//         res.send({ image })
//     } catch (err) {
//         console.log('error:', err);
//     }
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))