import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    return (
      <div>
        <Row>
          <Col md={12}>
            <div className="home-hero" style={heroStyles}>
              <h1>Welcome to MailSheduler.</h1>
              <p className="text-muted">
                Hackathon Project.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
