import BackButton from '../images/back-button.png'
import Leaf from '../images/leaf.png'
import 'firebase/firestore'
import {authService} from "firebase_eb"
import {db} from "firebase_eb"


const RouteDetails = ( {transitRouteDetails, drivingRouteDetails} ) => {
    
    const goBack = () => {
        console.log(transitRouteDetails)
        console.log(drivingRouteDetails)
        let routeDetailsContainer = document.getElementById("route-details-container");
        routeDetailsContainer.style["display"] = "none";

        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "flex";
    }

    const saveJourney = () => {
        console.log(transitRouteDetails.departure_time.value);
        if (authService.currentUser != null) {
            db.collection('users').get()
                .then((snap) => {
                    snap.docs.forEach(doc => {
                        if (doc.data().email === authService.currentUser.email) {
                            console.log(doc.id);
                            db.collection("users").doc(doc.id).collection("routes").add({
                                date_of_trip: transitRouteDetails.departure_time.value,
                                origin: transitRouteDetails.start_address,
                                destination: transitRouteDetails.end_address,
                                distance: transitRouteDetails.distance.text,
                                duration: transitRouteDetails.duration.text,
                            })
                        }
                    })
                }).catch(function (error) {
                    console.log(error);
                })
            }

        let drivingOptionDetails = document.getElementById("route-details-container");
        drivingOptionDetails.style["display"] = "none";

        let drivingJourneySavedContainer = document.getElementById("transit-journey-saved-container");
        drivingJourneySavedContainer.style["display"] = "block";

        setTimeout(function () {
            let drivingJourneySavedContainer = document.getElementById("transit-journey-saved-container");
            let searchFormContainer = document.getElementById("search-container");

            drivingJourneySavedContainer.style["display"] = "none";
            searchFormContainer.style["display"] = "flex";

        }, 7000);

    }

    return (
        <section className="search-process-container" id="route-details-container">
            <button className="back-button" onClick={goBack}>
                <img src={BackButton} alt="Back Button" />
            </button>

            <div id="emissions-saved-message-container">
                <img src={Leaf} alt="Leaf" id="leaf-icon" />
                {/* <h5 id="emissions-saved-message">{drivingRouteDetails ? (drivingRouteDetails.distance.value) * 0.521 : "N/A"} KG of C02 saved</h5> */}

                <div id="transit-route-information">
                    <ul>
                        {/* <li>Distance: {transitRouteDetails ? transitRouteDetails.distance.text : "N/A"} </li>
                        <li>Duration: {transitRouteDetails ? transitRouteDetails.duration.text : "N/A"} </li>
                        <li>Emissions saved: {drivingRouteDetails ? (drivingRouteDetails.distance.value) * 0.521 : "N/A"}KG of C02</li> */}
                    </ul>
                </div>
            </div>

            <button className="save-journey-button" onClick={saveJourney}>SAVE THIS JOURNEY</button>
        </section>
    )
}

export default RouteDetails
