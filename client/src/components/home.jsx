import React from "react";

const home = () => {
  return (
    <div>
      <h1>Dobro Dosli u MERN Web Aplikaciju</h1>
      <br></br>
      <h2>What is the MERN Stack?</h2>
      <p>
        MERN stands for MongoDB, Express, React, Node, after the four key
        technologies that make up the stack.
      </p>
      <ul>
        <li>MongoDB - document database</li>
        <li>Express(.js) - Node.js web frameworke</li>
        <li>React(.js) - a client-side JavaScript framework</li>
        <li>Node(.js) - the premier JavaScript web server</li>
      </ul>
      <br></br>
      <p>
        The MERN architecture allows you to easily construct a 3-tier
        architecture (frontend, backend, database) entirely using JavaScript and
        JSON.
      </p>
      <img
        style={{ maxWidth: "100%" }}
        alt="Mern Stack"
        src="https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress"
      ></img>
      <br></br>
      <p>
        React.js, the declarative JavaScript framework for creating dynamic
        client-side applications in HTML
      </p>
      <p>
        Express and Node make up the middle (application) tier. Express.js is a
        server-side web framework, and Node.js the popular and powerful
        JavaScript server platform.
      </p>
      <p>
        Express.js is server-side framework, running inside a Node.js server.
        Express.js bills itself as a “fast, unopinionated, minimalist web
        framework for Node.js,” and that is indeed exactly what it is.
        Express.js has powerful models for URL routing (matching an incoming URL
        with a server function), and handling HTTP requests and responses.
      </p>

      <p>
        JSON documents created in your React.js front end can be sent to the
        Express.js server, where they can be processed and (assuming they’re
        valid) stored directly in MongoDB for later retrieval.
      </p>
    
    </div>
  );
};

export default home;
