//REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import LocationFilter from '../components/LocationFilter'
import WeatherDetails from '../components/WeatherDetails'
import SearchSuggestions from '../components/SearchSuggestions';

//SERVICE
import { getLocationsSuggestions, clearLocationsSuggestions} from '../store/actions/LocationsAction'
import { getWeather } from '../store/actions/WeatherAction'
import SweetAlert from 'sweetalert2-react';
class WeatherPage extends Component {

    state = {
        filterBy: {
            location: ''
        },
    }

    async componentDidMount(){
        let { location } = this.props.match.params 
        location = location || ''
        this.setFilter(location)
        this.setWeather(location)
    }

    handleFilterChange = async (event) => {
        const {value} = event.target
        await this.setFilter(value)
        this.getSearchSuggest()
    }
    
    setFilter = async (value) => {
        let filterBy = {...this.state.filterBy}
        filterBy.location = value;
        await this.setState({filterBy})    
    }

    async getSearchSuggest () {
        const {dispatch} = this.props
        const {location} = this.state.filterBy

        dispatch(getLocationsSuggestions(location))
    }

    searchLocation = async (location) => {
        const {dispatch} = this.props
        dispatch(clearLocationsSuggestions())
        location = location || this.state.filterBy.location
        this.setWeather(location)
    }

    searchSuggestLocation = async (ev) => {
        ev.preventDefault()
        // this.
        this.searchLocation()
    }

    async setWeather(location) {
        const { dispatch } = this.props
        location = location || this.state.filterBy.location
        dispatch(getWeather(location))
    }

    isEnglishLettersOnly(str) {
        const regex = /^[a-z][a-z ]*$/i;
        return regex.test(String(str));
    }

    render() {
        const { weather, locationsSuggests } = this.props 

        return (
            <section className = "weather-page">
                <div className = "search-cmp flex">
                    <LocationFilter onFilter = { this.handleFilterChange } searchLocation={ this.searchSuggestLocation }/>

                    { locationsSuggests ? 
                        <SearchSuggestions searchLocation = { this.searchLocation } locationsSuggests = { locationsSuggests }/> 
                        : ""
                    }
                </div>

                { weather.forecast ? 
                    <WeatherDetails/> 
                    : ""
                }
            </section>
        )
    }
}

const mapStateToProps = ({WeatherReducer, LocationReducer}) => {
    const { weather, isFahrenheit} = WeatherReducer;
    const {locationsSuggests} = LocationReducer
  
    return {
      weather,
      isFahrenheit,
      locationsSuggests
    }
  }
  
  export default connect(mapStateToProps)(WeatherPage)