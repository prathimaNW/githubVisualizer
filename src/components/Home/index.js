import {Component} from 'react'
import {HiSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import {GoLocation} from 'react-icons/go'
import {MdLink} from 'react-icons/md'
import {BiBuildingHouse} from 'react-icons/bi'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    username: '',
    apiStatus: apiStatusConstants.initial,
    errMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username} = this.state
    const url = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        avatarUrl: data.avatar_url,
        login: data.login,
        name: data.name,
        description: data.bio,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
        company: data.company,
        companyUrl: data.organizations_url,
        location: data.location,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        errMsg: false,
        fetchedData: updatedData,
      })
    } else if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errMsg: true,
      })
    }
  }

  renderUserSuccess = event => (
    <div className="success-container">
      <div>
        <img src={event.avatarUrl} className="profile-img" alt="profile-img" />
        <h1 className="user-login">{event.login}</h1>
        <p className="user-name">{event.name}</p>
        <p className="user-bio">{event.description}</p>
      </div>
      <div className="c-1">
        <div className="p-1">
          <h1 className="followers-h">{event.followers}</h1>
          <p className="followers-p">Followers</p>
        </div>
        <hr />
        <div className="p-1">
          <h1 className="followers-h">{event.following}</h1>
          <p className="followers-p">Following</p>
        </div>
        <hr />
        <div className="p-1">
          <h1 className="followers-h">{event.publicRepos}</h1>
          <p className="followers-p">Public Repos</p>
        </div>
      </div>
      <div className="c-1">
        <div className="p-2">
          <h1 className="text">Company</h1>
          <div className="c-2">
            <BiBuildingHouse className="icons" />
            <p className="text1">{event.company}</p>
          </div>
        </div>
        <div className="p-2">
          <h1 className="text">Company Url</h1>
          <div className="c-2">
            <MdLink className="icons" />
            <p className="text1">{event.companyUrl}</p>
          </div>
        </div>
        <div className="p-2">
          <h1 className="text">Location</h1>
          <div className="c-2">
            <GoLocation className="icons" />
            <p className="text1">{event.location}</p>
          </div>
        </div>
      </div>
    </div>
  )

  renderUserInitial = () => (
    <div>
      <h1 className="h2">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dbkzj0qgh/image/upload/v1708171679/Group_2_1_l0wx74.png"
        className="img1"
        alt="initial"
      />
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  changes = () => {
    this.setState({
      apiStatus: apiStatusConstants.initial,
      errMsg: false,
      username: '',
    })
  }

  renderUserFailure = () => (
    <div>
      <h1 className="h2">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dbkzj0qgh/image/upload/v1708172637/Group_7522_rchfok.png"
        className="img1"
        alt="failure"
      />
      <div className="btn-container">
        <button type="button" className="btn" onClick={this.changes}>
          Try again
        </button>
      </div>
    </div>
  )

  renderView = () => {
    const {apiStatus, fetchedData} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderUserInitial()
      case apiStatusConstants.success:
        return this.renderUserSuccess(fetchedData)
      case apiStatusConstants.failure:
        return this.renderUserFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {username, errMsg} = this.state
    return (
      <div className="bg-container">
        <Header />
        <form className="frame" onSubmit={this.submitForm}>
          <input
            type="text"
            className="frame1"
            placeholder="Enter github username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <button type="submit" label="Search" className="frame2">
            <HiSearch className="search-icon" />
          </button>
          {errMsg ? (
            <p className="p1">Enter the valid github username</p>
          ) : null}
        </form>
        <div className="viewState">{this.renderView()}</div>
      </div>
    )
  }
}

export default Home
