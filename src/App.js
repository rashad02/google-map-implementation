import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'; 
import { Modal, Button,Form,Col, Row } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userLocation:{
        
      },
      activeMarker:{},
      showingInfoWindow: false,
      isShowModal: false,
      name: "Md. Rashadul Islam"
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
    }
  }
  onMarkerClick = (props, marker, e) =>{
    this.setState({
      userLocation: { lat:  marker.position.lat(), lng:  marker.position.lng() },
      showingInfoWindow: true,
      isShowModal: true
    });
  }
   
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        isShowModal: false,
        activeMarker: null,
      });
    }
  };
  handleClose(userLocation, name) {
    console.log("Name: ", name);
    console.log("Location: (",userLocation.lat + ",",userLocation.lng,")");
    this.setState({
      isShowModal: false,
      activeMarker: null,
    })
  }
  handleChange(event) {
    this.setState({name: event.target.value});
  }
  render() {
      const { loading, userLocation, isShowModal, name } = this.state;
      const { google } = this.props;
  
      if (loading) {
        return null;
      }
  
      return (
          <Map google={google} initialCenter={userLocation} zoom={14} onReady={this.fetchPlaces}>
            <Marker onClick={this.onMarkerClick} position={userLocation} draggable={true} name={'current location'}/>
            <Modal show={isShowModal} size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
            centered>
              <Modal.Header closeButton onHide={this.onClose}>
                <Modal.Title id="contained-modal-title-vcenter">
                  Location Details
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="form">
                  <Form.Group as={Row} controlId="formHorizontalCoordinate">
                    <Form.Label row sm={4} className="form-label">
                         Location
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control placeholder="Lattitude" value={userLocation.lat + ", " + userLocation.lng} disabled/>
                    </Col>
                  </Form.Group> 
                  <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label row sm={4} className="form-label">
                      Name  
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control placeholder="Longitude" value={name} onChange={(e) => this.handleChange(e)}/>
                    </Col>
                  </Form.Group> 
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => this.handleClose(userLocation, name)}>Send</Button>
                <Button variant="secondary"onClick={this.onClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Map>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBScoLqHj_KXjDh87Ad0NeagQQQ6lTQCS8'
})(App);