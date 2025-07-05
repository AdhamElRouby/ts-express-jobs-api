import { RequestHandler } from "express";

const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404);
  if(req.accepts('html')) {
    res.type('html').send(`<h1>404 Not Found</h1><p>${req.originalUrl} does not exist</p>`);
  } else if (req.accepts('json')) {
    res.json({ error: `404 ${req.originalUrl} Not Found` });
  } else {
    res.type('text').send(`404 ${req.originalUrl} Not Found`);
  }
};

export default notFoundHandler;