import React, { Component } from "react"
import "bulma/css/bulma.min.css"
import "./index.css"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CopyToClipboard } from "react-copy-to-clipboard"

class RetrieveList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      persons: [],
    }
  }
  componentDidMount() {
    this.getQuote()
  }
  getQuote() {
    toast.dark("⏏ Kavithai Updated", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
    axios.get("https://app.santhoshveer.com/san.php").then(res => {
      const tamilsms = res.data
      this.setState({ isLoading: false, persons: tamilsms })
    })
  }
  Copykavithai() {
    toast.dark("📝 Kavithai Copied", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  }
  getNewQuote = () => {
    this.getQuote()
  }
  render() {
    return (
      <section className="section">
        <div className="container content">
          <div className="columns is-centered">
            <div className="column is-half">
              <br />
              <h1
                style={{ color: "#bee5d3" }}
                className="title has-text-centered"
              >
                💗 Tamil Kavithai 💗
              </h1>
              <br />
              {this.state.isLoading ? (
                ""
              ) : (
                <div className="notification has-text-weight-bold read-more">
                  {this.state.persons.map(person => (
                    <p
                      key={person.id}
                      dangerouslySetInnerHTML={{ __html: person.content }}
                    ></p>
                  ))}
                </div>
              )}
              <div className="buttons is-centered">
                <button
                  className="button is-warning read-random"
                  onClick={this.getNewQuote}
                  disabled={this.state.isLoading}
                >
                  {this.state.isLoading ? "Loading..." : "🔄 Random"}
                </button>
                <ToastContainer />
                <CopyToClipboard
                  text={this.state.persons.map(person =>
                    person.content.replace(/<br \/>/g, "\n")
                  )}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button
                    className="button is-link read-random"
                    onClick={this.Copykavithai}
                    disabled={this.state.isLoading}
                  >
                    {this.state.isLoading ? "Loading..." : "📝 Copy"}
                  </button>
                </CopyToClipboard>
              </div>
              <br />
              <br />
              <div className="subscribe-form">
                <p className="has-text-dark has-text-weight-medium has-text-centered">
                  Our Free Telegram Bot 🤖 - Get Random Tamil kavithai, Tamil
                  Quotes and Kadhal kavithai 💜
                </p>
                <a
                  href="https://telegram.me/tamilsms_bot"
                  className="button-link"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <span>▶ Start Now</span>
                </a>
              </div>
              <br />
              <br />
              <hr />
              <p
                style={{ color: "#9dad7f" }}
                className="has-text-weight-bold has-text-centered"
              >
                தமிழ் எஸ் எம் எஸ் 💌 <br />
                PWA Web App from the Creator of tamilsms.blog - Built using
                React JS <br />
                <br />
                <img
                  src="./react.png"
                  loading="lazy"
                  height="45"
                  width="45"
                  alt="Tamil SMS"
                />
              </p>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default RetrieveList
