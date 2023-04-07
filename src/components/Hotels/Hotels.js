import {Component} from "react"
import Hotel from "./Hotel/Hotel"

class Hotels extends Component {
    render(){
        return(
            <div>
                Hotels
                <Hotel />
                <Hotel />
            </div>
        )
    }
}

export default Hotels