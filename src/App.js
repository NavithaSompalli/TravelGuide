import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    travelPlacesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.renderApiUrl()
  }

  renderApiUrl = async () => {
    const {travelPlacesList} = this.state
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(travelGuidePackagesApiUrl, options)
    const data = await response.json()
    console.log(data)

    const newData = data.packages.map(pack => ({
      id: pack.id,
      name: pack.name,
      imageUrl: pack.image_url,
      description: pack.description,
    }))

    console.log(newData)
    this.setState({
      travelPlacesList: [...travelPlacesList, newData],
      isLoading: false,
    })
  }

  renderTravelPlaces = () => {
    const {travelPlacesList} = this.state

    return (
      <ul className="travel-places-list-container">
        {travelPlacesList.map(places =>
          places.map(travel => (
            <li key={travel.id} className="place-list-item">
              <img
                src={travel.imageUrl}
                alt={travel.name}
                className="place-image"
              />
              <h1 className="place-name">{travel.name}</h1>
              <p className="place-description">{travel.description}</p>
            </li>
          )),
        )}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="travel-guide-heading">Travel Guide</h1>
        <div className="travel-places-container">
          {isLoading ? (
            <>{this.renderLoading()}</>
          ) : (
            <>{this.renderTravelPlaces()}</>
          )}
        </div>
      </div>
    )
  }
}

export default App
