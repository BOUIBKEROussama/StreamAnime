import React, { useState, useEffect } from 'react';
import { 
  Link
} from "react-router-dom";
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';



function Bar(){


    return(
        
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Stream One</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="#features">Series</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    
    );
  }

export default Bar;
